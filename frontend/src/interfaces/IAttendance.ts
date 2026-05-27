import type { AttendanceStatus, AttendanceTeam } from "./Enum";

export interface IAttendance {
    id: number;
    customerName: string;
    subject: string;
    team: AttendanceTeam;
    status: AttendanceStatus;
    attendantId: number | null;
    createdAt: string;
    completedAt: string | null;
}
