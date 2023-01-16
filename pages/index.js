import React from 'react'
import Link from 'next/link'
import Head from 'next/head'

import  Image  from 'next/image'
import { useSession } from 'next-auth/react'
function page() {
  
  const {data:session} = useSession()
  console.log(session)
  return (
    <div className="h-full flex items-center justify-center">
        <Head>
            <title>Create Next App</title>
            <meta name="description" content="Generated by create next app" />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
      <div className="w-1/2 h-1/2 flex flex-col gap-10">

        {session ?
        <>
          <h2 className="text-4xl font-bold">Welcome {session?.user?.firstname}</h2>
          
          <Image src={session?.user?.image} width={200} height={200} alt=""/>
          
          
          <div className="w-full text-xl font-semibold grid grid-cols-2 gap-4 text-center text-white ">
            <Link href="/create" className=" py-6 px-6 rounded-full bg-secondary hover:scale-105 transition-all active:scale-100">New invoice</Link>
            <Link href="" className=" py-6 px-6 rounded-full bg-secondary hover:scale-105 transition-all active:scale-100">New invoice</Link>
          </div>
        </>
        :
        <Link href="/auth/signin" className="bg-secondary py-4 px-10  text-white font-bold rounded-full text-2xl hover:scale-105">Log in</Link>
        }
      </div>
    </div>
  )
}
export default page