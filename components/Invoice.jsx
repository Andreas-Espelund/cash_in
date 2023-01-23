import React from 'react'
import Image from 'next/image'
import { timeToDateText } from '../tools/date'
import { CustomersState } from '../atoms/customersAtom'
import { useRecoilValue } from 'recoil'
export default function Invoice({user, invoiceData }) {
    const customers = useRecoilValue(CustomersState)
    
    const objectById = (items, id) => {
      return items.filter(e => e.id == id).at(0)
    }  
  
    const total_price = invoiceData?.lines.reduce((total, a) => total + a.price, 0)
    const total_vat = invoiceData?.lines.reduce((total, a) => total + a.price * a.vat/100, 0)
    const total_sum = total_price + total_vat
    const currencyFormat = (price) => {
      return price.toLocaleString('nb-NO', {style: 'currency',currency: 'NOK',})
    }

    const customer = objectById(customers, invoiceData.customer)
  
  return (
    <div id="invoice-content" className="w-[157.5mm] h-[222.5mm] p-4 grid grid-rows-6 grid-cols-2 gap-4">
      <div className="col-span-1 row-span-1">
        {user?.logo&& <Image src={user?.logo} alt="company logo" className="m-auto h-[100%] w-auto"/>}
      </div>
      <div className="col-span-1 row-span-2 flex flex-col justify-start">
        <p className="text-3xl font-bold text-right ml-auto">FAKTURA</p>
        <div>
          <p className="font-bold">{user?.name}</p>
          <p>{user?.streetAdress}</p>
          <p>{user?.zipLocation}</p>
          <p>{`Org nr. ${user?.orgNr}`}</p>
        </div>
        <div className="border-b-2 my-2"/>
        <div className="grid grid-cols-2 grid-rows-2">
          <p>Vår referanse</p>
          <p>{user?.contactName}</p>
          <p>Deres referanse</p>
          <p>{customer?.contactName}</p>
        </div>
        <div className="border-b-2 my-2"/>
        <div className="grid grid-cols-2 grid-rows-2">
          <p>Fakturadato</p>
          <p>{timeToDateText(invoiceData.invoiceDate)}</p>
          <p>Forfallsdato</p>
          <p>{timeToDateText(invoiceData.dueDate)}</p>
          <p>Faktura nr.</p>
          <p>{user?.currentInvoice}</p>
        </div>
      </div>
      <div className="col-span-1 row-span-1 flex flex-col justify-end">
        <p className="font-bold">{customer?.name}</p>
        <p>{customer?.orgNr}</p>
        <p>{customer?.streetAdress}</p>
        <p>{customer?.zipLocation}</p>
      </div>
      <div className="col-span-2 row-span-3">
        <div className="py-4">
          <h1 className="text-xl font-bold">{invoiceData.header}</h1>
          <p>{invoiceData.description}</p>
        </div>
        <div className="grid grid-cols-10 text-end">
          <p className="col-span-4 font-bold text-start">Beskrivelse</p>
          <p className="font-bold col-span-2">Pris</p>
          <p className="font-bold">Ant.</p>
          <p className="font-bold">MVA</p>
          <p className="font-bold col-span-2">Total</p>
          <div className="col-span-10 my-2 border-b-2 border-black"/>
        </div>
          {invoiceData.lines.map((item) => 
            <div className="grid grid-cols-10 text-end">
              <p className="col-span-4 text-start">{item.description}</p>
              <p className="col-span-2">{item.price}</p>
              <p>{item.amount}</p>
              <p>{item.vat} %</p>
              <p className="col-span-2">{currencyFormat((item.price*item.amount*item.vat/100)+item.price*item.amount)}</p>
            </div>
          )
        }
        <div className="col-span-10 my-2 border-b border-black"/>
        <div className="grid grid-cols-10 text-end">
          <p className="col-span-7 italic">Nettobelop</p>
          <p className="col-span-3">{currencyFormat(total_price)}</p>
          <p className="col-span-7 italic">Merverdiavgift</p>
          <p className="col-span-3">{currencyFormat(total_vat)}</p>
          <p className="col-span-7 font-bold">Å BETALE</p>
          <p className="col-span-3 font-bold">{currencyFormat(total_sum)}</p>
        </div>
      </div>
      <div className="col-span-2 row-span-1 p-4 bg-zinc-100 rounded-lg flex flex-col justify-evenly">
        <p className="text-xl font-bold">Betalingsinformasjon</p>
        <div className="grid grid-rows-2 grid-cols-4">
          <p>Faktura nr.:</p>
          <p>{user?.currentInvoice}</p>
          <p>Totalt beløp:</p>
          <p className="font-bold">{currencyFormat(total_sum)}</p>
          <p>Bankkontonr.:</p>
          <p>{user?.accountNumber}</p>
        </div>
      </div>      
    </div>
  )
}
