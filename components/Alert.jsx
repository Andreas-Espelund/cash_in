import React from 'react'
import { AnimatePresence } from 'framer-motion'
import Modal from './Modal'
import Button from './Button'
export default function Alert({heading, message, visible, onClick}) {
  return (
    <AnimatePresence
      initial={false}
      exitBeforeEnter={true}
      >
        {visible &&
        <Modal>
          <div className="flex flex-col gap-4 w-4/5 m-auto rounded-lg shadow-lg p-6 bg-white ">
            <h2 className="text-3xl font-bold">{heading}</h2>
            <p className="text-xl font-medium"> {message}</p>
            <div className="ml-auto">
              <Button text="OK" intent="danger"  onClick={onClick} />
            </div>
          </div>
        </Modal>
        }
      </AnimatePresence>
  )
}
