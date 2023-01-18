import React from 'react'

export default function PaymentStatus({status, dueDate}) {
  let label = 'paid'
  let style = 'text-white bg-green-400'
  
  if (!status){
    if (new Date(dueDate) < new Date()){
      label = "overdue"
      style = "text-white bg-red-400"
    } else {
      label = "unpaid"
      style = "bg-zinc-200 text-zinc-500"
    }
  }
  
  return (
    <p className={`px-3 py-1 font-semibold rounded-full lg:w-4/5 text-center ${style}`}>
        {label}
    </p>
  )
}
