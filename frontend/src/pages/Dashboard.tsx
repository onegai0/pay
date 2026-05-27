
import { useCallback, useState } from 'react';
import { attendanceService } from '../services/attendanceService';
import { attendantService } from '../services/attendanceService';
import { useSignalR } from '../hooks/useSignalR';
import type { IAttendant } from '../interfaces/IAttendant';
import type { IAttendance } from '../interfaces/IAttendance';

export function Dashboard() {


const [attendances, setAttendances] = useState<IAttendance[]>([]);
const [attendants, setAttendants] = useState<IAttendant[]>([]);

const fetchData = useCallback(() => {
    attendanceService.getAll().then(setAttendances);
    attendantService.getAll().then(setAttendants);
}, []);

useSignalR(fetchData);
console.log(attendances)
console.log(attendants)
  return (
    <div>
      Dashboard
    </div>
  )
}