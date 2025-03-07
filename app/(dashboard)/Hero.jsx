import Link from "next/link"
import Image from "next/image"

const Hero = () => {
  return (
        <section>
            <div className="flex flex-col-reverse items-center justify-center lg:gap-10 lg:flex-row uw:gap-28">


                {/* Text Section */}
                <div className="flex flex-col justify-center text-center pt-6 max-w-[544px] lg:h-max lg:self-center lg:max-w-md lg:p-8">
                  <h1 className="mainheading font-b tracking-wider text-frostWhite mb-3">Hi, I'm Simon</h1>
                  <p className="text-base md:text-lg max-w-lg mx-auto leading-7 mb-6">A full stack developer
                    specializing in front and back end web 
                    technologies and UI design</p>
                  <Link className="group" href="#">
                    <button className="btn">DOWNLOAD CV</button>
                  </Link>
                </div>



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

            </div>
        </section>
  )
}

export default Hero


