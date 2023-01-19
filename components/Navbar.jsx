import React from 'react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Logo from './Logo'
import Image from 'next/image'
import { useSession, signOut } from 'next-auth/react'
import Backdrop from './Backdrop'
import { LeaveIcon, PlusIcon, SettingsIcon } from './icons'
export default function Navbar() {
  
  const {data: session} = useSession()
  const [dropdownOpen, setDropdownOpen] = useState(false)
  
  const handleSignout = () => {
    signOut()
  }
  return (
    <div className="text-lg p-4 lg:px-8 items-center bg-primary flex justify-between">
        <Link href="/" className=" font-bold text-4xl">
          <Logo/>
        </Link>
        {session &&
          <motion.button 
            onClick={() => setDropdownOpen(e => !e)} className=" flex items-center justify-center rounded-full"
            whileHover={{scale:1.1}}  
            whileTap={{scale:0.9}}  
          >
            <Image src={session?.user?.image} width={42} height={42} alt="" className="rounded-full"/>    
          </motion.button>
        }  
      <AnimatePresence
        initial={true}
        wait
      >
        {dropdownOpen && <Backdrop onClick={() => setDropdownOpen(false)} transparent={true}>
          <motion.div 
            className="fixed top-24 p-4 rounded-2xl overflow-hidden shadow-lg right-8 bg-white w-[90vw] flex flex-col gap-2  lg:w-fit"
            initial={{height:0, paddingTop:0, paddingBottom:0}}  
            animate={{height:'fit-content', paddingTop:'1rem', paddingBottom:'1rem'}}  
            exit={{height:0, paddingTop:0, paddingBottom:0}}
            transition={{stiffness:10}}
          >
            <p className="">{session.user.name}</p>
            <button onClick={handleSignout} className="hover:text-red-400 transition-all flex gap-2 items-center"> 
              <LeaveIcon/>
              Sign out
            </button>
          </motion.div>
        </Backdrop>}
      </AnimatePresence>
    </div>
  )
}
