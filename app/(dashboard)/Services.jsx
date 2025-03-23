"use client";

import { motion } from "framer-motion";
import { FaCode, FaPaintBrush, FaLayerGroup, FaMobile } from "react-icons/fa";

const Services = () => {
  const services = [
    {
      title: "Web",
      icon: <FaCode size={50} />,
      text: "Passionate web developer focused on creating unique, functional, and visually appealing websites",
    },
    {
      title: "UX / UI",
      icon: <FaLayerGroup size={50} />,
      text: "Creative UI designer crafting intuitive interfaces that enhance user experiences with innovation",
    },
    {
      title: "Mobile",
      icon: <FaMobile size={50} />,
      text: "Experienced in crafting seamless user experiences for both iOS and Android platforms",
    },
    {
      title: "Design",
      icon: <FaPaintBrush size={50} />,
      text: "A passionate graphic designer adept at transforming ideas into visually striking concepts",
    },
  ];

  return (
    <section>
      <div className="overflow-hidden">
        <h2 className="text-2xl md:text-3xl font-b text-center text-cloudGray mb-6 md:mb-10">My Services</h2>

        <div className="flex flex-wrap justify-center items-center gap-10 md:gap-12 relative">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, transition: { ease: 'easeOut' } }} // Initial hidden state
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.5,
                delay: index * 0.4, // Slight delay for staggered effect
              }}
              className="flex flex-col items-center justify-center max-w-sm min-h-[310px] p-6 bg-nightSky rounded-md md:p-8"
            >
              <div className="p-5 rounded-lg shadow-[0_0_8px_2px_#131519] bg-gradient-to-tl from-charcoalGray via-nightSky to-cloudGray transition-all transform hover:scale-105">
                <span className="text-frostWhite">{service.icon}</span>
              </div>
              <div className="flex flex-col items-center text-center max-w-xl mt-6">
                <h2 className="subheading font-medium text-rust mb-3">
                  {service.title}
                </h2>
                <p className="leading-7">{service.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
