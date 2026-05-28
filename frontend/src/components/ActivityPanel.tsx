import { AttendanceTeamNames } from "../interfaces/Enum";
import type { IAttendance } from "../interfaces/IAttendance";
import type { IAttendant } from "../interfaces/IAttendant";
type ActivityPanelProps = {
    attendances: IAttendance[];
    attendants: IAttendant[];
}

export function ActivityPanel({ attendances, attendants }: ActivityPanelProps) {


    const statusLabel: Record<number, { label: string; className: string }> = {
        1: { label: "Na fila", className: "bg-red-500/10 text-red-400/60 border border-red-500/20" },
        0: { label: "Em processo", className: "bg-yellow-500/10 text-yellow-400/60 border border-yellow-500/20" },
        2: { label: "Finalizado", className: "bg-green-500/10 text-green-400/60 border border-green-500/20" },
    };


    return (
        <div className="w-full h-full bg-[#0c0c0c7c] backdrop-blur-2xl rounded-lg p-4">
            <div className="text-[18px] font-medium text-[#cfcfcf]  bg mb-4 flex justify-center">Histórico</div>

<div className="w-full flex flex-col gap-3">
    <table className="w-full text-sm table-fixed">
        <thead>
            <tr className="border-b border-white/50 text-white text-[12px] tracking-wider">
                <th className="text-left py-2 px-3 font-light">Cliente</th>
                <th className="text-left py-2 px-3 font-light">Assunto</th>
                <th className="text-left py-2 px-3 font-light hidden md:table-cell">Atendente</th>
                <th className="text-left py-2 px-3 font-light hidden lg:table-cell">Categoria</th>
                <th className="text-left py-2 px-3 font-light">Status</th>
            </tr>
        </thead>
    </table>

    <div className="overflow-y-auto h-[255px] custom-scroll">
        <table className="w-full text-sm table-fixed">
            <tbody>
                {[...attendances]
                    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                    .map((row, i) => (
                        <tr key={i} className="border-b border-white/10 hover:bg-white/5 transition-colors">
                            <td className="py-2.5 px-3 text-white/80 font-medium">{row.customerName}</td>
                            <td className="py-2.5 px-3 text-white/60 truncate">{row.subject}</td>
                            <td className="py-2.5 px-3 text-white/80 hidden md:table-cell">
                                {attendants.find(a => a.id === row.attendantId)?.name || "Aguardando..."}
                            </td>
                            <td className="py-2.5 px-3 font-medium text-white/60 hidden lg:table-cell">
                                {AttendanceTeamNames[row.team]}
                            </td>
                            <td className="py-2.5 px-3">
                                <span className={`px-2 py-0.5 rounded-[8px] text-xs truncate font-medium ${statusLabel[row.status].className}`}>
                                    {statusLabel[row.status].label}
                                </span>
                            </td>
                        </tr>
                    ))}
            </tbody>
        </table>
    </div>
</div>
        </div>
    );
}