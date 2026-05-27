
import type { AttendanceTeam } from "./Enum";
import type { IAttendance } from "./IAttendance";
export interface IAttendant {
    id: number;
    name: string;
    team: AttendanceTeam;
    activeAttendances: IAttendance[];
    isAvailable: boolean;
}
