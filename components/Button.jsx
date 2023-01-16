import React from 'react'
import { motion } from 'framer-motion'
import { cva, VariantProps } from 'class-variance-authority'

const button = cva('outline-primary', {
    variants: {
      intent: {
        primary: "bg-secondary text-white font-semibold rounded-lg border-green-400",
        danger: "bg-red-400 text-white font-semibold rounded-lg border-red-400",
        neutral: "bg-gray-200 font-semibold rounded-lg border-gray-200",
        // **or**
        // primary: "bg-blue-500 text-white border-transparent hover:bg-blue-600",
        secondary: [
          "bg-white",
          "text-gray-800",
          "border-gray-400",
          "hover:bg-gray-100",
        ],
      },
      size: {
        small: ["text-sm", "py-1", "px-2"],
        medium: ["text-base", "py-2", "px-10"],
        large: ["text-xl py-4 px-10"]
      },
      outlined:{ 
          true: 'bg-transparent border-2 text-red-400'
      },
      fullWidth:{
        true: 'w-full'
      }
    },
    defaultVariants: {
      intent: "primary",
      size: "medium",
      outlined: false,
    },
  });


  
export default function Button({text,intent, outlined, size, fullWidth, children, onClick, className, type, ...props}) {
    return (
        <motion.button 
            type={type}
            onClick={onClick}
            whileHover={{scale:1.05}}
            whileTap={{scale:1}}
            className={button({intent, size, outlined, fullWidth})}>
            {text}
        </motion.button>
  )
}
