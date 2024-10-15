import { useState } from 'react'
import Weather from './Components/Weather'
import Dashboard from './pages/Dashboard'

function App() {

  return (
    <>
    {/* <div  className="flex flex-col justify-center items-center h-screen bg-slate-950">
    
    </div> */}
    {/* <div className="flex flex-col justify-center absolute inset-0 -z-10 h-full w-full items-center px-5 py-24 bg-[radial-gradient(125%_125%_at_50%_10%,#000_40%,#63e_100%)]">
      <Weather/>
    </div> */}
    <div>
      <Dashboard/>
    </div>
    </>
        
  )
}

export default App
