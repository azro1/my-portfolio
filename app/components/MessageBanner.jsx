"use client"

import { MessageContext } from "../context/MessageContext"
import { useContext } from "react"
import { FaExclamationCircle, FaCheckCircle, FaInfoCircle } from "react-icons/fa"

import { motion, AnimatePresence } from "framer-motion"

const MessageBanner = () => {
    const { message } = useContext(MessageContext);

    return (
      <div className='fixed top-[100px] w-full z-50 px-4 flex justify-center'>
          <AnimatePresence>
              {message.type === 'error' && 
              <motion.div
                  initial={{ y: -45, opacity: 0 }}
                  animate={{ y: 20, opacity: 1 }}
                  exit={{ y: -45, opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.3, type: 'tween' }}
                  className='error inline-block max-w-md bg-red-600 text-white rounded px-4 py-2 shadow-md'
              >
                  <div className="flex items-center gap-2.5">
                      <div className="hidden md:block self-start bg-white rounded-full">
                          <FaExclamationCircle className="text-red-600" size={30} />
                      </div>
                      <span className="break-words text-center md:text-left">{message.value}</span>
                  </div>
              </motion.div>}

              {message.type === 'success' && 
              <motion.div
                  initial={{ y: -45, opacity: 0 }}
                  animate={{ y: 20, opacity: 1 }}
                  exit={{ y: -45, opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.3, type: 'tween' }}
                  className='success inline-block max-w-md bg-green-600 text-white rounded px-4 py-2 shadow-md'
              >
                  <div className="flex items-center gap-2.5">
                      <div className="hidden md:block self-start bg-white rounded-full">
                          <FaCheckCircle className="text-green-600" size={30} />
                      </div>
                      <span className="break-words text-center md:text-left">{message.value}</span>
                  </div>
              </motion.div>}

              {message.type === 'info' && 
              <motion.div
                  initial={{ y: -45, opacity: 0 }}
                  animate={{ y: 20, opacity: 1 }}
                  exit={{ y: -45, opacity: 0 }}
                  transition={{ delay: 0.2, duration: 0.3, type: 'tween' }}
                  className='info inline-block max-w-md bg-blue-600 text-white rounded px-4 py-2 shadow-md'
              >
                  <div className="flex items-center gap-2.5">
                      <div className="hidden md:block self-start bg-white rounded-full">
                          <FaInfoCircle className="text-blue-600" size={30} />
                      </div>
                      <span className="break-words text-center md:text-left">{message.value}</span>
                  </div>
              </motion.div>}
          </AnimatePresence>
      </div>
    );
};


export default MessageBanner;

