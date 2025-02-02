
import Image from "next/image";

const Contributing = () => {
    return (
        <div className="relative flex flex-col items-center w-full lg:flex-row">
            {/* Animated Gradient Background */}
            <div className="absolute inset-0">
                <div className="absolute -top-20 -left-60 w-[250px] h-[250px] sm:w-[350px] sm:h-[350px] md:w-[450px] md:h-[450px] rounded-full blur-xl opacity-30 gradient-bg"></div>
                <div className="absolute bottom-0 right-0 w-[550px] h-[550px] sm:w-[450px] sm:h-[450px] md:w-[450px] md:h-[450px] rounded-full blur-xl opacity-30 gradient-bg"></div>
            </div>

            {/* Image Section */}
            <div className="flex-1 flex justify-center w-full lg:w-1/2 lg:justify-center lg:self-center uw:justify-start relative z-10">
                <Image
                    className="object-cover w-full max-w-[378px] h-auto"
                    src={'/images/about/placeholder.png'}
                    alt={'Contributing to the open-source community'}
                    width={378}
                    height={340}
                    priority
                    quality={100}
                />
            </div>

            {/* Text Section */}
            <div className="flex-1 flex flex-col justify-center text-center max-w-[378px] pt-6 lg:text-left lg:max-w-full lg:self-center relative z-10">
                <h2 className="subheading font-b text-saddleBrown mb-4">Contributing</h2>
                <p className="leading-7 text-ashGray">
                    Starting my open-source journey with HTML projects, I'm excited to learn and grow in web development.
                    I'm contributing to the community by refining my skills and collaborating on various projects.
                    Check out my <a className="text-base text-saddleBrown hover:underline" href="https://github.com/azro1" target="_blank" rel="noopener noreferrer">GitHub</a> for more.
                </p>
            </div>
        </div>
    );
};

export default Contributing;
