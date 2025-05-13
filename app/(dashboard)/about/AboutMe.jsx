import Image from "next/image";

// components
import Heading from "@/app/components/Heading";

const AboutMe = () => {
    return (
        <section>
            <div className="flex flex-col items-center max-w-[544px] mx-auto lg:max-w-none lg:flex-row">

                {/* Image Section */}
                <div className="flex max-w-[544px] max-h-[586px]">
                    <Image
                        src="/images/placeholders/placeholder_L.png"
                        alt="Simon Sutherland, Web Developer and Designer"
                        width={544}
                        height={586}
                        priority
                        quality={100}
                    />
                </div>

                {/* Text Section */}
                <div className="flex-1 flex flex-col justify-center text-center pt-6 lg:bg-nightSky lg:p-10 lg:h-max lg:text-left">
                    <Heading className="subheading font-bold text-cloudGray mb-2 lg:mx-0">
                        About Me
                    </Heading>
                    <p className="text-charcoalGrayLight lg:text-stoneGray">
                    With 8 years of experience in creating immersive digital experiences, I’m passionate about turning ideas into interactive, user-centered solutions. My work combines technology and design to build impactful and engaging projects that deliver real value.
                    </p>
                </div>

            </div>
        </section>
    );
};

export default AboutMe;


