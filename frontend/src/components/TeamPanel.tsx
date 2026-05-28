

import BankIcon from "../assets/bank.svg?react";
import CreditIcon from "../assets/credit.svg?react";
import DialogIcon from "../assets/dialog.svg?react";
import { AttendanceStatus, AttendanceTeam, AttendanceTeamNames } from "../interfaces/Enum";
import type { IAttendance } from "../interfaces/IAttendance";
import type { IAttendant } from "../interfaces/IAttendant";
import { AttendantCard } from "./AttendantCard";
type TeamPanelProps = {
    type: AttendanceTeam,
    attendants: IAttendant[]
    attendances: IAttendance[]
};

export function TeamPanel({ type, attendants, attendances }: TeamPanelProps) {

    const waiting = attendances.filter(a => a.status === AttendanceStatus.Waiting);

    const statusLabel: Record<number, string> = {

        2: "bg-red-500/10 text-red-400/60 border border-red-500/20",
        1: "bg-yellow-500/10 text-yellow-400/60 border border-yellow-500/20",
        0: "bg-green-500/10 text-green-400/60 border border-green-500/20",
    } as Record<number, string>;
    const queuePoint = waiting.length > 10 ? 2 : waiting.length > 5 ? 1 : 0;

    return (
        <div className="w-full h-full bg-[#0c0c0c7c] backdrop-blur-2xl rounded-lg py-4 pl-4 pr-2 flex flex-col">

            <div className="mb-4 mx-2 flex h-8 items-center justify-between">
                <div className="flex gap-2 text-white">

                    {type === AttendanceTeam.Cards && <CreditIcon className="size-6" />}
                    {type === AttendanceTeam.Loans && <BankIcon className="size-6" />}
                    {type === AttendanceTeam.Others && <DialogIcon className="size-6" />}

                    <div className=" text-[#cfcfcf] text-[16px]">
                        {AttendanceTeamNames[type]}
                    </div>

                </div>

                <div className={`${statusLabel[queuePoint]} text-[14px] rounded-md w-15 text-center`}>Fila: {waiting.length}</div>

            </div>

            <div className="flex  overflow-y-auto max-h-[180px] custom-scroll ">
                <div className="flex w-[97%] flex-col gap-2">
                    {[...attendants]
                        .sort((a, b) => b.activeAttendances.length - a.activeAttendances.length)
                        .map((item) => (
                            <AttendantCard key={item.id} name={item.name} attendances={item.activeAttendances.length} />
                        ))}
                </div>
            </div>
        </div>
    );
}

