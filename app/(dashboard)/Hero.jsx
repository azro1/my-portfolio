import Link from "next/link"
import Image from "next/image"

const Hero = () => {
  return (
        <section>
            <div className="flex flex-col-reverse items-center justify-center lg:gap-10 lg:flex-row ">


                {/* Text Section */}
                <div className="flex-1 w-full flex flex-col justify-center text-center p-6 md:max-w-[544px] lg:max-w-full lg:h-max lg:p-0">
                  <div className=" lg:max-w-md lg:mx-auto">
                    <h1 className="mainheading font-b tracking-wider text-frostWhite mb-4">Hi, I'm Simon</h1>
                    <p className="text-lg leading-7 mb-6">A full stack developer
                      specializing in front and back end web 
                      technologies and UI design</p>
                    <Link className="group" href="#">
                      <button className="btn">DOWNLOAD CV</button>
                    </Link>
                  </div>
                </div>



                {/* Image Section */}
                <div className="flex max-w-[544px] max-h-[586px] ">
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


