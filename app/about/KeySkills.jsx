"use client"

import { FaDesktop, FaPaintBrush, FaLayerGroup, FaColumns, FaServer } from "react-icons/fa";
import { motion } from "framer-motion"; // Importing framer-motion for animations

const KeySkills = () => {
  const keySkills = [
    { 
      name: 'Front End', 
      icon: <FaDesktop className="text-frostWhite" size={40} />, 
      padbtm: 'pb-10 md:pb-0'
    },
    {
      name: 'Graphic Design',
      icon: <FaPaintBrush className="text-frostWhite" size={40} />,
      padbtm: 'pb-16 md:pb-0'
    },
    {
      name: 'Responsive Design',
      icon: <FaColumns className="text-frostWhite" size={40} />,
      padbtm: 'pb-16 md:pb-0'
    },
    {
      name: 'UI Design',
      icon: <FaLayerGroup className="text-frostWhite" size={40} />,
      padbtm: 'pb-10 md:pb-0'
    },
    {
      name: 'Back End',
      icon: <FaServer className="text-frostWhite" size={40} />,
      padbtm: ''
    }
  ];

  return (
    <div className="relative">
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="flex flex-col text-center gap-4 md:col-span-2 md:row-start-3 uw:p-10 uw:pt-8"
      >
        <h2 className="subheading font-b text-saddleBrown text-center">Key Skills</h2>

        <ul className="flex flex-col items-center w-full p-6 md:flex-row md:justify-around md:max-w-[1400px] md:mx-auto relative">
          {keySkills.map((skill, index) => (
            <motion.li
              key={index}
              className={`grid grid-flow-col auto-cols-[minmax(80px,_80px)] grid-rows-[minmax(_auto,80px)_minmax(_auto,20px)] z-50 gap-2 ${skill.padbtm} md:gap-4`}
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
                className="p-5 rounded-full shadow-xl shadow-nightSky bg-gradient-to-tl from-nightSky to-ashGray w-max"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
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
                <p className="font-b text-ashGray">{skill.name}</p>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </motion.div>
    </div>
  );
};

export default KeySkills;
