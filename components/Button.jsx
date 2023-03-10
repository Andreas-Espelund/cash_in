import React from 'react'
import { motion } from 'framer-motion'
import { cva, VariantProps } from 'class-variance-authority'

const button = cva('outline-primary', {
    variants: {
      intent: {
        primary: "bg-secondary text-white font-semibold rounded-lg border-secondary",
        secondary: "bg-primary text-white font-semibold rounded-lg border-primary",
        danger: "bg-red-400 text-white font-semibold rounded-lg border-red-400",
        success: "bg-success text-white font-semibold rounded-lg border-success",
        neutral: "bg-gray-300 font-semibold rounded-lg border-gray-300",
        // **or**
        // primary: "bg-blue-500 text-white border-transparent hover:bg-blue-600",
        
      },
      size: {
        small: ["text-sm", "py-1", "px-2"],
        medium: ["text-base", "py-2", "px-4"],
        large: ["text-xl py-4 px-6"]
      },
      outlined:{ 
          true: 'bg-transparent border-2 text-[#003249]'
      },
      fullWidth:{
        true: 'w-full'
      }
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
      fullWidth:false
    },
  });


  
export default function Button({text,intent, outlined, size, fullWidth, children, onClick, className, type, ...props}) {
    return (
        <motion.button 
            type={type}
            onClick={onClick}
            whileHover={{scale:1.05}}
            whileTap={{scale:1}}
            className={`${button({intent, size, outlined, fullWidth})} flex items-center justify-center gap-2 ${className}`}>
            {children}
        </motion.button>
  )
}
