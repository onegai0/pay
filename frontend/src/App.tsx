import { useEffect } from 'react';
import './App.css'
import { attendanceService } from './services/attendanceService';
import {attendantService} from './services/attendanceService';



function App() {

useEffect(() => {
    attendantService.getAll().then(console.log).catch(console.error);
    attendanceService.getAll().then(console.log).catch(console.error);
}, []); 


  return (
    <>
    <div>a</div>



    </>
  )
}

export default App