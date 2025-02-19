"use client"

import { useMessage } from "./useMessage";

const useBlockNavOnOtp = (storageKey, message) => {
    const { changeMessage } = useMessage();

    const handleBlockNav = (e) => {
        if (localStorage.getItem(storageKey)) {
            e.preventDefault();
            changeMessage('info', message);
            return false;
        }
        return true;
    };

    return { handleBlockNav }
}

export { useBlockNavOnOtp }