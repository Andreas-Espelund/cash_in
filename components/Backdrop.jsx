import React from 'react'
import { motion } from 'framer-motion'
export default function Backdrop({children, onClick, transparent}) {
  return (
    <motion.div
        onClick={onClick}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        exit={{opacity: 0}}
        className={`${transparent? 'bg-transparent' : 'bg-black/50'}  absolute top-0 left-0 w-full h-full flex justify-center items-center overflow-hidden`}>
        {children}
    </motion.div>
  )
}
