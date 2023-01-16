'use client'
import React from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Modal from './Modal'
import UserSettings from './UserSettings'
import NewCustomer from './NewCustomer'
import Link from 'next/link'
import Logo from './Logo'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
export default function Navbar() {

  const {data: session} = useSession()
  const [optionsModal, setOptionsModal ] = useState(false)
  const [customerModal, setCustomerModal] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  

  return (
    <div className="text-lg p-4 lg:px-8 h-20 bg-primary flex justify-between overflow-hidden">
        
        <Link href="/" className=" font-bold text-4xl">
          <Logo/>
        </Link>
        {session &&
        <div className="flex flex-1  items-center justify-end gap-10 font-semibold text-secondary ">
          <p className="hidden lg:block">{session.user?.name}</p>
          <button className="relative h-full aspect-square" onClick={() => setDropdownOpen(e => !e)}>
            <Image src={session?.user?.image} fill alt="" className="rounded-full"/>    
          </button>
          
        </div>
      }

          
      <AnimatePresence
        initial={true}
        wait 
      >
          {dropdownOpen &&
          <motion.div 
            className="flex flex-col fixed top-24 p-4 gap-4 rounded-lg shadow-lg right-4 bg-white w-[90vw]  lg:w-fit"
            initial={{opacity:0}}  
            animate={{opacity:1}}  
            exit={{opacity:0}}
            transition={{duration:0.1}}
            
          >
            <button onClick={e => setCustomerModal(true)} className="flex items-center gap-2 hover:text-primary transition-all"> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
              </svg>

              Customer
            </button>
            <button onClick={e => setOptionsModal(true)} className="flex items-center gap-2 hover:text-primary transition-all"> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              Settings
            </button>
            <button onClick={signOut} className="flex items-center gap-2 hover:text-red-400 transition-all"> 
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
              </svg>
              Sign out
            </button>
          </motion.div>
          }
      </AnimatePresence>


      {/*user settings modal*/}
      <AnimatePresence
        initial={false}
        wait
      >
        {optionsModal && 
          <Modal modalOpen={optionsModal}>
            <UserSettings handleClose={()=>setOptionsModal(false)}/>
          </Modal>
        }
      </AnimatePresence>
      
      {/*Create customer modal*/}
      <AnimatePresence
        initial={false}
        wait
      >
        {customerModal && 
          <Modal modalOpen={customerModal}>
            <NewCustomer handleClose={()=> setCustomerModal(false)}/>
          </Modal>
        }
      </AnimatePresence>
    </div>
  )
}
