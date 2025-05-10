import Image from 'next/image';

// components
import Heading from '@/app/components/Heading';

const Teaching = () => {
  return (
    <section>
      <div className="relative flex flex-col items-center w-full max-w-[478px] mx-auto lg:max-w-none lg:flex-row lg:gap-10">

        {/* Image Section */}
        <div className="flex-grow flex justify-center w-full max-w-[478px] max-h-[440px] relative z-10">
            <Image
                className="object-cover w-full max-w-[478px] h-auto"
                src={'/images/placeholders/placeholder_M.png'}
                alt={'Contributing to the open-source community'}
                width={478}
                height={440}
                priority
                quality={100}
            />
        </div>

        <div className="flex-grow flex flex-col text-center bg-nightSky pt-6 lg:p-10 lg:text-left lg:w-1/2">
          <Heading className="subheading font-bold mb-2 text-goldenOchre">
            Teaching
          </Heading>

          <p className=" lg:leading-7">
            I&apos;m passionate about sharing knowledge through my{" "}
            <a
              className="text-cloudGray font-light hover:underline transition-all duration-300"
              href="https://www.youtube.com/channel/UCSK7zfwlgMq3r88lkchHsSw"
              target="_blank"
              rel="noopener noreferrer"
            >
              youtube channel
            </a>
            , offering tutorials on web development, graphic design, and more.
            Teaching online broadens my reach, empowering others to
            explore these creative realms.
          </p>
        </div>
        
      </div>
    </section>
  );
};

export default Teaching;
