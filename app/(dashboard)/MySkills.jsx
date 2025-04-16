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
      <div className="flex flex-col-reverse items-center gap-6 md:flex-row md:gap-10">
        {/* Icons Section */}

        <div className="flex-1 flex justify-end">
          <div className="grid grid-cols-[minmax(30px,_auto)] md:grid-cols-[minmax(30px,_auto)_minmax(30px,_auto)_minmax(30px,_auto)] gap-4 md:gap-2">
            {technicalSkills.map((skill, index) => (
              <motion.div
                key={index}
                className="p-4 bg-charcoalGray shadow-lg shadow-deepCharcoal rounded-md w-max"
                whileHover={{
                  scale: 1.1
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className="text-cloudGray">
                  {skill.icon}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Text Section */}
        <div className="flex-1 flex flex-col items-center text-center md:items-start md:text-left">
          <Heading className="subheading font-b text-goldenOchre mb-3.5">
            My Skills
          </Heading>
          <p className="md:leading-7 lg:max-w-xs">
            I specialize in both front-end and back-end technologies to create user-friendly and efficient web applications
          </p>
        </div>
      </div>
    </section>
  );
};

export default MySkills;
