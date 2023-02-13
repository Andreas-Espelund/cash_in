import React from 'react'
import { useRouter } from 'next/router'
import { CustomersState } from '../../atoms/customersAtom'
import { useRecoilValue } from 'recoil'
import { currentInvoicesState } from '../../atoms/currenInvoicesStateAtom'
import { useRecoilState } from 'recoil'
import { Button, IconButton } from '../../components'
import { deleteCustomer } from '../../firebase'
import Link from 'next/link'
import InvoiceView from '../../components/InvoiceView'
import { UserState } from '../../atoms/userAtom'
export default function Customer() {
  const router = useRouter()
  const {cid}  = router.query
  const [invoices, setInvoices] = useRecoilState(currentInvoicesState)
  const [customers, setCustomers] = useRecoilState(CustomersState)

  const objectById = (items, id) => {
    return items.filter(e => e.id == id).at(0)
  }
  
  const customer = objectById(customers, cid)

  const handleDelete = (id) => {
    deleteCustomer(id)
    const res = customers.filter((e) => e.id !== cid)
    setCustomers(res)
    router.push('/')
  }


  if (!customer) {
    return (
      <div className="h-full grid place-content-center text-center gap-4">
          <p className="text-5xl">...</p>
          
          <Link href="/" className="py-4 px-8 font-semibold text-white bg-primary rounded-full">Go back</Link>
      </div>
    )
  }

  console.log(invoices)
  console.log(cid)


  return (
    <div className="p-10 text-xl flex flex-col gap-10 lg:w-1/2 m-auto">
      <div className="bg-white rounded-lg p-10 flex flex-col gap-4">
        <div className="flex justify-between">
          <p className="text-4xl font-semibold col-span-3">{customer?.name}</p>
          <IconButton>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125" />
            </svg>
          </IconButton>
        </div>

        <p className="flex items-center gap-2">
          {customer?.orgNr}
        </p>

        <p className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {customer?.contactName}
        </p>
        
        <p className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
          </svg>
          {customer?.email}
        </p>
        
        <p className="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 21v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21m0 0h4.5V3.545M12.75 21h7.5V10.75M2.25 21h1.5m18 0h-18M2.25 9l4.5-1.636M18.75 3l-1.5.545m0 6.205l3 1m1.5.5l-1.5-.5M6.75 7.364V3h-3v18m3-13.636l10.5-3.819" />
          </svg>

          {customer?.streetAdress}, {customer?.zipLocation}
        </p>

        <p>
        
        </p>
        
      </div>



      
      <InvoiceView invoices={invoices.filter(e => e.customer == cid)}/>
      

      <div className="col-span-4 gap-4 ml-auto flex">
        <Button outlined={true}  onClick={() => router.back()}>Back</Button>
        <Button intent="danger"  onClick={() => {}}>Delete customer</Button>
      </div>
      
    </div>
  )
}
