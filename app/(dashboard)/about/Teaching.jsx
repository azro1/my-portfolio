"use client"; // Ensure the code runs on the client-side only

import dynamic from 'next/dynamic';

// Dynamically import the Player component with proper resolution
const Player = dynamic(() => import('@lottiefiles/react-lottie-player').then(mod => mod.Player), {
  ssr: false, // Disable server-side rendering for this component
});

const Teaching = () => {

  return (
    <section>
      <div className="flex flex-col items-center w-full relative lg:flex-row lg:gap-0 uw:justify-between min-h-[525px] md:min-h-[607px] lg:min-h-[444px]">

        <div className="flex-grow flex flex-col items-center min-h-[254px] relative right-2 sm:min-h-[370px] md:max-w-lg lg:w-1/2 md:min-h-[458px] lg:min-h-0 lg:right-4">
          <Player
            src="/lottie-animations/teach.json"
            loop
            autoplay
          />
        </div>

        <div className="flex-grow flex flex-col text-center lg:text-left lg:w-1/2">
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
