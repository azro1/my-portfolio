"use client"; // Ensure the code runs on the client-side only

import dynamic from 'next/dynamic';

// Dynamically import the Player component with proper resolution
const Player = dynamic(() => import('@lottiefiles/react-lottie-player').then(mod => mod.Player), {
  ssr: false, // Disable server-side rendering for this component
});

// components
import Heading from '@/app/components/Heading';

const Interests = () => {

  return (
    <section>
      <div className="flex flex-col lg:gap-10 lg:flex-row items-center min-h-[519px] lg:min-h-[448px]">

        <div className="flex-grow w-full max-w-xs sm:max-w-sm md:max-w-md min-h-[288px] sm:min-h-[384px] lg:w-1/2 lg:max-w-md">
          <Player
            src="/lottie-animations/interests.json"
            loop
            autoplay
          />
        </div>

        {/* Text Section */}
        <div className="flex-grow text-center lg:w-1/2 lg:text-left">
          <Heading className="subheading font-b text-chocolate mb-4">
            My Interests
          </Heading>
          <p className="leading-7">
            When I&apos;m not absorbed in pixels and code or catching up on design trends, I indulge in the joys of cooking and diving into captivating books. These creative outlets fuel my imagination and bring balance to my life, inspiring both my personal and professional pursuits.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Interests;
