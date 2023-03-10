import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentInvoicesState } from '../atoms/currenInvoicesStateAtom'
import { CreateCustomerState } from '../atoms/createCustomerModalState'
import { SettingsState } from '../atoms/settingsModalState'
import { CustomersState } from '../atoms/customersAtom'
import { UserState } from '../atoms/userAtom'
import { SingInPrompt, Piechart, Button, Invoice} from '../components/'
import { CoinIcon, NewUserIcon, SettingsIcon } from '../components/icons'
import InvoiceView from '../components/InvoiceView'

function page() {
  const router = useRouter()
  const {data: session} = useSession()
  const user = useRecoilValue(UserState)
  const [invoices, setInvoices] = useRecoilState(currentInvoicesState)
  const [settingsModalOpen, setSettingsModalOpen] = useRecoilState(SettingsState)
  const [customerModalOpen, setCustomerModalOpen] = useRecoilState(CreateCustomerState)
  const customers = useRecoilValue(CustomersState)


  const objectById = (items, id) => {
    return items.filter(e => e.orgNr == id).at(0)
}  
  const now = new Date().getHours()
  let greeting = "Hello"
  if (now >= 0 && now < 6 ) { greeting = "Good night" }
  if (now >= 6 && now < 12) { greeting = "Good morning" }
  if (now >= 12 && now < 18) { greeting = "Good afternoon" }
  if (now >= 18 && now < 24) { greeting = "Good evening" }
 
  const nextDue = invoices.map(e => new Date(e.dueDate.seconds*1000)).sort().filter(e => e > new Date())?.at(0)
  
  
  if (!session) {
    
    return (
      <SingInPrompt/>
    )
  }
  return (
    <div className="h-full flex flex-col items-center justify-start p-4 lg:p-10">
        
      <div className="h-1/2 grid grid-cols-6 gap-10">
        <h2 className="text-6xl text-start col-span-6 text-primary w-full font-bold">{greeting}, {session?.user?.firstname}</h2>
      
        <Button className="col-span-6 lg:col-span-2" size="large" fullWidth={true} onClick = {() => router.push('/create')}>
          <CoinIcon/>
          New invoice
        </Button>
            
        <Button className="col-span-6 lg:col-span-2" size="large" fullWidth={true} onClick = {() => setCustomerModalOpen(true)}>
          <NewUserIcon/>
          Create customer
        </Button>
    
        <Button className="col-span-6 lg:col-span-2" size="large" fullWidth={true} onClick = {() => setSettingsModalOpen(true)}>
          <SettingsIcon/>
          Settings
        </Button>
          
        <div className="w-full bg-white aspect-square rounded-xl p-10 gap-10 flex flex-col col-span-3">
            <h2 className="font-semibold text-3xl text-primary">Status</h2>
            <Piechart invoices={invoices}/>
        </div>

        <div className="w-full bg-white aspect-square rounded-xl p-10  flex flex-col col-span-3 overflow-hidden">
          <h2 className="font-semibold text-3xl text-primary">Next payment</h2>
          {nextDue? 
          <div className="flex-1 flex flex-col">
            <p className="text-[5rem] lg:text-[7rem] text-center  text-secondary font-bold">{nextDue.getDate()}</p>
            <p className="text-[2rem] lg:text-[4rem] -translate-y-3 text-center text-secondary"> {nextDue.toLocaleString('nb-NO',{month:'long'}).slice(0,3).toUpperCase()} </p>
          </div>
          :
          <div className="text-center text-2xl font-semibold text-secondary">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-40 h-40 m-auto">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.182 16.318A4.486 4.486 0 0012.016 15a4.486 4.486 0 00-3.198 1.318M21 12a9 9 0 11-18 0 9 9 0 0118 0zM9.75 9.75c0 .414-.168.75-.375.75S9 10.164 9 9.75 9.168 9 9.375 9s.375.336.375.75zm-.375 0h.008v.015h-.008V9.75zm5.625 0c0 .414-.168.75-.375.75s-.375-.336-.375-.75.168-.75.375-.75.375.336.375.75zm-.375 0h.008v.015h-.008V9.75z" />
            </svg>
            Nothing inbound

          </div>  
          }
        </div>

        <h2 className="text-4xl text-primary text-start w-full font-bold col-span-6">Invoices</h2>    

        <div className="col-span-6">
          <InvoiceView invoices={invoices}/>
        </div>

        <h2 className="text-4xl text-primary text-start w-full font-bold col-span-6">Customers</h2>    
        <div className="col-span-6 bg-white rounded-lg">
          <table className="w-full m-auto text-start">
            <thead className="bg-primary text-white w-full">
              <tr>
                <th className="text-start lg:p-4 rounded-tl-lg ">Company</th>
                <th className="text-start lg:p-4">Org. number</th>
                <th className="text-start lg:p-4">Contact person</th>
                <th className="text-start lg:p-4 rounded-tr-lg">Email</th>                
              </tr>
            </thead>
            <tbody className="">
              {customers.map((e, index) => 
                <tr className="relative">  
                  <td className="p-4"> <Link href={`/customers/${e.id}`} className="hover:border-b hover:text-primary border-primary transition-all">{e.name}</Link> </td>
                  <td className="p-4">{e.orgNr}</td>
                  <td className="p-4">{e.contactName}</td>
                  <td className="p-4">{e.email}</td>
                  <div className={`${index == 0 && 'hidden'} border-b-2  absolute top-0  w-[96%] left-4 `}></div>
                </tr>
              )}
            </tbody>
          </table>
          {customers.length == 0 &&
          <div className="p-4 w-full text-center grid place-content-center italic text-zinc-400 text-md">
            No customers to show
          </div>}
        </div>
        <div className="hidden">
          {invoices.map(e => {
              const invoiceData = {...e}
              invoiceData['customer'] = objectById(customers, e.customer)
             return (
              <div id={e.number}>
                <Invoice user={user} invoiceData={invoiceData}/>
              </div>
              )
          }
            )}
        </div>
      </div>
    </div> 
  )
}
export default page