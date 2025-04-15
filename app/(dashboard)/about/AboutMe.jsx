import Image from "next/image";

// components
import Heading from "@/app/components/Heading";

const AboutMe = () => {
    return (
        <section>
            <div className="flex flex-col items-center  lg:gap-16 lg:flex-row">

                {/* Image Section */}
                <div className="flex max-w-[544px] max-h-[586px]">
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
                <div className="pt-6 flex-1 flex flex-col justify-center text-center lg:h-max lg:text-left ">
                    <Heading className="subheading font-b text-cloudGray mb-4 lg:mx-0">
                        About Me
                    </Heading>
                    <p className="leading-7 text-charcoalGrayLight">
                    With 7+ years of experience in creating immersive digital experiences, I’m passionate about turning ideas into interactive, user-centered solutions. My work combines technology and design to build impactful and engaging projects that deliver real value
                    </p>
                </div>

            </div>
        </section>

    );
};

export default AboutMe;


