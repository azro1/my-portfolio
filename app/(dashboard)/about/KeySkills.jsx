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
      <div className="flex flex-col">
        {!isLoading ? (
          <div className="flex-grow flex flex-col justify-center relative">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="flex flex-col text-center gap-4 lg:col-span-2 lg:row-start-3"
            >
              <Heading className="subheading font-b text-cloudGray text-center mb-6">
                Key Skills
              </Heading>

              {/* Mobile: flex wrap center. Large: flex row, full width, relative */}
              <ul className="flex flex-wrap justify-center gap-6 max-w-xs mx-auto mb-6 lg:max-w-none lg:flex-nowrap lg:flex-row lg:justify-between lg:w-full lg:relative lg:mb-0">
                {keySkills.map((skill, index) => (
                  <motion.li
                    key={index}
                    // Subtle hover scale and lift effect
                    className={`flex flex-col items-center gap-2 z-50 transition-transform duration-300 ease-in-out hover:scale-105 hover:-translate-y-1`}
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
                    {/* Icon with subtle glow effect */}
                    <motion.span
                      className="p-4 w-max shadow-[0_0_15px_rgba(200,200,200,0.2)] hover:shadow-[0_0_20px_rgba(255,255,255,0.3)] transition-shadow duration-300" // Restored padding, added subtle shadow/glow
                      initial={{ scale: 0.8 }}
                      animate={{ scale: 1 }}
                      whileHover={{ scale: 1.1 }} // Kept icon scale hover
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
