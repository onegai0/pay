export const AttendanceTeam = {
    Cards: 0,
    Loans: 1,
    Others: 2
} as const;

export type AttendanceTeam = typeof AttendanceTeam[keyof typeof AttendanceTeam];

export const AttendanceStatus = {
    InProgress: 0,
    Waiting: 1,
    Completed: 2
} as const;

export type AttendanceStatus = typeof AttendanceStatus[keyof typeof AttendanceStatus];