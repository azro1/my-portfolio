"use client"

import { useMessage } from "./useMessage";

const useBlockNavOnOtp = () => {
    const { changeMessage } = useMessage();

    const handleBlockNav = (e) => {
        if (localStorage.getItem('hasVisitedProfileOtpPage')) {
            e.preventDefault();
            changeMessage('info', 'Please complete verification before navigating away');
            return false;
        }
        return true;
    };

    return { handleBlockNav }
}

export { useBlockNavOnOtp }