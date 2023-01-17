import React from 'react'
import Invoice from '../components/Invoice'
import { useState } from 'react'
import Button from '../components/Button'
import jsPDF from 'jspdf'
import { CustomersState } from '../atoms/customersAtom'
import { UserState } from '../atoms/userAtom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useSession } from 'next-auth/react'
import { createNewInvoice, updateUser } from '../firebase'
import Link from 'next/link'
import { useRouter } from 'next/router'
export default function create() {
    
    const router = useRouter()
    const invoiceEntry = { amount: '',price: '',description:'',vat: ''}
    const {data: session} = useSession()
    const customers = useRecoilValue(CustomersState)
    const [user, setUser] = useRecoilState(UserState)
    const [items, setItems] = useState([])
    const [invoiceData, setInvoiceData] = useState(
        {
            dueDate: '',
            header: '',
            description: '',
            customer: '',
            lines: []
        }
    )

    const handleChange = (event) => {
        const {name, value} = event.target
        setInvoiceData(prev => ({...prev, [name]: value}))
    }


    const handleSubmit = () => {
        console.log(items)
    }

    const serialiseItems = () => {
        const res = items.map(e => e.amount + ';' + e.price + ';' + e.description + ';' + e.vat)
        return res
        
    }

    const createInvoice = () => {
        
        const lines = serialiseItems()
        const invoice = invoiceData

        invoice['lines'] = lines
        invoice['number'] = user.currentInvoice
        invoice['user'] = session?.user?.uid
        incrementInvoiceNumber()
        createNewInvoice(invoice)
        generatePdf()
    }


    const generatePdf = () => {
        const content = document.getElementById('invoice_wrapper')
        const doc = new jsPDF('p','pt','a4')
        doc.html(content, {
            callback: (pdf) => pdf.save(`invoice_${user.currentInvoice}.pdf`)
        })
    }


    
    const incrementInvoiceNumber = () => {
        const curUser = {...user}
        const no = parseInt(curUser['currentInvoice']) + 1        
        curUser['currentInvoice'] = no
        updateUser(session.user?.uid, curUser)
    }
    const handleAddItem = () => {
        setItems([...items, invoiceEntry])
    }

    const handleItemsChange = (index, event) => {
        let data = [...items]
        const { name, value } = event.target
        data[index][name] = value
        setItems(data)
    }

    const onDelete = (index) => { 
        const values = [...items]
        values.splice(index,1)
        setItems(values)
    }

    if (!session) {
        return (<Link href='/auth/signin' className="absolute top-1/2 left-1/2 text-center py-2 px-6 bg-secondary text-white font-bold rounded-full hover:scale-105 transition-all">Sign in first</Link>)
    }

    return (
    <div className="flex h-full lg:p-10 justify-evenly  flex-col gap-10 lg:flex-row items-center lg:items-start">
        <div className="w-4/5 lg:w-1/2">
            <div className="flex flex-col gap-4">
                <h1 className="text-4xl font-semibold text-primary">New invoice</h1>
                <div className="flex gap-4">
                    <label className="flex flex-1 flex-col text-xl">
                        Customer
                        <select name="customer" value={invoiceData.customer} onChange={handleChange} className="p-4 rounded-lg" >
                            {customers.map(e => <option key={e.orgNr} value={e.orgNr}>{e.name}</option>)}
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
                    <Button intent="neutral" onClick={()=> handleAddItem()}>Add</Button>

                </div>
                {items.map((input, index) =>
                    <div className="flex gap-4 items-end w-full" key={index}>
                    <p className="py-4 font-semibold text-lg"> {index+1} </p>
                    <label className="flex flex-col max-w-[80px]">
                        Amount
                        <input type="number" name="amount" onChange={event => handleItemsChange(index, event)} value={input.amount} className="p-4 rounded-lg"/>
                    </label>
                    <label className="flex-1 flex flex-col">
                        Description
                        <input type="text" name="description" onChange={event => handleItemsChange(index, event)} value={input.description} className="p-4 rounded-lg"/>
                    </label>
            
                    <label className="flex flex-col ">
                        Price
                        <input type="number" name="price" onChange={event => handleItemsChange(index, event)} value={input.price} className="p-4 rounded-lg"/>
                    </label>
            
                    <label className="flex flex-col max-w-[80px]">
                        Vat. (%)
                        <input type="number" name="vat" onChange={event => handleItemsChange(index, event)} value={input.vat} className="p-4 rounded-lg"/>
                    </label>
            
                    <button className="py-4 rounded-full text-zinc-400 hover:text-red-400 hover:scale-125" onClick={() => onDelete(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>  
                </div>
                    
                    
                )}
                <div className="flex gap-4 justify-end">
                    <Button intent="danger" onClick={()=> router.back()}>Cancel</Button>
                    <Button onClick={createInvoice}> Generate </Button>
                </div>
            </div>
        </div>
        <div className=" rounded-xl shadow-lg bg-white" id="invoice_wrapper">
            <Invoice user={user} invoiceData={invoiceData}  customer={customers.filter(e => e.orgNr == invoiceData.customer)[0]} lines={items}/>
        </div>
    </div>
  )
}
