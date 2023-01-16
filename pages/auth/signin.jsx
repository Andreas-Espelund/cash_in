import React from 'react'
import {getProviders, signIn}from 'next-auth/react'
import Image from 'next/image'
import google_icon from '../../public/google.svg'
import Logo from '../../components/Logo'
import { useEffect } from 'react'
import { useSession } from 'next-auth/react'
function signin({providers}) {
  const {data: session} = useSession()
  
  useEffect(() => {
    if (session){
      window.location.href = "/"
    }
  }, [session])
  
  
  return (
    <div className="fixed top-0 left-0 bg-primary w-full  flex flex-col justify-center gap-10 items-center h-full">
      <Logo large={true}/>
      {Object.values(providers).map( provider => (
        <div key={provider.name}>
          <button onClick={()=> signIn(provider.id)} 
            className="flex items-center text-xl bg-secondary text-white font-bold gap-4 rounded-full px-10 py-2 hover:scale-105 hover:shadow-lg active:scale-100 transition-all"
          >
            <Image src={google_icon} alt="google icon" width={56} height={56} className="text-secondary"/>
            Continue with {provider.name}
          </button>
        </div>
      ))}
    </div>
  )
}

export async function getServerSideProps(context){
    const providers = await getProviders(context)
    return {
        props: {
            providers
        }
    }
}

export default signin