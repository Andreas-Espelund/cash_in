import React from 'react'
import logo from '../public/jackbow.jpg'
import Image from 'next/image'
export default function Invoice({user, invoiceData, customer, lines}) {
    const total_price = lines.reduce((total, a) => total+ parseFloat(a.price), 0)
    const total_vat = lines.reduce((total, a) => total + parseFloat(a.vat)* parseFloat(a.price)/100, 0)
    const total_sum = total_price + total_vat

  return (
    <div id="invoice-content" className="w-[157.5mm] h-[222.5mm] p-4 grid grid-rows-6 grid-cols-2 gap-4">
          <div className="col-span-1 row-span-1">
            <Image src={logo} alt="company logo" className="m-auto h-[100%] w-auto"/>
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
              <p>{new Date().toLocaleDateString("en-US", {year:'numeric', month:"2-digit", day:'2-digit'})}</p>
              <p>Forfallsdato</p>
              <p>{new Date(invoiceData.dueDate).toLocaleDateString('en-US')}</p>
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
              {lines.map((item) => 
                <div className="grid grid-cols-10 text-end">
                  <p className="col-span-4 text-start">{item.description}</p>
                  <p className="col-span-2">{item.price} kr</p>
                  <p>{item.amount}</p>
                  <p>{item.vat} %</p>
                  <p className="col-span-2">{(item.price*item.amount*item.vat/100)+item.price*item.amount} kr</p>
                </div>
              )
            }
                
            <div className="col-span-10 my-2 border-b border-black"/>
            <div className="grid grid-cols-10 text-end">
              <p className="col-span-7 italic">Nettobelop</p>
              <p className="col-span-3">{total_price} kr</p>
              <p className="col-span-7 italic">Merverdiavgift</p>
              <p className="col-span-3">{total_vat} kr</p>
              <p className="col-span-7 font-bold">Å BETALE</p>
              <p className="col-span-3 font-bold">{total_sum} kr</p>
            </div>

            
          
          </div>
          
          
          <div className="col-span-2 row-span-1 p-4 bg-zinc-100 rounded-lg flex flex-col justify-evenly">
            <p className="text-xl font-bold">Betalingsinformasjon</p>
            <div className="grid grid-rows-2 grid-cols-4">
              <p>Faktura nr.:</p>
              <p>{user?.currentInvoice}</p>
              <p>Totalt beløp:</p>
              <p className="font-bold">{total_sum}</p>
              <p>Bankkontonr.:</p>
              <p>{user?.accountNumber}</p>
            </div>
          </div>
          
        </div>
  )
}
