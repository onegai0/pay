import SupportIcon from "../assets/support.svg?react";
import CircleIcon from "../assets/circle.svg?react";
import { AttendanceTeam } from "../interfaces/Enum";
type AttendantCardProps = {
    name: string;
    attendances: number;
};

export function AttendantCard({ name, attendances }: AttendantCardProps) {


    const max = Math.max(...Object.values(AttendanceTeam).filter(v => typeof v === 'number') as number[]);

    return (

        <div
            className="w-full h-12 bg-[#5f5f5f44]  backdrop-blur-2xl rounded  justify-between flex items-center px-4 shrink-0">
            <div className="flex gap-2 items-center">

                {attendances === 0
                    ? <SupportIcon className="size-6 text-[#6d6d6d]" />
                    : <SupportIcon className="size-6 text-white" />
                }
                <div className="text-white/80 text-[16px]">{name}</div>
            </div>

            <div className="flex  gap-2 items-center">
                {
                    Array.from({ length: max + 1 }).map((_, i) => (
                        i < attendances
                            ? <CircleIcon key={i} className="size-3 text-white " />
                            : <CircleIcon key={i} className="size-3 text-[#181818]" />
                    ))
                }
            </div>

        </div>
    );
}