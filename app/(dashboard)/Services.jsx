"use client";

import { motion } from "framer-motion";
import { 
  FiLayout, 
  FiFigma, 
  FiFramer, 
  FiSmartphone 
} from "react-icons/fi";

// components
import Heading from "../components/Heading";

const Services = () => {
  const services = [
    {
      title: "Web",
      icon: <FiLayout size={34} />,
      text: "Passionate web developer focused on creating unique, functional, and visually appealing websites",
    },
    {
      title: "UX / UI",
      icon: <FiFramer size={34} />,
      text: "Creative UI designer crafting intuitive interfaces that enhance user experiences with innovation",
    },
    {
      title: "Mobile",
      icon: <FiSmartphone size={34} />,
      text: "Experienced in crafting seamless user experiences for both iOS and Android platforms",
    },
    {
      title: "Design",
      icon: <FiFigma size={34} />,
      text: "A passionate graphic designer adept at transforming ideas into visually striking concepts",
    },
  ];

  return (
    <section>
      <div className="overflow-hidden">

        <Heading className="font-bold text-center text-cloudGray mb-5 text-2xl md:text-3xl md:mb-9 xl:text-[32px]">
          My Services
        </Heading>

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
              className="flex flex-col items-center justify-center max-w-[300px] h-[280px] p-6 bg-nightSky md:max-w-sm md:min-h-[310px]  md:p-8"
            >
              <div className="p-3 bg-charcoalGray shadow-[0_4px_12px_rgba(0,0,0,0.3)] w-max rounded-md transition-all transform hover:scale-105">
                <span className="text-cloudGray">{service.icon}</span>
              </div>
              <div className="flex flex-col items-center text-center max-w-xl mt-4">
                <Heading className="font-semibold text-goldenOchre mb-1 subheading lg:font-bold">
                  {service.title}
                </Heading>
                <p className="text-stoneGray">{service.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
