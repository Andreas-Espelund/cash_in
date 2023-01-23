import React from 'react'
import { updateInvoicePaymentStatus } from '../firebase'
import { useState } from 'react'
import { CrossIcon } from './icons'
export default function PaymentStatus({invoice}) {

  const [open, setOpen] =useState(false)
  let label = 'paid'
  let style = 'text-white bg-green-400'
  
  if (!invoice.paid){
    if (new Date(invoice.dueDate).getTime() < new Date().getTime()){
      label = "overdue"
      style = "text-white bg-red-400"
    } else {
      label = "unpaid"
      style = "bg-zinc-200 text-zinc-500"
    }
  }

  const updateStatus = (status) => {
    updateInvoicePaymentStatus(invoice.id, status)
    setOpen(false)
  }
  
  return (
    <div className="grid">
      <button unselectable="off" className={`px-3 py-1 font-semibold select-none rounded-full text-center ${style}`} onClick={() => setOpen(e => !e)}>
          {label}
      </button>

      <div className="border-2 z-40 rounded-lg flex flex-col gap-2 p-2 bg-white shadow-lg absolute" style={{display: open?'flex':'none'}}>
        <div className="flex gap-2">

        <p>Update status</p>
        <button className="hover:text-red-400 active:scale-95 transition-all" onClick={() => setOpen(false)}>
          <CrossIcon/>
        </button>
        </div>
        <button disabled={invoice.paid} className="border-2 disabled:bg-zinc-200 disabled:text-white transition-all hover:bg-primary hover:text-white active:scale-95 rounded-full px-2 w-full" onClick={() => updateStatus(true)}>Paid</button>
        <button disabled={!invoice.paid} className="border-2 disabled:bg-zinc-200 disabled:text-white transition-all hover:bg-primary hover:text-white active:scale-95 rounded-full px-2 w-full" onClick={() => updateStatus(false)}>Unpaid</button>
        
      </div>
    </div>
  )
}
