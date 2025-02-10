"use client"

import Lottie from "react-lottie";
import animationData from "/public/lottie-animations/interests.json";

const Interests = () => {

  const defaultOptions = {
    loop: true,  // Set to true if you want the animation to loop
    autoplay: true,  // Set to true if you want the animation to play automatically
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid meet",
    },
  };

  return (
    <section>
      <div className="flex flex-col lg:gap-10 lg:flex-row items-center min-h-[519px] lg:min-h-[448px]">

        <div className="flex-grow w-full max-w-xs sm:max-w-sm md:max-w-md min-h-[288px] sm:min-h-[384px] lg:w-1/2 lg:max-w-md">
          <Lottie options={defaultOptions} />
        </div>

        {/* Text Section */}
        <div className="flex-grow text-center lg:w-1/2 lg:text-left">
          <h2 className="subheading font-b text-frostWhite mb-4">My Interests</h2>
          <p className="leading-7">
            When I'm not absorbed in pixels and code or catching up on design trends, I indulge in the joys of cooking and diving into captivating books. These creative outlets fuel my imagination and bring balance to my life, inspiring both my personal and professional pursuits.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Interests;
