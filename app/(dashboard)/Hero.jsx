import Image from "next/image"

// components
import Heading from "../components/Heading"
import Button from "../components/Button"

const Hero = () => {
  return (
    <section>
      <div className="flex flex-col-reverse items-center justify-center lg:gap-10 lg:flex-row ">

        {/* Text Section */}
        <div className="flex-1 w-full flex flex-col justify-center text-center pt-6 md:max-w-[544px] lg:max-w-full lg:h-max lg:pt-0">
          <div className="lg:max-w-md lg:mx-auto">
            <Heading className='font-bold text-goldenOchre mb-2 leading-tight text-[22px] md:m-3 lg:text-2xl xl:text-3xl'>
              Hi, I&apos;m Simon
            </Heading>
            <p className="text-stoneGray mb-5 md:mb-6 md:text-lg lg:leading-7">A full stack developer
              specializing in front and back end web
              technologies and UI design</p>
            <a className="text-sm block w-max mx-auto md:text-base" href="/CV_doc.txt" download="CV_doc.txt">
              <Button
                className='py-3 px-5 rounded-lg text-cloudGray font-extrabold cursor-pointer shadow-[0_4px_12px_rgba(0,0,0,0.3)] transition-all transform hover:scale-105 bg-charcoalGray'
                textStyles='text-sm lg:text-base font-bold'
                text={'DOWNLOAD CV'}
              />
            </a>
          </div>
        </div>

        {/* Image Section */}
        <div className="flex max-w-[544px] max-h-[586px] ">
          <Image
            src="/images/placeholders/placeholder_L.png"
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


