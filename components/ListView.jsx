import React from 'react'
import PaymentStatus from './PaymentStatus'
export default function ListView({invoice, number}) {
   
    const getTotal = (e) => {
        const total = e.vat? (e.price + e.price*e.vat/100) * e.amount : e.price * e.amount
        console.log(total)
        return total
    }
    
    const total = invoice.lines.reduce((acc, e) => acc + getTotal(e) ,0).toLocaleString('nb-NO', {
        style: 'currency',
        currency: 'NOK',
      }); /* $2,500.00 */
    console.log(invoice.lines)
    return (
    <tr className={`${ number != 0? '' : 'border-b-2'} border-neutral`}>
        <td className="lg:p-4">{invoice.number}</td>
        <td className="lg:p-4">{new Date(invoice.dueDate.seconds*1000).toLocaleDateString('nb-NO',{ day:'2-digit', month:'2-digit', year:'2-digit'})}</td>
        <td className="lg:p-4">{invoice.header}</td>
        <td className="lg:p-4">{total}</td>
        <td className="lg:p-4">
            <PaymentStatus status={invoice.paid} dueDate={invoice.dueDate}/>
        </td>
        <td className="p-4 hidden lg:block">
            <button className="flex items-center gap-1  min-w-3/4 rounded-full py-1 px-3 text-white bg-secondary font-semibold">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                </svg>
                pdf
            </button>
        </td>
    </tr>
  )
}
