import './App.css'


import { Dashboard } from './pages/Dashboard';

function App() {

  return (
<div className="flex flex-col w-full min-h-screen">

  <header className="fixed top-0 z-50 flex items-center w-full h-16 px-20 bg-[#010d11]/60 backdrop-blur-md">

    <a
      href="/"
      className="flex items-center gap-2 text-[28px] text-white"
    >
      <h1 className="flex">
        <span className="font-bold">Flow</span>
        <span className="font-thin">Pay</span>
      </h1>

      <span>Central</span>
    </a>

  </header>

  <main className="w-full h-screen pt-21 p-5">

    <div className="
      w-full
      h-full
      bg-[#191919]
      rounded-xl
    ">
      <Dashboard />
    </div>

  </main>

</div>
  )
}

export default App;