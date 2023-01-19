import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import { useSession } from 'next-auth/react'
import { currentInvoicesState } from '../atoms/currenInvoicesStateAtom'
import { useRecoilState } from 'recoil'
import { useEffect } from 'react'
import { fetchInvoicesByUser } from '../firebase'
import ListView from '../components/ListView'
import  Button  from '../components/Button'
import { useRouter } from 'next/router'
import Piechart from '../components/Piechart'
import { SettingsState } from '../atoms/settingsModalState'
import { CreateCustomerState } from '../atoms/createCustomerModalState'


function page() {
  const router = useRouter()
  const {data: session} = useSession()
  const [invoices, setInvoices] = useRecoilState(currentInvoicesState)
  const [settingsModalOpen, setSettingsModalOpen] = useRecoilState(SettingsState)
  const [customerModalOpen, setCustomerModalOpen] = useRecoilState(CreateCustomerState)


  useEffect(() => {
    if (session){ 
      fetchInvoicesByUser(session.user?.uid).then( i => {
        console.log(i)
        setInvoices(i)
      }
      )
    }
  }, [session])

  
  const now = new Date().getHours()
  let greeting = "Hello"
  if (now >= 0 && now < 6 ) { greeting = "Good night" }
  if (now >= 6 && now < 12) { greeting = "Good morning" }
  if (now >= 12 && now < 18) { greeting = "Good afternoon" }
  if (now >= 18 && now < 24) { greeting = "Good evening" }
 
  const nextDue = invoices.map(e => new Date(e.dueDate.seconds*1000)).sort().filter(e => e > new Date())?.at(0)
  
  console.log('nextDue')
  console.log(nextDue)
  if (!session) {
    return (<Link href='/auth/signin' className="absolute top-1/2 left-1/2 text-center py-2 px-6 bg-secondary text-white font-bold rounded-full hover:scale-105 transition-all">Sign in first</Link>)
  }
  return (
    <div className="h-full flex flex-col items-center justify-start p-4">
        <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
      <div className=" lg:w-1/2 h-1/2 grid grid-cols-6 gap-10">
        <h2 className="text-6xl text-start col-span-6 text-primary w-full font-bold">{greeting}, {session?.user?.firstname}</h2>
      
        <Button className="col-span-6 lg:col-span-2" size="large" fullWidth={true} onClick = {() => router.push('/create')}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v12m-3-2.818l.879.659c1.171.879 3.07.879 4.242 0 1.172-.879 1.172-2.303 0-3.182C13.536 12.219 12.768 12 12 12c-.725 0-1.45-.22-2.003-.659-1.106-.879-1.106-2.303 0-3.182s2.9-.879 4.006 0l.415.33M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> </svg>
          New invoice
        </Button>
            
        <Button className="col-span-6 lg:col-span-2" size="large" fullWidth={true} onClick = {() => setCustomerModalOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0112.75 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.766z" /> </svg>
          Create customer
        </Button>
    
        <Button className="col-span-6 lg:col-span-2" size="large" fullWidth={true} onClick = {() => setSettingsModalOpen(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6"> <path strokeLinecap="round" strokeLinejoin="round" d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z" /> <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /> </svg>
          Settings
        </Button>
          
        <div className="h-full bg-white rounded-xl p-10 flex flex-col gap-4 col-span-6 lg:col-span-3">
            <h2 className="font-semibold text-3xl text-primary">Status</h2>
            <Piechart invoices={invoices}/>
        </div>

        <div className="aspect-square bg-white rounded-xl pt-10 px-10 flex flex-col gap-10 col-span-6 lg:col-span-3">
          <h2 className="font-semibold text-3xl text-primary flex">Next payment</h2>
          {nextDue? 
          <div>
            <p className="text-[7rem] text-center  text-secondary font-bold">{nextDue.getDate()}</p>
            <p className="text-[4rem] -translate-y-10 text-center text-secondary"> {nextDue.toLocaleString('nb-NO',{month:'long'}).slice(0,3).toUpperCase()} </p>
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

        <div className="bg-white items-center rounded-xl w-full  flex flex-col gap-6 col-span-6">
          <table className="w-full text-start">
            <thead className="bg-primary text-white">
              <tr>
                <th className="text-start lg:p-4 rounded-tl-lg ">Invoice no.</th>
                <th className="text-start lg:p-4">Due date</th>
                <th className="text-start lg:p-4">Header</th>
                <th className="text-start lg:p-4">Amount</th>
                <th className="text-start lg:p-4 rounded-tr-lg lg:rounded-none">Status</th>
                <th className="text-start hidden  lg:table-cell p-4 rounded-tr-lg ">Export</th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((e, index) => {
                console.log(index)
                return <ListView invoice={e} key={index} number={index}/>
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div> 
  )
}
export default page