import type { IAttendance } from "../interfaces/IAttendance";
import { AttendanceStatus, AttendanceStatusNames } from "../interfaces/Enum";

type QueuePanelProps = {
    type?: AttendanceStatus,
    list: IAttendance[]
};

export function QueuePanel({ type, list }: QueuePanelProps) {

    const completed = list.filter(a => a.status === AttendanceStatus.Completed);
    const waiting = list.filter(a => a.status === AttendanceStatus.InProgress);
    const inProgress = list.filter(a => a.status === AttendanceStatus.Waiting);
    const all = completed.length + waiting.length + inProgress.length;

    return (
        <div className="w-full h-full bg-[#0c0c0c7c] backdrop-blur-2xl flex flex-col  justify-center rounded-lg p-4 ">
            <div className="text-[14px]  mb-2  text-[#cfcfcf] flex justify-center"> {type !== undefined ? AttendanceStatusNames[type] : "Total"}</div>

            <div className=" flex justify-center text-white items-center text-[30px] font-bold text-button">
                     {type ===  AttendanceStatus.Completed && (<div>{completed.length}</div>)}
                    {type ===  AttendanceStatus.Waiting && (<div>{waiting.length}</div>)}
                    {type === AttendanceStatus.InProgress && (<div>{inProgress.length}</div>)}
                    {type === undefined && (<div>{all}</div>)}
            </div>
        </div>
    );
}