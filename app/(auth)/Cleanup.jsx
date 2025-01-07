"use client";

import { useEffect } from "react";
import { useMessage } from "../hooks/useMessage";

const Cleanup = () => {
    const { changeMessage } = useMessage();

    useEffect(() => {
        const forceLogout = localStorage.getItem("forceLogout") === "true";
        const hasVisitedRegPage = localStorage.getItem("hasVisitedRegPage") === "true";

        if (forceLogout) {
            localStorage.removeItem("forceLogout");
            changeMessage('error', 'You have been logged out. Please log back in to finish setting up your account.');
        } else if (hasVisitedRegPage) {
            localStorage.removeItem("hasVisitedRegPage");
            changeMessage('error', 'You have been logged out. Please log back in to finish setting up your account.');
        }
    }, []);
};

export default Cleanup;
