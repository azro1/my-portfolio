import { useContext } from 'react'
import { RealtimeContext } from '../context/RealtimeContext'

const useRealtime = () => {
    const context = useContext(RealtimeContext)

    if (context === undefined) {
        throw new Error('useRealtime must be used inside a RealtimeProvider')
    }

    return context
}

export { useRealtime }
