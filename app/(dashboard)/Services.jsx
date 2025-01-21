import { FaCode, FaPaintBrush, FaLayerGroup, FaMobile } from "react-icons/fa";

const Services = () => {

  const services = [
    { 
      title: 'Web Development', 
      icon: <FaCode size={70} />, 
      text: 'Passionate web developer focused on creating unique, functional, and visually appealing websites  with expertise in both front-end and back-end technologies', 
      layoutClasses: 'max-w-sm h-full lg:place-self-end xl:justify-self-end uw:h-max  uw:self-center uw:col-span-1 '
    },
    { 
      title: 'UI Design', 
      icon: <FaLayerGroup size={70} />, 
      text: 'Creative UI designer specializing in intuitive interfaces and user-centered design. Focused on enhancing user experiences through impactful visuals and innovative solutions', 
      layoutClasses: 'w-full max-w-sm lg:place-self-start xl:justify-self-start uw:row-span-1 uw:self-center uw:py-12'
    },
    { 
      title: 'Mobile Development', 
      icon: <FaMobile size={70} />, 
      text: 'Experienced in crafting seamless user experiences for both iOS and Android platforms. Passionate about turning innovative ideas into captivating mobile applications.', 
      layoutClasses: 'w-full max-w-sm lg:place-self-end xl:justify-self-end uw:self-center uw:py-20'
    },
    { 
      title: 'Graphic Design', 
      icon: <FaPaintBrush size={70} />, 
      text: 'A passionate graphic designer adept at transforming ideas into visually striking concepts. Proficient in delivering impactful designs that resonate with target audiences.', 
      layoutClasses: 'w-full max-w-sm lg:place-self-start xl:justify-self-start uw:py-28'
    }
  ]

  return (
    <section>
      <div className="grid gap-10 grid-cols-1 justify-items-center md:grid-cols-2 xl:grid-rows-2 uw:grid-rows-1 uw:grid-cols-4 uw:items-center uw:gap-12">
            {services.map((service, index) => (
              <div className={`flex items-center justify-center bg-gradient-to-r from-slateOnyx to-softCharcoal rounded-md p-6 md:p-8 z-50 ${service.layoutClasses}`} key={index}>

                <div className="flex flex-col items-center justify-center gap-6">
                    <div className="p-4 rounded-lg bg-slateOnyx shadow-[0_0_8px_2px_#131519] transition-all transform hover:scale-105">
                      <span className="text-frostWhite">{service.icon}</span>
                    </div>
                    <div className="flex flex-col items-center text-center max-w-xl">
                      <h2 className="subheading font-b text-saddleBrown mb-4">{service.title}</h2>
                      <p className="leading-7">
                        {service.text}
                      </p>
                    </div>
                </div>

              </div>
            ))}
      </div>
    </section>
  );
};

export default Services;
