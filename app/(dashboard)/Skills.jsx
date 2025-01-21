"use client";

import React from "react";
import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGithub } from "react-icons/fa";

const technicalSkills = [
  { icon: <FaHtml5 size={64} />, name: "HTML" },
  { icon: <FaCss3Alt size={64} />, name: "CSS" },
  { icon: <FaJsSquare size={64} />, name: "JavaScript" },
  { icon: <FaReact size={64} />, name: "React" },
  { icon: <FaNodeJs size={64} />, name: "Node.js" },
  { icon: <FaGithub size={64} />, name: "GitHub" },
];

const Skills = () => {
  return (
    <section>
      <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10">
        {/* Icons Section */}

        <div className="flex-1 flex justify-end">
          <div className=" grid grid-cols-[minmax(115px,_auto)] md:grid-cols-[minmax(115px,_auto)_minmax(115px,_auto)] lg:grid-cols-[minmax(115px,_auto)_minmax(115px,_auto)_minmax(115px,_auto)] gap-2 ">
            {technicalSkills.map((skill, index) => (
              <motion.div
                key={index}
                className="p-6 rounded-lg bg-slateOnyx shadow-[0_0_8px_2px_#131519] transition-shadow duration-300"
                whileHover={{ 
                  scale: 1.1, 
                  zIndex: 20
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-frostWhite">
                  {skill.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </div>


        {/* Text Section */}
        <div className="flex-1 flex justify-start text-center md:text-left">
          <div className="bg-slateOnyx p-6 max-w-sm">
            <h2 className="subheading font-b text-saddleBrown mb-4">
              My Skills
            </h2>
            <p className="leading-7 text-ashGray max-w-xs">
              I specialize in both front-end and back-end technologies to create user-friendly and efficient web applications
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
