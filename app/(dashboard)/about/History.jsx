"use client";

// components
import Heading from "@/app/components/Heading";

// hooks
import useScrollPosition from "../../hooks/useScrollPosition";
import { useState, useEffect } from "react";

const History = () => {
  const scrollPosition = useScrollPosition();
  const [hasMounted, setHasMounted] = useState(false); // Track if component has mounted
  const [stars, setStars] = useState([]); // Store stars in state

  useEffect(() => {
    setHasMounted(true); // Only set to true after mount

    // Generate stars once and store in state
    const generateStars = () => {
      const starsArray = [];
      for (let i = 0; i < 30; i++) { // Reduce number of stars here
        const size = Math.random() * 2 + 1; // Random size between 1px and 3px
        const x = Math.random() * 100 + "%"; // Random X position
        const y = Math.random() * 100 + "%"; // Random Y position
        const opacity = Math.random() * 0.5 + 0.5; // Random opacity between 0.5 and 1

        starsArray.push(
          <div
            key={i}
            className="absolute rounded-full bg-white filter brightness-75"
            style={{
              width: size,
              height: size,
              left: x,
              top: y,
              opacity: opacity,
            }}
          />
        );
      }
      return starsArray;
    };

    setStars(generateStars());
  }, []);

  const ballPosition = scrollPosition * 0.1; // Adjust speed of the ball movement
  const opacity = Math.min(scrollPosition / 300, 1); // Fade in content as the ball moves

  return (
    <section>
      <div className="flex flex-col min-h-[556px] sm:min-h-[549px] md:min-h-[628px] lg:min-h-[510px]">
        {hasMounted ? (
          <div className="relative flex-grow py-20 pb-0 text-frostWhite overflow-hidden lg:pb-20 ">
            {/* Starry background */}
            <div className="absolute inset-0 w-full">{stars}</div>

            <div className="absolute top-0 left-0 w-[40px] h-[40px] sm:w-[50px] sm:h-[50px] rounded-full bg-gradient-to-tl from-nightSky to-[#CD853F] shadow-2xl transition-all" style={{ transform: `translateX(${ballPosition}px)` }}></div>

            <div className="flex flex-col items-center justify-between relative z-10 max-w-full lg:flex-row lg:gap-16">
              <div className="order-3 w-full flex flex-col text-center mt-10 lg:order-none  lg:mb-0 lg:text-left lg:items-start transition-opacity duration-700" style={{ opacity: scrollPosition === 0 ? 0 : opacity }}>
                <Heading className="subheading font-bold mb-4 text-chocolate">
                  My History
                </Heading>
                <p className="text-base leading-7">
                  Over the years, I’ve honed my skills through self-study and
                  hands-on experience in technology and design. I create tailored
                  digital solutions using a diverse range of tools and technologies to
                  meet user needs.
                </p>
              </div>

              <div className="w-full flex justify-center lg:w-1/2 lg:justify-end relative mt-6 lg:mt-0">
                <div className="w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] md:w-[350px] md:h-[350px] rounded-full bg-gradient-to-tl from-nightSky to-ashGray shadow-2xl relative">
                  <div className="absolute inset-0 rounded-full" style={{
                    background: `radial-gradient(circle, rgba(107, 107, 107, 0.5), transparent 60%)`,
                  }}></div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-grow bg-nightSky"></div>
        )}
      </div>
    </section>
  );
};

export default History;
