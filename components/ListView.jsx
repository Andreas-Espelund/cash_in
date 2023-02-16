import React from 'react'
import { timeToDateText } from '../tools/date'
import PaymentStatus from './PaymentStatus'
import { generatePdf } from '../tools/pdf'
import { Invoice } from '.'
import { UserState } from '../atoms/userAtom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { CustomersState } from '../atoms/customersAtom'
import { updateInvoicePaymentStatus } from '../firebase'
import { DownloadIcon } from './icons'
export default function ListView({invoice, number}) {
    
    const user = useRecoilValue(UserState)
    const customers = useRecoilState(CustomersState)

    const getTotal = (e) => {
        const total = e.vat? (e.price + e.price*e.vat/100) * e.amount : e.price * e.amount
        console.log(total)
        return total
    }
    
    const total = invoice.lines.reduce((acc, e) => acc + getTotal(e) ,0).toLocaleString('nb-NO', {
        style: 'currency',
        currency: 'NOK',
      }); /* $2,500.00 */
      const objectById = (items, id) => {
        return items.filter(e => e.orgNr == id).at(0)
    }


    const invoiceData = {...invoice}
    invoiceData['customer'] = objectById(customers, invoice.customer)
    
    const exportPDF = (id, filename) => {
    
        generatePdf(id,filename)
    }
    return (
    <tr className="relative">
        <td className="lg:p-4">{invoice.number}</td>
        <td className="lg:p-4">{timeToDateText(invoice.dueDate)}</td>
        <td className="lg:p-4">{invoice.header}</td>
        <td className="lg:p-4">{total}</td>
        <td className="lg:p-4">
            <PaymentStatus invoice={invoice}/>
        </td>
        <td className="p-4 hidden lg:block">
            <button onClick={() =>exportPDF(invoice.number, invoice.number)} className="flex items-center gap-1 select-none m-auto hover:scale-[108%] active:scale-95 transition-all text-secondary">
                <DownloadIcon/>
                pdf
            </button>
        </td>
        <div className={`${number == 0 && 'hidden'} border-b-2  absolute top-0  w-[96%] left-4 `}></div>
    </tr>
  )
}
