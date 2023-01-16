import React from 'react'
import { useState } from 'react'
export default function InvoiceEntry({data, onDelete, label}) {
    

    
    const handleChange = (event) => {
        const {name, value} = event.target


    }

    return (
    <div className="flex gap-4 items-end w-full border-2">
        <p className="py-4 font-semibold text-lg">
        {label+1}
        </p>
        <label className="flex flex-col max-w-[80px]">
            Amount
            <input type="number" name="amount" onChange={(event) => onChange(event, data.id)} value={data.amount} className="p-4 rounded-lg"/>
        </label>
        <label className="flex-1 flex flex-col">
            Description
            <input type="text" name="amount" onChange={(event) => onChange(event, data.id)} value={data.amount} className="p-4 rounded-lg"/>
        </label>

        <label className="flex flex-col ">
            Price
            <input type="number" name="vat" onChange={(event) => onChange(event, data.id)} value={data.price} className="p-4 rounded-lg"/>
        </label>

        <label className="flex flex-col max-w-[80px]">
            Vat. (%)
            <input type="number" name="vat" onChange={(event) => onChange(event, data.id)} value={data.vat} className="p-4 rounded-lg"/>
        </label>

        <button className="py-4 rounded-full text-zinc-400 hover:text-red-400 hover:scale-125" onClick={()=> onDelete(data.id)}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>

        </button>

    </div>
  )
}
