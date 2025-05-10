import Image from "next/image";

// components
import Heading from "@/app/components/Heading";

const History = () => {

  return (
    <section>
          <div className="relative flex flex-col-reverse items-center w-full max-w-[378px] mx-auto lg:max-w-none lg:flex-row lg:gap-10">
              {/* Text Section */}
              <div className="flex-1 flex flex-col justify-center text-center relative z-10 bg-nightSky pt-6 lg:p-10 lg:text-left">
                  <Heading className="subheading font-semibold mb-2 text-goldenOchre">
                    My History
                  </Heading>
                  <p className="text-base lg:leading-7">
                    I’ve honed my skills through self-study and
                    hands-on experience in technology and design. I create tailored
                    digital solutions using a diverse range of tools and technologies to
                    meet user needs.
                  </p>
              </div>

              {/* Image Section */}
              <div className="flex justify-center w-full max-w-[378px] max-h-[340px] relative z-10">
                  <Image
                      className="object-cover w-full h-auto"
                      src={'/images/placeholders/placeholder_S.png'}
                      alt={'Contributing to the open-source community'}
                      width={378}
                      height={340}
                      priority
                      quality={100}
                  />
              </div>
          </div>
    </section>
  );
};

export default History;
