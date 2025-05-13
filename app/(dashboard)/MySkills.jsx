"use client"

import { motion } from "framer-motion";
import { FaHtml5, FaCss3Alt, FaJsSquare, FaReact, FaNodeJs, FaGithub } from "react-icons/fa";

const technicalSkills = [
  { icon: <FaHtml5 size={34} />, name: "HTML" },
  { icon: <FaCss3Alt size={34} />, name: "CSS" },
  { icon: <FaJsSquare size={34} />, name: "JavaScript" },
  { icon: <FaReact size={34} />, name: "React" },
  { icon: <FaNodeJs size={34} />, name: "Node.js" },
  { icon: <FaGithub size={34} />, name: "GitHub" },
];

// components
import Heading from "../components/Heading";

const MySkills = () => {
  return (
    <section>
      <div className="flex flex-col items-center gap-6 md:flex-row md:gap-10 lg:justify-end lg:w-max lg:ml-auto lg:bg-nightSky lg:p-10 uw:mx-auto">
        
        {/* Icons Section */}
        <div className="flex-1 flex justify-center md:justify-end lg:flex-none">
          {/* Reverted gap, removed perspective */}
          <div className="grid grid-cols-3 gap-2"> 
            {technicalSkills.map((skill, index) => (
              <motion.div
                key={index}
                className="p-4 bg-charcoalGray shadow-lg shadow-deepCharcoal rounded-md w-max overflow-hidden"
                whileHover={{
                  scale: 1.1 // Keep scale on container
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }} // Staggered transition
              >
                {/* Inner motion div for icon animation */}
                <motion.div 
                  className="text-cloudGray"
                  whileHover={{ y: -5 }} // Icon lifts on container hover
                  transition={{ type: "spring", stiffness: 300 }} // Springy transition for icon
                >
                  {skill.icon}
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Text Section */}
        <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left lg:flex-none">
          <Heading className="font-bold text-goldenOchre mb-3 subheading md:mb-2">
            My Skills
          </Heading>
          <p className="text-stoneGray lg:max-w-xs">
            I specialize in both front-end and back-end technologies to create user-friendly and efficient web applications
          </p>
        </div>
      </div>
    </section>
  );
};

export default MySkills;
