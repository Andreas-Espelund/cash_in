import React from 'react'
import Navbar from './Navbar'
export default function Layout({children}) {
  return (
    <div className="h-[100dvh] flex flex-col">
      <Navbar/>
      <div className="flex-1 bg-zinc-200">
        {children}
      </div>
    </div>
 )
}
