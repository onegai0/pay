
import { useCallback, useState } from 'react';
import { attendanceService } from '../services/attendanceService';
import { attendantService } from '../services/attendanceService';
import { useSignalR } from '../hooks/useSignalR';
import type { IAttendant } from '../interfaces/IAttendant';
import type { IAttendance } from '../interfaces/IAttendance';
import { AttendanceStatus, AttendanceStatusNames, AttendanceTeam, AttendanceTeamNames } from "../interfaces/Enum";
import { TeamPanel } from '../components/TeamPanel';

export function Dashboard() {


    const [attendances, setAttendances] = useState<IAttendance[]>([]);
    const [attendants, setAttendants] = useState<IAttendant[]>([]);

    const fetchData = useCallback(() => {
        attendanceService.getAll().then(setAttendances);
        attendantService.getAll().then(setAttendants);
    }, []);

    useSignalR(fetchData);
    const buttonClass =
        "mt-5 px-4 py-2 bg-gray-800 text-white rounded hover:bg-blue-600";

    const wrapType = "flex flex-wrap justify-center gap-5 pt-5 px-5";
    const teamKeys = Object.values(AttendanceTeam) as AttendanceTeam[];
    const statusKeys = Object.values(AttendanceStatus) as AttendanceStatus[];
    return (
        <div className=" flex flex-col  items-center w-full h-full">
            <div className={wrapType}>
                {statusKeys.map((status) => (
                    <div key={status} className='flex-1 min-w-[350px] max-w-[600px]'>
                        <TeamPanel type={AttendanceStatusNames[status]} />
                    </div>
                ))}
            </div>

            <div>

                <div className={wrapType}>
                    {teamKeys.map((team) => (
                        <div key={team} className='flex-1 min-w-[350px] max-w-[600px]'>
                            <TeamPanel type={AttendanceTeamNames[team]} />
                        </div>
                    ))}
                </div>

                <div className=" flex justify-end px-5 gap-5">
                    <button
                        onClick={fetchData}
                        className={buttonClass}
                    >
                        Novo Atendente
                    </button>
                    <button
                        onClick={fetchData}
                        className={buttonClass}
                    >
                        Novo Atendimento
                    </button>
                </div>
            </div>
        </div>
    )
}