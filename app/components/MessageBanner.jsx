"use client"

import { MessageContext } from "../context/MessageContext"
import { useContext } from "react"
import { FaExclamationCircle, FaCheckCircle, FaInfoCircle } from "react-icons/fa"

import { motion, AnimatePresence } from "framer-motion"

const MessageBanner = () => {
    const { message } = useContext(MessageContext);

    return (
      <div className='fixed top-[82px] w-full z-50 px-4'>
          <AnimatePresence>
              {message.type === 'error' && 
              <motion.div
                  initial={{ y: -45, opacity: 0}}
                  animate={{ y: 20, opacity: 1 }}
                  exit={{ y: -45, opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.3, type: 'tween' }}
                  className='error flex items-start justify-center gap-2 mx-auto max-w-xs md:max-w-sm'
              >    
                  <div className="hidden md:block bg-white rounded-full">
                      <FaExclamationCircle className="text-red-600" size={30} />
                  </div>
                  <span className="text-center md:text-left">{message.value}</span>
              </motion.div>}

              {message.type === 'success' && 
                  <motion.div
                      initial={{ y: -45, opacity: 0}}
                      animate={{ y: 20, opacity: 1 }}
                      exit={{ y: -45, opacity: 0 }}
                      transition={{ delay: 0.2, duration: 0.3, type: 'tween' }}
                      className='success flex items-start justify-center gap-2 mx-auto max-w-xs md:max-w-sm'
                  >
                      <div className="hidden md:block bg-white rounded-full">
                          <FaCheckCircle className='text-green-600' size={30} />
                      </div>
                      <span className="text-center md:text-left">{message.value}</span>
                  </motion.div>}

              {message.type === 'info' && 
                  <motion.div
                      initial={{ y: -45, opacity: 0}}
                      animate={{ y: 20, opacity: 1 }}
                      exit={{ y: -45, opacity: 0 }}
                      transition={{ delay: 0.2, duration: 0.3, type: 'tween' }} 
                      className='info flex items-start justify-center gap-2 mx-auto max-w-xs md:max-w-sm'
                  >
                      <div className="hidden md:block bg-white rounded-full">
                          <FaInfoCircle className='text-blue-600' size={30} />
                      </div>
                      <span className="text-center md:text-left">{message.value}</span>
                  </motion.div>}
          </AnimatePresence>
      </div>
    )
}

export default MessageBanner
