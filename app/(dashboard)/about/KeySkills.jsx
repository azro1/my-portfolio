"use client"

import { FaDesktop, FaPaintBrush, FaLayerGroup, FaColumns, FaServer } from "react-icons/fa";
import { motion } from "framer-motion"; // Importing framer-motion for animations

const KeySkills = () => {
  const keySkills = [
    { 
      name: 'Front End', 
      icon: <FaDesktop className="text-frostWhite" size={40} />, 
      padbtm: 'pb-14 lg:pb-0'
    },
    {
      name: 'Branding',
      icon: <FaPaintBrush className="text-frostWhite" size={40} />,
      padbtm: 'pb-20 lg:pb-0'
    },
    {
      name: 'Compatibility',
      icon: <FaColumns className="text-frostWhite" size={40} />,
      padbtm: 'pb-20 lg:pb-0'
    },
    {
      name: 'UI / UX',
      icon: <FaLayerGroup className="text-frostWhite" size={40} />,
      padbtm: 'pb-14 lg:pb-0'
    },
    {
      name: 'Back End',
      icon: <FaServer className="text-frostWhite" size={40} />,
      padbtm: ''
    }
  ];

  return (
    <div className="flex flex-col relative" >
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col text-center gap-4 lg:col-span-2 lg:row-start-3"
      >
        <h2 className="text-2xl md:text-3xl font-b text-stoneGray text-center mb-6 md:mb-8">Key Skills</h2>

        <ul className="flex flex-col items-center w-full lg:flex-row lg:justify-between  relative">
          {keySkills.map((skill, index) => (
            <motion.li
              key={index}
              className={`grid grid-flow-col auto-cols-[minmax(80px,_80px)] grid-rows-[minmax(_auto,80px)_minmax(_auto,20px)] z-50 gap-2 ${skill.padbtm} lg:gap-4`}
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
                className="p-5 rounded-full shadow-[0_0_8px_2px_#131519] bg-gradient-to-tl from-softCharcoal via-nightSky to-cloudGray w-max "
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
                <p className="font-b text-stoneGray">{skill.name}</p>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default KeySkills;
