import { MessageContext } from "../context/MessageContext";
import { useContext } from "react";

const useMessage = () => {
    const context = useContext(MessageContext)

    if (context === undefined) {
        throw new Error('useMessage must be use inside a MessageProvider')
    }

    return context
}

export { useMessage }