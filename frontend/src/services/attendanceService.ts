import axios from 'axios';
import type { IAttendance } from '../interfaces/IAttendance';
import type { IAttendant } from '../interfaces/IAttendant';

const api = axios.create({ baseURL: import.meta.env.VITE_API_URL ?? 'https://localhost:5254', headers: { "Content-Type": "application/json" } });

api.interceptors.response.use(
    res => res,
    err => {
        if (!err.response) return Promise.resolve({ data: null });
        return Promise.reject(err); 
    }
);

export const attendanceService = {
    getAll: () =>
        api.get<IAttendance[]>("/api/attendances").then((res) => res.data),

    add: (attendance: IAttendance) =>
        api.post<IAttendance>("/api/attendances", attendance).then((res) => res.data),

    complete: (id: number) =>
        api.patch(`/api/attendances/${id}/complete`).then((res) => res.data),
};

export const attendantService = {
    getAll: () =>
        api.get<IAttendant[]>("/api/attendants").then((res) => res.data),

    add: (attendant: IAttendant) =>
        api.post<IAttendant>("/api/attendants", attendant).then((res) => res.data),

    delete: (id: number) =>
        api.delete(`/api/attendants/${id}`).then((res) => res.data),
};