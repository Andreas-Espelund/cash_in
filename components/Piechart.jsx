import React from 'react'
import { TODAY } from '../tools/date'
export default function Piechart({invoices}) {
    let unpaid = 0, paid = 0, waiting = 0
    
    invoices.forEach(e => {
        const due = new Date(e.dueDate.seconds*1000).getTime()
        if (e.paid){ paid++ }
        else if (due < TODAY.getTime()){ unpaid++ }
        else { waiting ++ }
    })

    const total = unpaid + paid + waiting

    const items = [
        {
            label: 'Paid',
            color: 'bg-green-400',
            level: paid/total*100,
            amount: paid
        },
        {
            label: 'Waiting',
            color: 'bg-zinc-400',
            level: waiting/total*100,
            amount: waiting
        },
        {
            label: 'Overdue',
            color: 'bg-red-400',
            level: unpaid/total*100,
            amount: unpaid
        },
    ]

    const offset = 100 - items.map(a => a.level).sort().at(2)
    
    return (
        <div className="min-w-full flex-1 gap-2 flex flex-col">
            <div className="text-bottom flex flex-1 gap-10">
                {items.map( item => 
                    <div className={`${ item.color} p-4  w-full text-white rounded-lg font-semibold mt-auto`} style={{height:`${item.level+offset}%`}}/> 
                )}
            </div>
            <div className="grid grid-cols-3 gap-10 text-center font-semibold">
                {items.map(e => <p>{e.amount} {e.label.toLowerCase()}</p>)}
            </div>
        </div>
  )
}
