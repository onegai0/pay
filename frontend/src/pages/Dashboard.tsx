
import { useAttendance } from '../hooks/useSignalR';
import { AttendanceStatus, AttendanceTeam } from "../interfaces/Enum";
import { TeamPanel } from '../components/TeamPanel';
import { QueuePanel } from '../components/QueuePanel';
import { ActivityPanel } from '../components/ActivityPanel';

export function Dashboard() {
    const { attendances, attendants } = useAttendance();


    const teamKeys = Object.values(AttendanceTeam) as AttendanceTeam[];
    const statusKeys = Object.values(AttendanceStatus) as AttendanceStatus[];
    return (
        <div className=" flex flex-col gap-5 items-center w-full h-full pt-2 overflow-auto ">



            <div className="w-full justify-center  items-center  rounded-lg px-5   flex-col ">

                <div className="w-full flex justify-center    ">

                    <div className={" grid grid-cols-2 md:grid-cols-4 mxn-w-[1092px]   py-5 justify-center gap-5 "}>
                        <div className='w-[150px] h-25'>
                            <QueuePanel list={attendances} />
                        </div>

                        {statusKeys.map((status) => (
                            <div key={status} className='w-[150px] h-25'>
                                <QueuePanel type={status} list={attendances} />
                            </div>
                        ))}
                    </div>
                </div>

                <div className="flex flex-wrap w-full justify-center items-start gap-5">

                    {teamKeys.map((team) => (
                        <div key={team} className='w-[350px]'>
                            <TeamPanel
                                type={team}
                                attendants={attendants.filter(a => a.team === team)}
                                attendances={attendances.filter(a => a.team === team)}
                            />
                        </div>
                    ))}
                </div>

                <div className=" w-full flex">
                    <div className=" mx-auto  w-[1092px] h-full pt-5">
                        <ActivityPanel attendances={attendances} attendants={attendants} />
                    </div>
                </div>

            </div>
        </div>
    )
}