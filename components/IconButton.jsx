import React from 'react'

export default function IconButton({onClick, children}) {
  return (
    <button onClick={onClick} className="p-2 rounded-lg aspect-square w-fit h-fit hover:scale-105 hover:bg-neutral transition-all border border-transparent hover:shadow-md hover:border-secondary text-secondary active:scale-100 active:bg-secondary active:text-white active:shadow-none">
      {children}
    </button>
  )
}
