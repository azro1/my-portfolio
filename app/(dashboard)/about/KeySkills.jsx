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
      icon: <FiLayout className="text-cloudGray" size={34} />,
      padbtm: 'pb-14 lg:pb-0'
    },
    {
      name: 'Branding',
      icon: <FiLayers className="text-cloudGray" size={34} />,
      padbtm: 'pb-14 lg:pb-0'
    },
    {
      name: 'Design',
      icon: <FiFigma className="text-cloudGray" size={34} />,
      padbtm: 'pb-14 lg:pb-0'
    },
    {
      name: 'UI / UX',
      icon: <FiFramer className="text-cloudGray" size={34} />,
      padbtm: 'pb-14 lg:pb-0'
    },
    {
      name: 'Back End',
      icon: <FiServer className="text-cloudGray" size={34} />,
      padbtm: ''
    }
  ];

  return (
    <section>
      <div className="flex flex-col">
        {!isLoading ? (
          <div className="flex-grow flex flex-col justify-center relative">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col text-center gap-4 lg:col-span-2 lg:row-start-3"
            >
              <Heading className="text-2xl md:text-3xl font-b text-cloudGray text-center mb-6">
                Key Skills
              </Heading>

              <ul className="flex flex-col items-center w-full lg:flex-row lg:justify-between  relative">
                {keySkills.map((skill, index) => (
                  <motion.li
                    key={index}
                    className={`grid grid-flow-col auto-cols-[minmax(66px,_66px)] grid-rows-[minmax(_auto,66px)_minmax(_auto,20px)] z-50 gap-2 ${skill.padbtm}`}
                    initial={{
                      opacity: 0,
                      transform: 'perspective(800px) rotateX(45deg) scale(0.8)',
                    }}
                    animate={{
                      opacity: 1,
                      transform: 'perspective(800px) rotateX(0deg) scale(1)',
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.2 * index,
                      type: "spring",
                      stiffness: 300,
                    }}
                  >
                    {/* Icon with shadow for emphasis */}
                    <motion.span
                      className="p-4 bg-transparent shadow-[0_0_10px_0_#000] hover:shadow-[0_0_15px_0_#fff] w-max"
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    >
                      {skill.icon}
                    </motion.span>
                    {/* Skill Name */}
                    <motion.div
                      className="flex justify-center"
                      initial={{ y: 20 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 * index }}
                    >
                      <span className="text-charcoalGrayLight whitespace-nowrap">{skill.name}</span>
                    </motion.div>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        ) : (
          <div className="flex-grow flex items-center justify-center">
            <Image
              width={64}
              height={64}
              src="/images/loading/pulse_darkbg.svg"
              alt="A pulsating loading animation on a dark background"
            />
          </div>
        )}
      </div>
    </section>
  );
};

export default KeySkills;
