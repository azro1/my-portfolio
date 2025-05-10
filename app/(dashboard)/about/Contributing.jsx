import Image from "next/image";

// components
import Heading from "@/app/components/Heading";

const Contributing = () => {
    return (
        <section>
            <div className="relative flex flex-col-reverse items-center w-full max-w-[378px] mx-auto lg:max-w-none lg:flex-row">
                {/* Text Section */}
                <div className="flex-1 flex flex-col justify-center text-center pt-6 lg:bg-nightSky lg:p-10 lg:text-left relative z-10">
                    <Heading className="subheading font-semibold text-cloudGray mb-2">
                        Contributing
                    </Heading>
                    <p className="text-charcoalGrayLight lg:text-ashGray lg:leading-7 ">
                        Beginning my open-source journey with HTML projects, I’m eager to expand my web development skills. Through active contributions and collaboration on various projects, I continue to learn and grow within the community.
                        Check out my <a className="text-base text-cloudGray hover:underline font-light" href="https://github.com/azro1" target="_blank" rel="noopener noreferrer">github</a> repository.
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

export default Contributing;
