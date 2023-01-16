import React from 'react'
import Invoice from '../components/Invoice'
import { useState } from 'react'
import Button from '../components/Button'
import InvoiceEntry from '../components/InvoiceEntry'
export default function create() {
    
    const [curID, setCurID] = useState(0)
    const [items, setItems] = useState([])
    const [invoiceData, setInvoiceData] = useState(
        {
            dueDate: '',
            header: '',
            description: '',
            customer: '',
        }
    )
    

    const handleChange = (event) => {
        const {name, value} = event.target
        setInvoiceData(prev => ({...prev, [name]: value}))
    }

    const customers = [{id:'', name:''},{id: 1, name:'malakoff'}]
    
    const handleSubmit = () => {
        
    }

  

    const handleAddItem = () => {
        const values = [...items]
        values.push(
            { 
                id:curID,
                name:'i',
                amount: '1',
                price: '',
                description:'',
                vat: '25',
            }
        )
        setCurID(e => e+1)
        setItems(values)
    }

    const handleItemsChange = (e) => {

    }

    const onDelete = (index) => { 
        const values = [...items]
        const res = values.filter( e => e.id !== index)
        setItems(res)
    }

    return (
    <div className="flex h-full p-4 justify-evenly">
        <div className="w-1/2">
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-semibold text-primary">New invoice</h1>
                <div className="flex gap-4">
                    <label className="flex flex-1 flex-col text-xl">
                        Customer
                        <select name="customer" value={invoiceData.customer} onChange={handleChange} className="p-4 rounded-lg" >
                            {customers.map(e => <option value={e.id}>{e.name}</option>)}
                        </select>
                    </label>

                    <label className="flex flex-1 flex-col text-xl">
                        Due date
                        <input type="date" name="dueDate" value={invoiceData.dueDate} onChange={handleChange} className="p-4 rounded-lg"/>
                    </label>
                </div>
                
                <label className="flex flex-col text-xl">
                    Header
                    <input type="text" name="header" value={invoiceData.header} onChange={handleChange} className="p-4 rounded-lg"/>
                </label>
                
                <label className="flex flex-col text-xl">
                    Description
                    <input type="text" name="description" value={invoiceData.description} onChange={handleChange} className="p-4 rounded-lg"/>
                </label>

                <div className="flex justify-between">
                    <h2 className="text-xl">Items</h2>
                    <Button text="Add" intent="neutral" onClick={()=> handleAddItem()}/>

                </div>
                {items.map((item, index) =>
                    <InvoiceEntry data={item} onChange={handleItemsChange} onDelete={onDelete} label={index}/>
                )}
                

                <div className="flex gap-4 justify-end">
                    <Button text="Cancel" intent="danger" onClick={()=> window.location.href="/"}/>
                    <Button text="Generate" onClick={handleSubmit}/>
                </div>
            </div>
        </div>
        <div className="rounded-xl shadow-lg bg-white ">
            <Invoice invoiceData={invoiceData}/>
        </div>
    </div>
  )
}
