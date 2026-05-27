import { useEffect } from "react";
import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
    .withUrl(`${import.meta.env.VITE_API_URL ?? "https://localhost:5254"}/hubs/attendance`)
    .withAutomaticReconnect()
    .build();

export function useSignalR(onUpdate: () => void) {
    useEffect(() => {
        connection.start().catch(console.error);

        connection.on("AttendanceUpdated", onUpdate);

        return () => {
            connection.off("AttendanceUpdated", onUpdate);
        };
    }, [onUpdate]);
}