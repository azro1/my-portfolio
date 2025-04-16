import Image from 'next/image';

// components
import Heading from '@/app/components/Heading';

const Interests = () => {

  return (
    <section>
      <div className="relative flex flex-col gap-6 items-center w-full lg:flex-row lg:gap-10">

        {/* Image Section */}
        <div className="flex-grow flex justify-center w-full max-w-[478px] max-h-[440px] relative z-10">
          <Image
            className="object-cover w-full h-auto"
            src={'/images/placeholders/placeholder_M.png'}
            alt={'Contributing to the open-source community'}
            width={478}
            height={440}
            priority
            quality={100}
          />
        </div>

        <div className="flex-grow flex flex-col text-center lg:text-left lg:w-1/2">
          <Heading className="subheading font-b text-goldenOchre mb-4">
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
