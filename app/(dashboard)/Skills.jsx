"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGithub } from "react-icons/fa";

const technicalSkills = [
  { icon: <FaHtml5 />, name: "HTML" },
  { icon: <FaCss3Alt />, name: "CSS" },
  { icon: <FaJsSquare />, name: "JavaScript" },
  { icon: <FaReact />, name: "React" },
  { icon: <FaNodeJs />, name: "Node.js" },
  { icon: <FaGithub />, name: "GitHub" },
];

const Skills = () => {
  return (
    <section>
      <div className="flex flex-col gap-8 items-center md:flex-row md:gap-16">
        {/* Icons Section */}
        <div className="flex-1 grid grid-cols-[minmax(136px,_auto)] md:grid-cols-[minmax(136px,_auto)_minmax(136px,_auto)] lg:grid-cols-[minmax(136px,_auto)_minmax(136px,_auto)_minmax(136px,_auto)] gap-2">
          {technicalSkills.map((skill, index) => (
            <motion.div
              key={index}
              className="flex flex-col items-center py-5 w-full rounded-lg bg-nightSky shadow-outer transition-shadow duration-300"
              whileHover={{ 
                scale: 1.1, 
                zIndex: 20
              }}
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="text-5xl text-saddleBrown mb-4">
                {skill.icon}
              </div>
              <p className="text-lg font-medium text-frostWhite">{skill.name}</p>
            </motion.div>
          ))}
        </div>

        {/* Text Section */}
        <div className="flex-1 flex flex-col justify-center text-center md:text-left lg:flex-none lg:w-1/2">
          <div>
            <h2 className="subheading font-bold text-saddleBrown mb-4">
              My Skill Set
            </h2>
            <p className="text-ashGray">
              I specialize in both front-end and back-end technologies to create user-friendly and efficient web applications
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
