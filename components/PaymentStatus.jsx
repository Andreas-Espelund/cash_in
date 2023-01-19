import React from 'react'

export default function PaymentStatus({status, dueDate}) {
  let label = 'paid'
  let style = 'text-white bg-green-400'
  
  if (!status){
    if (new Date(dueDate).getTime() < new Date().getTime()){
      label = "overdue"
      style = "text-white bg-red-400"
    } else {
      label = "unpaid"
      style = "bg-zinc-200 text-zinc-500"
    }
  }
  
  return (
    <p unselectable="off" className={`px-3 py-1 font-semibold select-none rounded-full lg:w-4/5 text-center ${style}`}>
        {label}
    </p>
  )
}
