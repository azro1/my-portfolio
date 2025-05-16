"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FiLayout, FiLayers, FiFigma, FiFramer, FiServer } from "react-icons/fi";
import Image from "next/image";

// components
import Heading from "@/app/components/Heading";

const KeySkills = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
  }, []);

  const keySkills = [
    {
      name: 'Client',
      icon: <FiLayout className="text-cloudGray" size={34} />
    },
    {
      name: 'Branding',
      icon: <FiLayers className="text-cloudGray" size={34} />
    },
    {
      name: 'Design',
      icon: <FiFigma className="text-cloudGray" size={34} />
    },
    {
      name: 'UI / UX',
      icon: <FiFramer className="text-cloudGray" size={34} />
    },
    {
      name: 'Server',
      icon: <FiServer className="text-cloudGray" size={34} />
    }
  ];

  return (
    <section>
      <div className="overflow-hidden">

        <Heading className="font-bold text-center text-cloudGray mb-5 text-2xl md:text-3xl md:mb-9 xl:text-[32px]">
          Key Skills
        </Heading>

        <div className="flex flex-wrap items-center justify-center max-w-[300px] mx-auto gap-6 lg:max-w-none lg:gap-12 lg:justify-around lg:px-1">
          {keySkills.map((skill, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, transition: { ease: 'easeOut' } }} // Initial hidden state
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.4, // Slight delay for staggered effect
              }}
              className="flex flex-col items-center justify-center"
            >
              <div className="p-3 w-max rounded-md transition-all transform hover:scale-105 bg-charcoalGray shadow-[0_6px_8px_rgba(0,0,0,0.6)] md:p-4">
                <span>{skill.icon}</span>
              </div>
                <p className="mt-3 text-sm font-medium text-charcoalGrayLight lg:font-r lg:text-stoneGray tracking-wider">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeySkills;
