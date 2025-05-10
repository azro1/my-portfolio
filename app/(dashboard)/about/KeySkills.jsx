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
      icon: <FiLayout className="text-goldenOchre" size={34} />
    },
    {
      name: 'Branding',
      icon: <FiLayers className="text-goldenOchre" size={34} />
    },
    {
      name: 'Design',
      icon: <FiFigma className="text-goldenOchre" size={34} />
    },
    {
      name: 'UI / UX',
      icon: <FiFramer className="text-goldenOchre" size={34} />
    },
    {
      name: 'Back End',
      icon: <FiServer className="text-goldenOchre" size={34} />
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
              <Heading className="subheading font-b text-cloudGray text-center mb-5">
                Key Skills
              </Heading>

              {/* Mobile: flex wrap center. Large: flex row, full width, relative */}
              <ul className="flex flex-wrap justify-center gap-6 max-w-xs mx-auto lg:max-w-none lg:flex-nowrap lg:w-full lg:justify-around lg:relative lg:mb-0 uw:justify-between">
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
                      className="bg-white p-4 w-max shadow-[0_0_20px_rgba(249,168,37,0.5)] hover:shadow-[0_0_25px_rgba(249,168,37,0.6)] transition-shadow duration-300"
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
                      <span className="text-sm font-b text-charcoalGrayLight whitespace-nowrap lg:text-stoneGray">{skill.name}</span>
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
