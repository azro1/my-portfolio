"use client"

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaDesktop, FaPaintBrush, FaLayerGroup, FaColumns, FaServer } from "react-icons/fa";

const KeySkills = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const keySkills = [
    { 
      name: 'Front End', 
      icon: <FaDesktop className="text-cloudGray" size={40} />, 
      padbtm: 'pb-14 lg:pb-0'
    },
    {
      name: 'Branding',
      icon: <FaPaintBrush className="text-cloudGray" size={40} />,
      padbtm: 'pb-14 lg:pb-0'
    },
    {
      name: 'Compatibility',
      icon: <FaColumns className="text-cloudGray" size={40} />,
      padbtm: 'pb-14 lg:pb-0'
    },
    {
      name: 'UI / UX',
      icon: <FaLayerGroup className="text-cloudGray" size={40} />,
      padbtm: 'pb-14 lg:pb-0'
    },
    {
      name: 'Back End',
      icon: <FaServer className="text-cloudGray" size={40} />,
      padbtm: ''
    }
  ];

  return (
    <section>

      <div className="flex flex-col min-h-[836px] md:min-h-[896px] lg:min-h-[200px]">
        {!isLoading ? (
          <div className="flex-grow flex flex-col relative">
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="flex flex-col text-center gap-4 lg:col-span-2 lg:row-start-3"
          >
            <h2 className="text-2xl md:text-3xl font-b text-cloudGray text-center mb-4">Key Skills</h2>

            <ul className="flex flex-col items-center w-full lg:flex-row lg:justify-between  relative">
              {keySkills.map((skill, index) => (
                <motion.li
                  key={index}
                  className={`grid grid-flow-col auto-cols-[minmax(80px,_80px)] grid-rows-[minmax(_auto,80px)_minmax(_auto,20px)] z-50 gap-2 ${skill.padbtm}`}
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
                  {/* Icon Background with Soft Shadow */}
                  <motion.span
                    className="p-5 rounded-full shadow-[0_0_4px_0_#131519] bg-gradient-to-tl from-nightSky via-charcoalGray to-cloudGray w-max "
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
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.2 * index }}
                  >
                    <span className="text-cloudGray whitespace-nowrap">{skill.name}</span>
                  </motion.div>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
        ) : (
        <div className="flex-grow flex items-center justify-center">
          <img className="w-16" src="/images/loading/pulse_darkbg.svg" alt="a loading gif" />
        </div>
        )}
      </div>
    </section>
  );
};

export default KeySkills;
