import Image from 'next/image';

// components
import Heading from '@/app/components/Heading';

const Interests = () => {

  return (
    <section>
      <div className="relative flex flex-col items-center w-full max-w-[478px] mx-auto lg:max-w-none lg:flex-row lg:gap-10">

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

        <div className="flex-grow flex flex-col text-center bg-nightSky pt-6 lg:p-10 lg:text-left lg:w-1/2">
          <Heading className="subheading font-semibold text-goldenOchre mb-2">
            My Interests
          </Heading>
          <p className="lg:leading-7">
            Outside of development, I enjoy discovering new music, sketching design ideas, and immersing myself in online games. These small escapes keep my creativity sharp and give me the balance I need to stay inspired and focused in my work.
          </p>
        </div>

      </div>
    </section>
  );
};

export default Interests;
