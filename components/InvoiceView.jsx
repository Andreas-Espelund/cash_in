import React from 'react'
import { ListView } from '.'
export default function InvoiceView({invoices}) {
  return (
    <div className="bg-white rounded-lg">
        <table className="w-full text-start">
            <thead className="bg-primary text-white">
                <tr>
                <th className="text-start lg:p-4 rounded-tl-lg ">Invoice no.</th>
                <th className="text-start lg:p-4">Due date</th>
                <th className="text-start lg:p-4">Header</th>
                <th className="text-start lg:p-4">Amount</th>
                <th className="text-start lg:p-4 rounded-tr-lg lg:rounded-none">Status</th>
                <th className="text-start hidden  lg:table-cell p-4 rounded-tr-lg ">Export</th>
                </tr>
            </thead>
        <tbody>
            {  invoices.map((e, index) => 
                <ListView invoice={e} key={index} number={index}/>
              )
            }
        </tbody>
        </table>

        {invoices.length == 0 &&
          <div className="p-4 w-full grid place-content-center italic text-zinc-400 text-md">
            No invoices to show
          </div>
        }
    </div>
  )
}
