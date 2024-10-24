"use client"

import { createContext } from 'react'
import { useState } from 'react'

const MessageContext = createContext()

const MessageProvider = ({ children }) => {
    const [message, setMessage] = useState({
         value: '',
         type: ''
    })

    const changeMessage = (messageType, newMessage) => {
        setMessage({ type: messageType, value: newMessage })
        setTimeout(() => setMessage({ type: '', value: '' }), 4000)
    }

    return (
        <MessageContext.Provider value={{ message, changeMessage }}>
            {children}
        </MessageContext.Provider>
    )
}

export { MessageContext, MessageProvider }