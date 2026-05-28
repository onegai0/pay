export const AttendanceTeam = {
    Cards: 0,
    Loans: 1,
    Others: 2
} as const;
export const AttendanceTeamNames = {
    [AttendanceTeam.Cards]: "Cartões",
    [AttendanceTeam.Loans]: "Empréstimos",
    [AttendanceTeam.Others]: "Outros"
};
export type AttendanceTeam = typeof AttendanceTeam[keyof typeof AttendanceTeam];

export const AttendanceStatus = {
    InProgress: 0,
    Waiting: 1,
    Completed: 2
} as const;

export const AttendanceStatusNames = {
    [AttendanceStatus.InProgress]: "Na fila",
    [AttendanceStatus.Waiting]: "Em processo",
    [AttendanceStatus.Completed]: "Finalizados"
};

export type AttendanceStatus = typeof AttendanceStatus[keyof typeof AttendanceStatus];