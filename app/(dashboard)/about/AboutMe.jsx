import Image from "next/image";

const AboutMe = () => {
    return (
        <section>
            <div className="flex flex-col items-center justify-center lg:gap-10 lg:flex-row uw:gap-0">

                {/* Image Section */}
                <div className="flex-1 lg:flex-none lg:w-1/2">
                    <Image
                        src="/images/homepage/hero/placeholder.png"
                        alt="Simon Sutherland, Web Developer and Designer"
                        width={544}
                        height={586}
                        priority
                        quality={100}
                    />
                </div>

                {/* Text Section */}
                <div className="pt-6 flex flex-col justify-center text-center max-w-[544px] lg:bg-nightSky lg:h-max lg:text-left lg:self-center lg:max-w-lg lg:p-8">
                    <h2 className="subheading font-b text-saddleBrown mb-4">About Me</h2>
                    <p className="leading-7 text-ashGray">
                        I'm Simon, a Full Stack Developer and UI Designer with over six years of experience creating immersive digital experiences.
                        My passion for technology drives me to turn ideas into interactive realities through code and design.
                    </p>
                </div>

            </div>
        </section>

    );
};

export default AboutMe;


