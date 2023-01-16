import React from 'react'
import Backdrop from './Backdrop'
import { motion } from 'framer-motion'

export default function Modal({handleClose, children}) {
  
    const dropIn = {
        hidden: {
            y: '-100dvh'
        },
        visible: {
            y: '0'
        },
        exit: {
            y: '100dvh'
        }
    }

    return (
    <Backdrop onClick={handleClose}>
        <motion.div
            onClick={ e => e.stopPropagation()}
            className="w-full max-w-2xl"
            variants={dropIn}
            initial="hidden"
            animate="visible"
            exit="exit"
        >
            {children}
        </motion.div>
    </Backdrop>
  )
}
