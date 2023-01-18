import React from 'react'

export default function Piechart({invoices}) {
    const today = new Date().getTime()
    
    const data = { 
        waiting: invoices.filter(e => new Date(e.dueDate).getTime() <  today).length,
        unpaid: invoices.filter(e => new Date(e.dueDate).getTime() >  today).length,
        paid: 0
    }

    const total = data.paid + data.unpaid + data.waiting
    
    const items = [
        {
            label: 'Paid',
            color: 'bg-green-400',
            level: data.paid/total*100,
            amount: data.paid
        },
        {
            label: 'Waiting',
            color: 'bg-zinc-400',
            level: data.waiting/total*100,
            amount: data.waiting
        },
        {
            label: 'Overdue',
            color: 'bg-red-400',
            level: data.unpaid/total*100,
            amount: data.unpaid
        },
    ]

    const offset = 100 - items.map(a => a.level).sort().at(2)

    
    return (
    <div className="flex-1 w-full grid grid-cols-3 gap-10 text-bottom">
        {items.map( item => 
            <div className={`${item.color} p-4 flex flex-col w-full text-white rounded-lg font-semibold items-center justify-end mt-auto`} style={{height:`${item.level+offset}%`}} > 
                <p> {item.amount} </p>
                <p> {item.label} </p>
            </div>
            )}
    </div>
  )
}
