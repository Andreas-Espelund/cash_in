import React from 'react'
import Navbar from './Navbar'
import { useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { useSession } from 'next-auth/react'
import { CustomersState } from '../atoms/customersAtom'
import { UserState } from '../atoms/userAtom'
import { getUser, getCustomers } from '../firebase'
export default function Layout({children}) {

  const {data:session} = useSession()
  const [user, setUser] = useRecoilState(UserState)
  const [customers, setCustomers] = useRecoilState(CustomersState)
  
  
  useEffect(() => {
    
      const uid = session?.user?.uid
      if (uid){

        getUser(uid).then( u =>
          setUser(u)  
          )
        getCustomers(uid).then( c => 
          setCustomers(c)  
        )
      }
  }, [session])
  
  return (
    <div className="h-[100dvh] flex flex-col">
      <Navbar/>
      <div className="flex-1 border-green-500 bg-neutral">
        {children}
      </div>
    </div>
 )
}
