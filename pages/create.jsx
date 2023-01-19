import React from 'react'
import Invoice from '../components/Invoice'
import { useState } from 'react'
import Modal from '../components/Modal'
import Button from '../components/Button'
import jsPDF from 'jspdf'
import { CustomersState } from '../atoms/customersAtom'
import { UserState } from '../atoms/userAtom'
import { useRecoilState, useRecoilValue } from 'recoil'
import { useSession } from 'next-auth/react'
import { createNewInvoice, updateUser } from '../firebase'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { AnimatePresence } from 'framer-motion'
import Calendar from 'react-calendar'
import { Timestamp } from '@firebase/firestore'

export default function create() {
    
    const router = useRouter()
    const invoiceEntry = { amount: 1,price: 0,description:'',vat: 25}
    const {data: session} = useSession()
    const customers = useRecoilValue(CustomersState)
    const [user, setUser] = useRecoilState(UserState)
    const [warningModal, setWarningModal] = useState(false)
    const [items, setItems] = useState([invoiceEntry])
    const [started, setStarted] = useState(false)
    const [invoiceData, setInvoiceData] = useState(
        {
            dueDate: new Timestamp(),
            invoiceDate: Timestamp.fromDate(new Date()),
            header: '',
            description: '',
            customer: '',
            lines: []
        }
    )

    const handleChange = (event) => {
        setStarted(true)
        let {name, value} = event.target
        if (name == 'dueDate') { value = Timestamp.fromDate(new Date(value)) }
        setInvoiceData(prev => ({...prev, [name]: value}))
    }

   
  
    const createInvoice = () => {
        
        const invoice = invoiceData

        invoice['lines'] = JSON.stringify(items)
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
        const name = event.target.name
        const value =  name == 'description'? event.target.value : event.target.valueAsNumber || undefined
        data[index][name] = value
        setItems(data)
    }

    const onDelete = (index) => { 
        const values = [...items]
        values.splice(index,1)
        setItems(values)
    }


    const cancel = () => {
        if (started){
            setWarningModal(true)

        } else {
            router.back()
        }
    }

    if (!session) {
        return (<Link href='/auth/signin' className="absolute top-1/2 left-1/2 text-center py-2 px-6 bg-secondary text-white font-bold rounded-full hover:scale-105 transition-all">Sign in first</Link>)
    }

    return (
    <div className="flex h-full lg:p-10 justify-evenly  flex-col gap-10 lg:flex-row items-center lg:items-start">
        <div className="w-4/5 lg:w-1/2 grid grid-cols-2 gap-4">
            <h1 className="text-4xl col-span-2 font-semibold text-primary">New invoice</h1>
            <label className="flex flex-1 flex-col text-xl">
                Customer
                <select name="customer" value={invoiceData.customer} onChange={handleChange} className="p-4 rounded-lg" >
                    <option key={-1} value={null}></option>
                    {customers.map(e => <option key={e.orgNr} value={e.orgNr}>{e.name}</option>)}
                </select>
            </label>

            <label className="flex flex-1 flex-col text-xl">
                Due date
                <input type="date" name="dueDate" value={invoiceData.dueDate} onChange={handleChange} className="p-4 rounded-lg"/>
            </label>
            
            <label className="flex flex-col text-xl col-span-2">
                Header
                <input type="text" name="header" value={invoiceData.header} onChange={handleChange} className="p-4 rounded-lg"/>
            </label>
            
            <label className="flex flex-col text-xl col-span-2">
                Description
                <input type="text" name="description" value={invoiceData.description} onChange={handleChange} className="p-4 rounded-lg"/>
            </label>

            <h2 className="text-xl col-span-2">Items</h2>
            
           
            <div className="grid grid-cols-15 col-span-2 gap-4">
                <p className=" col-span-2" >Amount</p>
                <p className=" col-span-7" >Description</p>
                <p className=" col-span-3" >Price</p>
                <p className=" col-span-2" >Vat. (%)</p>
                <p className="" ></p>

                

            </div>
            
            {items.map((input, index) =>
                <div className="col-span-2  grid grid-cols-15 gap-4" key={index}>
                    
                    <input className="p-4 rounded-lg col-span-2" type="number" name="amount" onChange={event => handleItemsChange(index, event)} value={input.amount} />
                    <input className="p-4 rounded-lg col-span-7" type="text" name="description" onChange={event => handleItemsChange(index, event)} value={input.description} />
                    <input className="p-4 rounded-lg col-span-3" type="number" name="price" onChange={event => handleItemsChange(index, event)} value={input.price} />
                    <input className="p-4 rounded-lg col-span-2" type="number" name="vat" onChange={event => handleItemsChange(index, event)} value={input.vat} />
                
                    <button className="py-4 m-auto rounded-full text-zinc-400 hover:text-red-400 hover:scale-125" onClick={() => onDelete(index)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>  
                    
                </div>
                
            )}
            
            <Button className="ml-auto col-span-2" intent="neutral" onClick={()=> handleAddItem()}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
            </Button>
            
          
            <div className="flex gap-4 justify-end col-span-2">
                
                <Button outlined={true} onClick={cancel}>Back</Button>
                <Button onClick={createInvoice}> Generate </Button>
            </div>
        </div>
        <div className=" rounded-xl shadow-lg bg-white" id="invoice_wrapper">
            <Invoice user={user} invoiceData={invoiceData}  customer={customers.filter(e => e.orgNr == invoiceData.customer)[0]} lines={items}/>
        </div>

        <AnimatePresence
            initial={false}
            wait
        >
            {warningModal &&
            <Modal modalOpen={warningModal}>
                <div className="bg-white p-8 rounded-xl w-1/2 m-auto flex flex-col gap-4">
                    <h2 className="font-semibold text-xl">Are you sure you want to go back?</h2>
                    <p>All progress will be lost</p>
                    <div className="flex gap-2 justify-end">
                        <Button outlined={true} fullWidth={true} onClick={() => {setWarningModal(false); router.back()}} > Leave </Button>
                        <Button  fullWidth={true} onClick={() => setWarningModal(false)}> Stay </Button>
                    </div>
                </div>
            </Modal>
            }
        </AnimatePresence>
    </div>
  )
}
