"use client"

import { MessageContext } from "../context/MessageContext"
import { useContext, useState } from "react"
import { FaExclamationCircle, FaCheckCircle, FaInfoCircle } from "react-icons/fa"

import { motion, AnimatePresence } from "framer-motion"

const MessageBanner = () => {
    const [iconSizes, setIconSizes] = useState([
        { className: 'sm:hidden', size: 30 },
        { className: 'hidden sm:block', size: 24 }
    ])

    const { message } = useContext(MessageContext);

    return (
      <div className='w-full fixed top-0 left-0 text-center z-50 p-5'>
          <AnimatePresence>
              {message.type === 'error' && 
              <motion.div
                  initial={{ y: -45, opacity: 0}}
                  animate={{ y: 10, opacity: 1 }}
                  exit={{ y: -45, opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.3, type: 'tween' }}
                  className='error flex items-center justify-center gap-1.5 max-w-max mx-auto'
              >    
                  {iconSizes.map((obj, index) => (
                      <div className={`${obj.className} bg-white rounded-full`} key={index}>
                          <FaExclamationCircle className='text-red-600' size={obj.size} />
                      </div>
                  ))}
                  <span className="text-left">{message.value}</span>
              </motion.div>}


              {message.type === 'success' && 
                  <motion.div
                      initial={{ y: -45, opacity: 0}}
                      animate={{ y: 10, opacity: 1 }}
                      exit={{ y: -45, opacity: 0 }}
                      transition={{ delay: 0.2, duration: 0.3, type: 'tween' }}
                      className='success flex items-center justify-center gap-1.5 max-w-max mx-auto'
                  >
                      {iconSizes.map((obj, index) => (
                          <div className={`${obj.className} bg-white rounded-full`} key={index}>
                              <FaCheckCircle className='text-green-600' size={obj.size} />
                          </div>
                      ))}
                      <span className="text-left">{message.value}</span>

                  </motion.div>}

              {message.type === 'info' && 
                  <motion.div
                      initial={{ y: -45, opacity: 0}}
                      animate={{ y: 10, opacity: 1 }}
                      exit={{ y: -45, opacity: 0 }}
                      transition={{ delay: 0.2, duration: 0.3, type: 'tween' }} 
                      className='info flex items-center justify-center gap-1.5 max-w-max mx-auto'
                  >
                      {iconSizes.map((obj, index) => (
                          <div className={`${obj.className} bg-white rounded-full`} key={index}>
                              <FaInfoCircle className='text-blue-600' size={obj.size} />
                          </div>
                      ))}
                      <span>{message.value}</span>
                  </motion.div>}
          </AnimatePresence>
      </div>
    )
}

export default MessageBanner
