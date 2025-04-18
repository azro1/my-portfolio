import Image from "next/image"

// components
import Button from "../components/Button"
import Heading from "../components/Heading"

const Hero = () => {
  return (
    <section>
      <div className="flex flex-col-reverse items-center justify-center lg:gap-10 lg:flex-row ">

        {/* Text Section */}
        <div className="flex-1 w-full flex flex-col justify-center text-center p-6 md:max-w-[544px] lg:max-w-full lg:h-max lg:p-0">
          <div className="lg:max-w-md lg:mx-auto">
            <Heading className='mainheading font-b text-goldenOchre mb-3 md:mb-4'>
              Hi, I&apos;m Simon
            </Heading>
            <p className="mb-6 md:text-lg md:leading-7">A full stack developer
              specializing in front and back end web
              technologies and UI design</p>
            <a href="/CV_doc.txt" download="CV_doc.txt">
              <Button
                backgroundColor="bg-charcoalGray"
                padding="py-3 px-3.5"
                margin='mx-auto'
                text="DOWNLOAD CV"
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


