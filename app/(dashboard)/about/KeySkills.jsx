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
      name: 'Front End',
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
      name: 'Back End',
      icon: <FiServer className="text-cloudGray" size={34} />
    }
  ];

  return (
    <section>
      <div className="overflow-hidden">

        <Heading className="font-bold text-center text-cloudGray mb-5 text-2xl md:text-3xl md:mb-9 xl:text-[32px]">
          Key Skills
        </Heading>

        <div className="flex flex-wrap items-center justify-center max-w-xs mx-auto gap-6 lg:max-w-none lg:gap-12 lg:justify-around lg:px-1">
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
              <div className="p-4 shadow-lg w-max rounded-md transition-all transform hover:scale-105 bg-charcoalGray shadow-deepCharcoal ">
                <span>{skill.icon}</span>
              </div>
                <p className="mt-3 text-sm font-extralight text-cloudGray">{skill.name}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeySkills;
