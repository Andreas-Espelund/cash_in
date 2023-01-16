import React from 'react'
import Invoice from '../components/Invoice'
import { useState } from 'react'
import Button from '../components/Button'
export default function create() {

    const [invoiceData, setInvoiceData] = useState(
        {
            dueDate: '',
            header: '',
            description: '',
            customer: '',
        }
    )
    const [items, setItems] = useState([])


    const handleChange = (event) => {
        const {name, value} = event.target
        setInvoiceData(prev => ({...prev, [name]: value}))
    }

    const customers = [{id:'', name:''},{id: 1, name:'malakoff'}]
    
    const handleSubmit = () => {

    }

    const handleAddItem = () => {
        const values = [...items]
        values.push({name:'a',value:''})
        setItems(values)
    }

    const handleItemsChange = (e) => {

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

                <h2 className="text-xl">Items</h2>
                {items.map((item, index) =>
                    <label className="flex flex-col text-xl">
                        {item.name}
                        <input type="text" name={item.name} value={item.value} onChange={handleItemsChange} className="p-4 rounded-lg"/>
                    </label>
                )}
                <div className="w-fit ml-auto">
                    <Button text="add" intent="neutral"  onClick={handleAddItem}/>
                </div>


                <div className="flex gap-4 justify-end">
                    <Button text="Cancel" intent="danger" onClick={()=> window.location.href="/"}/>
                    <Button text="Generate" onClick={handleSubmit}/>
                </div>
            </div>
        </div>
        <div className=" rounded-xl shadow-lg bg-white ">
            <Invoice invoiceData={invoiceData}/>
        </div>
    </div>
  )
}
