import React from 'react'
import Navbar from './Navbar'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useSession } from 'next-auth/react'
import { CustomersState } from '../atoms/customersAtom'
import { UserState } from '../atoms/userAtom'
import { getUser, fetchCustomersByUser, fetchInvoicesByUser } from '../firebase'
import { CreateCustomerState } from '../atoms/createCustomerModalState'
import { currentInvoicesState } from '../atoms/currenInvoicesStateAtom'
import { SettingsState } from '../atoms/settingsModalState'
import { AnimatePresence } from 'framer-motion'
import Modal from './Modal'
import UserSettings from './UserSettings'
import NewCustomer from './NewCustomer'

export default function Layout({children}) {

  const {data:session} = useSession()
  const [user, setUser] = useRecoilState(UserState)
  const [customers, setCustomers] = useRecoilState(CustomersState)
  const [customersOpen, setCustomersOpen] = useRecoilState(CreateCustomerState)
  const [settingsOpen, setSettingsOpen] = useRecoilState(SettingsState)
  const [invoices, setInvoices] = useRecoilState(currentInvoicesState)
  
  useEffect(() => {
      const uid = session?.user?.uid
      if (uid){
        getUser(uid).then( u =>
          setUser(u)  
        )
        fetchCustomersByUser(uid).then( c => 
          setCustomers(c)  
        )
        fetchInvoicesByUser(uid).then( i => 
          setInvoices(i)
          )
      }
  }, [session])
  
  return (
    <div className="h-[100dvh] flex flex-col">
      <Navbar/>
      <div className="flex-1 border-green-500 bg-neutral">
        {children}
      </div>



      {/*user settings modal*/}
      <AnimatePresence
        initial={false}
        wait
      >
        {settingsOpen && 
          <Modal modalOpen={settingsOpen}>
            <UserSettings handleClose={()=>setSettingsOpen(false)}/>
          </Modal>
        }
      </AnimatePresence>
      
      {/*Create customer modal*/}
      <AnimatePresence
        initial={false}
        wait
      >
        {customersOpen && 
          <Modal modalOpen={customersOpen}>
            <NewCustomer handleClose={()=> setCustomersOpen(false)}/>
          </Modal>
        }
      </AnimatePresence>

    </div>
 )
}
