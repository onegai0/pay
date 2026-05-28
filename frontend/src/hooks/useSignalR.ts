import { useEffect, useState, useMemo } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import * as signalR from "@microsoft/signalr";
import { attendanceService, attendantService } from "../services/attendanceService";

export function useSignalR(hubPath: string, queryKeys: string[][]) {
    const queryClient = useQueryClient();
    const [isConnected, setIsConnected] = useState(false);

    useEffect(() => {
        let isCancelled = false;

        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`${import.meta.env.VITE_API_URL ?? "https://localhost:5254"}${hubPath}`)
            .withAutomaticReconnect()
            .configureLogging(signalR.LogLevel.None) 
            .build();

        const invalidateQueries = () => {
            queryKeys.forEach(key => queryClient.invalidateQueries({ queryKey: key }));
        };

        connection.on("AttendanceUpdated", invalidateQueries);

        connection.onreconnecting(() => {
            setIsConnected(false);
            queryKeys.forEach(key => queryClient.removeQueries({ queryKey: key }));
        });

        connection.onreconnected(() => {
            setIsConnected(true);
            invalidateQueries();
        });

        connection.onclose(() => {
            setIsConnected(false);
            startConnection(); 
        });

        const startConnection = async () => {
            while (!isCancelled && connection.state === signalR.HubConnectionState.Disconnected) {
                try {
                    await connection.start();
                    setIsConnected(true);
                    invalidateQueries();
                    return; 
                } catch {
                    await new Promise(res => setTimeout(res, 5000)); 
                }
            }
        };

        startConnection();

        return () => {
            isCancelled = true;
            connection.off("AttendanceUpdated", invalidateQueries);
            connection.stop();
        };
    }, [hubPath, queryClient]); 


    return { isConnected };
}


export function useAttendance() {
    const queryKeys = useMemo(() => [["attendances"], ["attendants"]], []);
    const { isConnected } = useSignalR("/hubs/attendance", queryKeys);

    const { data: attendances = [], isLoading: loadingAttendances } = useQuery({
        queryKey: ["attendances"],
        queryFn: () => attendanceService.getAll(),
        enabled: isConnected,
    });

    const { data: attendants = [], isLoading: loadingAttendants } = useQuery({
        queryKey: ["attendants"],
        queryFn: () => attendantService.getAll(),
        enabled: isConnected,
    });

    return {
        attendances,
        attendants,
        isLoading: loadingAttendances || loadingAttendants,
        isConnected
    };
}