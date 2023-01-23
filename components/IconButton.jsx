import React from 'react'

export default function IconButton({onClick, children}) {
  return (
    <button onClick={onClick} className="p-2 rounded-lg aspect-square w-fit h-fit hover:scale-110 hover:bg-neutral transition-all border border-transparent hover:shadow-md hover:border-secondary text-secondary active:scale-95 active:bg-primary active:text-white active:shadow-none">
      {children}
    </button>
  )
}
