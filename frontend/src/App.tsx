import './App.css'

import { Dashboard } from './pages/Dashboard';
import NewAttendantIcon from "./assets/add-attendant.svg?react";
import NewAttendaceIcon from "./assets/add-attendance.svg?react";
import CompleteIcon from "./assets/complete.svg?react";
import { attendanceService, attendantService } from './services/attendanceService';
import { AttendanceTeam } from './interfaces/Enum';
import * as mockData from './mock/mockData';
import { useAttendance } from './hooks/useSignalR';
import bg from "./assets/bg.jpg";

function App() {
  const max = Math.max(...Object.values(AttendanceTeam).filter(v => typeof v === 'number') as number[]);
  const { isConnected } = useAttendance();

  return (
    <div className="flex flex-col w-full min-h-screen relative bg-content  " style={{
      backgroundImage: `url(${bg})`, backgroundPosition: "center 40%",
    }}>

      <div className="absolute inset-0 backdrop-blur-[4px] bg-black/10" />

      <header className="fixed top-0 z-50 flex  items-center justify-between w-full h-16 px-8 bg-[#00000081] backdrop-blur-[10px]">
        <a href="/" className="flex items-center gap-1 text-[28px] text-white">
          <h1 className="flex">
            <span className="font-bold text-white/90">Flow</span>
            <span className={` font-thin ${isConnected ? "text-[#00ff22]" : "text-[#ff0000]"}`}>Pay</span>
          </h1>
          <div className="font-bold text-white/90">Central</div>
        </a>

        <div className="flex gap-2">
          <button className="px-4 py-2 text-sm font-medium cursor-pointer text-white/85 border border-white rounded flex items-center gap-2 bg-transparent hover:bg-white/10 transition-colors"
            onClick={async () => {
              const attendants = await attendantService.getAll();
              const busy = attendants.filter(a => a.activeAttendances.length > 0);
              if (busy.length === 0) return;
              const random = busy[Math.floor(Math.random() * busy.length)];
              const attendance = random.activeAttendances[Math.floor(Math.random() * random.activeAttendances.length)];
              attendanceService.complete(attendance.id);
            }}
          >
            <CompleteIcon className="size-4 text-white" />
            <span className="hidden md:inline">Completar</span>
          </button>

          <button className="px-4 py-2 text-sm font-medium cursor-pointer text-white/85 border border-white rounded flex items-center gap-2 bg-transparent hover:bg-white/10 transition-colors"
            onClick={() => {
              attendantService.add({
                name: mockData.attendantNames[Math.floor(Math.random() * mockData.attendantNames.length)],
                id: 0,
                team: Math.floor(Math.random() * (max + 1)) as AttendanceTeam,
                activeAttendances: [],
                isAvailable: false
              })
            }}
          >
            <NewAttendantIcon className="size-4 text-white" />
            <span className="hidden md:inline">Atendente</span>
          </button>

          <button className="px-4 py-2 text-sm font-medium cursor-pointer text-white/85 border border-white rounded flex items-center gap-2 bg-transparent hover:bg-white/10 transition-colors"
            onClick={() => {
              const team = Math.floor(Math.random() * (max + 1)) as AttendanceTeam;
              const teamKey = team === AttendanceTeam.Cards ? 'cards' : team === AttendanceTeam.Loans ? 'loans' : 'others';
              const subjects = mockData.subjectsByTeam[teamKey];
              const subject = subjects[Math.floor(Math.random() * subjects.length)];
              attendanceService.add({
                customerName: mockData.customerNames[Math.floor(Math.random() * mockData.customerNames.length)],
                subject,
                team,
                id: 0,
                status: 0,
                attendantId: null,
                createdAt: '',
                completedAt: null
              })
            }}
          >
            <NewAttendaceIcon className="size-4 text-white" />
            <span className="hidden md:inline">Atendimento</span>
          </button>
        </div>
      </header>

      <main className="relative z-10 w-full h-full pt-21 p-5">
        <div className="w-full h-full rounded-xl">
          <Dashboard />
        </div>
      </main>

    </div>
  )
}

export default App;