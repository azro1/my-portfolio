"use client";

import Lottie from "react-lottie";
import animationData from "/public/lottie-animations/teach.json";

const Teaching = () => {

  const defaultOptions = {
    loop: true,  // Set to true if you want the animation to loop
    autoplay: true,  // Set to true if you want the animation to play automatically
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  return (
    <section>
      <div className="flex flex-col items-center w-full relative lg:flex-row lg:gap-0 uw:justify-between min-h-[525px] md:min-h-[607px] lg:min-h-[444px]">

      <div className="flex-grow flex flex-col items-center min-h-[254px] relative right-2 sm:min-h-[370px] md:max-w-lg lg:w-1/2 md:min-h-[458px] lg:min-h-0 lg:right-4">
            <Lottie options={defaultOptions} />
        </div>

        <div className="flex-grow flex flex-col text-center lg:text-left lg:w-1/2 ">
          <h2 className="subheading font-b mb-4 text-saddleBrown">
            Teaching
          </h2>
          <p className="text-base leading-7">
            I'm passionate about sharing knowledge through my{" "}
            <a
              className="text-saddleBrown hover:underline transition-all duration-300"
              href="https://www.youtube.com/channel/UCSK7zfwlgMq3r88lkchHsSw"
              target="_blank"
              rel="noopener noreferrer"
            >
              YouTube channel
            </a>
            , offering tutorials on web development, graphic design, and more.
            Teaching via video content broadens my reach, empowering others to
            explore these creative realms.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Teaching;
