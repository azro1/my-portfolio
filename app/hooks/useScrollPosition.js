"use client";

import { useState, useEffect } from "react";

const useScrollPosition = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [mounted, setMounted] = useState(false); // To track if component is mounted on the client

  useEffect(() => {
    setMounted(true); // Set mounted to true once the component is mounted on the client

    if (typeof window !== "undefined") {
      const handleScroll = () => {
        setScrollPosition(window.scrollY);
      };

      window.addEventListener("scroll", handleScroll);
      // Set the initial scroll position once the client is mounted
      setScrollPosition(window.scrollY);

      return () => {
        window.removeEventListener("scroll", handleScroll);
      };
    }
  }, []);

  // Return null until mounted (avoid rendering during SSR)
  if (!mounted) return 0;

  return scrollPosition;
};

export default useScrollPosition;
