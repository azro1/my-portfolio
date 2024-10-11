"use client"

import { MessageContext } from "../context/MessageContext"
import { useContext } from "react"

const MessageBanner = () => {
  const { message } = useContext(MessageContext);

  return (
    <div className='w-full text-center fixed top-0 left-0 z-50'>
      {message.type === 'error' && <div className='error'>{message.value}</div>}
      {message.type === 'success' && <div className='success'>{message.value}</div>}
      {message.type === 'info' && <div className='info'>{message.value}</div>}
    </div>
  )
}

export default MessageBanner
