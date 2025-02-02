"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import useScrollPosition from "../hooks/useScrollPosition";

import { FaCode, FaPaintBrush, FaLayerGroup, FaMobile } from "react-icons/fa";

const Services = () => {
  const scrollPosition = useScrollPosition(); // Get scroll position
  const [hasAnimated, setHasAnimated] = useState(false); // Track if animation has already triggered

  const threshold = 150; // Adjust to determine when animation starts

  useEffect(() => {
    if (!hasAnimated && scrollPosition > threshold) {
      setHasAnimated(true); // Set animation as complete on first scroll down
    }
  }, [scrollPosition, hasAnimated]);

  const services = [
    {
      title: "Web",
      icon: <FaCode size={50} />,
      text: "Passionate web developer focused on creating unique, functional, and visually appealing websites",
    },
    {
      title: "UX / UI",
      icon: <FaLayerGroup size={50} />,
      text: "Creative UI designer crafting intuitive interfaces that enhance user experiences with innovation",
    },
    {
      title: "Mobile",
      icon: <FaMobile size={50} />,
      text: "Experienced in crafting seamless user experiences for both iOS and Android platforms",
    },
    {
      title: "Design",
      icon: <FaPaintBrush size={50} />,
      text: "A passionate graphic designer adept at transforming ideas into visually striking concepts",
    },
  ];

  return (
    <section>
      <div className="overflow-hidden">
          <h2 className="text-2xl md:text-3xl font-b text-center text-stoneGray mb-6 md:mb-10">My Services</h2>
        


        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-12 relative">

          {!hasAnimated && (
              <div className="absolute w-full h-full flex items-center justify-center">
                <img className="w-16" src="/images/loading/pulse_darkbg.svg" alt="" />
              </div>
          )}

          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, transition: {ease: 'easeOut'} }} // Initial hidden state
              animate={
                hasAnimated
                  ? { opacity: 1, y: 0 } // Animate only once when `hasAnimated` is true
                  : undefined
              }
              transition={{
                duration: 0.5,
                delay: index * 0.4, // Slight delay for staggered effect
              }}
              className="flex flex-col items-center justify-center max-w-sm min-h-[310px] p-6 bg-nightSky rounded-md md:p-8"
            >
              <div className="p-5 rounded-lg shadow-[0_0_8px_2px_#131519] bg-gradient-to-tl from-slateOnyx via-nightSky to-cloudGray transition-all transform hover:scale-105">
                <span className="text-frostWhite">{service.icon}</span>
              </div>
              <div className="flex flex-col items-center text-center max-w-xl mt-6">
                <h2 className="subheading font-medium text-saddleBrown mb-3">
                  {service.title}
                </h2>
                <p className="leading-7">{service.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
