"use client";

import { useEffect } from "react";
import { useMessage } from "../hooks/useMessage";

const Cleanup = () => {
    const {changeMessage } = useMessage()

    useEffect(() => {
        if (localStorage.getItem("forceLogout") === "true" ||  localStorage.getItem("hasVisitedRegPage") === "true") {
            localStorage.removeItem("forceLogout");
            localStorage.removeItem("hasVisitedRegPage");
            changeMessage('error', 'You have been logged out. Please log back in to finish setting up your account.');
        }
    }, []);
};

export default Cleanup;