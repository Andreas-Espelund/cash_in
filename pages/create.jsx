import React, { useState } from 'react'
import { Modal, Invoice, Button, Input, SingInPrompt, IconButton} from '../components'
import jsPDF from 'jspdf'
import { UserState } from '../atoms/userAtom'
import { CustomersState } from '../atoms/customersAtom'
import { useRecoilValue } from 'recoil'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import { AnimatePresence } from 'framer-motion'
import { createNewInvoice, updateUser } from '../firebase'
import { Timestamp } from '@firebase/firestore'
import { TODAY } from '../tools/date'
import { CrossIcon, MobileIcon, PlusIcon } from '../components/icons'
import { generatePdf } from '../tools/pdf'

export default function create() {
    
    const router = useRouter()
    const invoiceEntry = { amount: 1,price: 0,description:'',vat: 25}
    const {data: session} = useSession()
    const customers = useRecoilValue(CustomersState)
    const user = useRecoilValue(UserState)
    const [warningModal, setWarningModal] = useState(false)
    const [started, setStarted] = useState(false)
    const [invoiceData, setInvoiceData] = useState(
        {
            dueDate: new Timestamp(),
            invoiceDate: Timestamp.fromDate(TODAY),
            header: '',
            paid: false,
            description: '',
            customer: '',
            lines: [invoiceEntry]
        }
    )

   
    
    const objectById = (items, id) => {
        return items.filter(e => e.orgNr == id).at(0)
    }  
    const handleChange = (event) => {
        setStarted(true)
        let {name, value} = event.target
        if (name == 'dueDate') { value = Timestamp.fromDate(new Date(value)) }
        setInvoiceData(prev => ({...prev, [name]: value}))
        console.log(invoiceData)
    }  
  
    const createInvoice = () => {
        generatePdf('invoice_wrapper', user.currentInvoice)
        
        const invoice = invoiceData
        invoice['lines'] = JSON.stringify(invoiceData.lines)
        invoice['number'] = user.currentInvoice
        invoice['user'] = session?.user?.uid
        incrementInvoiceNumber()
        createNewInvoice(invoice)
    }


    
    
    const incrementInvoiceNumber = () => {
        const curUser = {...user}
        const no = parseInt(curUser['currentInvoice']) + 1        
        curUser['currentInvoice'] = no
        updateUser(session.user?.uid, curUser)
    }


    
    const handleItemsChange = (index, event) => {
        let data = [...invoiceData.lines]
        const name = event.target.name
        const value =  name == 'description'? event.target.value : event.target.valueAsNumber || 0
        data[index][name] = value
        setInvoiceData(prev => ({...prev, ['lines']: data}))    
    }
    
    const onDelete = (index) => { 
        const values = [...invoiceData.lines]
        values.splice(index,1)
        setInvoiceData(prev => ({...prev, ['lines']: values}))    
    }
    
    
    const handleAddItem = () => setInvoiceData(prev => ({...prev, ['lines']: [...prev.lines, invoiceEntry]}))    
    const cancel = () => started? setWarningModal(true) : router.back()

    if (!session) {
        return <SingInPrompt/>
    }

    return (
    <div className="flex h-full lg:p-10 justify-evenly  flex-col gap-10 lg:flex-row items-center lg:items-start">
        <div className="w-4/5 lg:w-1/2 grid grid-cols-2 gap-4">
            <h1 className="text-4xl col-span-2 font-semibold text-primary">New invoice</h1>
            
            <label className="flex flex-1 flex-col text-xl">
                Customer
                <select name="customer" value={invoiceData.customer} onChange={handleChange} className="p-4 rounded-lg outline-zinc-200" >
                    <option key={-1} value={null}></option>
                    {customers.map(e => <option key={e.orgNr} value={e.id}>{e.name}</option>)}
                </select>
            </label>

            <Input label="Due date" type="date" name="dueDate" value={invoiceData.dueDate} onChange={handleChange}/>
            <Input className="col-span-2" label="Header" type="text" name="header" value={invoiceData.header} onChange={handleChange}/>
            <Input className="col-span-2" label="Description" type="text" name="description" value={invoiceData.description} onChange={handleChange}/>
            <div className="col-span-2 flex items-center justify-between">
                <h2 className="text-xl">Items</h2>
                <IconButton onClick={() => handleAddItem()}>
                    <PlusIcon/>
                </IconButton>
            </div>

            <div className="col-span-2 grid grid-cols-15 w-full gap-4 bg-secondary rounded-lg p-2 text-neutral font-semibold">
                <p className="p-2 col-span-2" >Amount</p>
                <p className="p-2 col-span-7" >Description</p>
                <p className="p-2 col-span-3" >Price</p>
                <p className="p-2 col-span-2" >Vat. (%)</p>
                
                
            </div>
                

            
            {invoiceData.lines.map((input, index) =>
                <div className="col-span-2 items-center  grid grid-cols-15 gap-4" key={index}>
                    
                    <Input className="col-span-2" type="number" name="amount" onChange={event => handleItemsChange(index, event)} value={input.amount} />
                    <Input className="col-span-7" type="text" name="description" onChange={event => handleItemsChange(index, event)} value={input.description} />
                    <Input className="col-span-3" type="number" name="price" onChange={event => handleItemsChange(index, event)} value={input.price} />
                    <Input className="col-span-2" type="number" name="vat" onChange={event => handleItemsChange(index, event)} value={input.vat} />

                    <IconButton onClick={() => onDelete(index)}>
                        <CrossIcon/>
                    </IconButton>
                    
                </div>
                
            )}
            <div className="flex gap-4 justify-end col-span-2">
                <Button outlined={true} onClick={cancel}>Back</Button>
                <Button onClick={createInvoice}> Generate </Button>
            </div>
        </div>


        <div className=" rounded-xl shadow-lg bg-white" id="invoice_wrapper">
            <Invoice user={user} invoiceData={invoiceData}/>
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
