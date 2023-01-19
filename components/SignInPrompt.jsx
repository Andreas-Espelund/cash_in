import React from 'react'
import Link from "next/link"
import { LinkBoxIcon } from './icons'
const SingInPrompt = () => (

    <div className="grid place-content-center h-full">
    <Link href='/auth/signin' className="px-12 py-4 flex items-center gap-4  rounded-full text-xl font-semibold bg-primary text-white hover:scale-105 shadow-sm hover:shadow-lg transition-all">
        Go to login
        <LinkBoxIcon/>
    </Link>
</div>
    )

export default SingInPrompt