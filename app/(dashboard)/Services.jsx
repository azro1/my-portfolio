import Image from "next/image"

const Services = () => {
  return (
    <section>
      <div className='grid grid-cols-1 md:grid-cols-2 grid-auto-rows md:grid-rows-[repeat(auto-fill,_minmax(0,_375px))] gap-4 md:gap-16'>

          <div className="col-span-1 md:col-start-1 md:row-start-1 relative h-[375px] bg-gradient-to-b from-nightSky to-cloudGray">
            <Image
              className="object-cover max-w-[412px] mx-auto"
              src="/images/homepage/services/Programming-bro.svg" 
              alt="A visual representation of the web development process"
              fill
              quality={100}
              priority
            />
          </div>

          <div className="flex flex-col items-center text-center col-span-1 md:items-start md:text-left md:col-start-2 md:row-start-1 self-center">
            <h2 className="subheading font-b text-saddleBrown mb-4">Web Development</h2>
            <p className="leading-7">I'm a passionate and detail-oriented web developer dedicated to creating unique, functional, and visually appealing websites with a strong foundation in both front-end and back-end technologies</p>
          </div>


          <div className="mt-20 md:mt-0 col-span-1 md:col-start-2 md:row-start-2 relative h-[375px] bg-gradient-to-b from-nightSky to-cloudGray">
            <Image 
                className="object-contain max-w-[350px] md:max-w-[300px] lg:max-w-[360px] mx-auto "
                src="/images/homepage/services/UI-UX design-bro.svg" 
                alt="A visual representation of the UI design process"
                fill
                quality={100}
                priority
            />
          </div>

          <div className="flex flex-col items-center text-center col-span-1 md:items-start md:text-left md:col-start-1 md:row-start-2 self-center">
            <h2 className="subheading font-b text-saddleBrown mb-4">UI Design</h2>
            <p className="leading-7">I'm a creative UI designer with a passion for crafting visually stunning and intuitive user interfaces. I specialize in translating ideas into engaging designs that not only captivate users but also enhance overall user experiences</p>
          </div>


          <div className="mt-20 md:mt-0 col-span-1 md:col-start-1 md:row-start-3 relative h-[375px] bg-gradient-to-b from-nightSky to-cloudGray">
            <Image
              className=" object-contain max-w-[300px] lg:max-w-[326px] mx-auto"
              src="/images/homepage/services/Mobile development-bro.svg" 
              alt="A visual representation of the mobile app development process"
              fill
              quality={100}
              priority
            />
          </div>

          <div className="flex flex-col items-center text-center col-span-1 md:items-start md:pt-0 md:text-left md:col-start-2 md:row-start-3 self-center">
            <h2 className="subheading font-b text-saddleBrown mb-4">Mobile Development</h2>
            <p className="leading-7">Experienced in crafting seamless user experiences for both iOS and Android platforms. Passionate about turning innovative ideas into captivating mobile applications. With strong technical skills and a creative touch, I'm geared to take mobile development to the next level</p>
          </div>


          <div className="mt-20 md:mt-0 col-span-1 md:col-start-2 md:row-start-4 relative h-[375px] bg-gradient-to-b from-nightSky to-cloudGray">
            <Image
              className="object-contain max-w-[350px] md:max-w-[336px] lg:max-w-full mx-auto" 
              src="/images/homepage/services/Design tools-bro.svg" 
              alt="A visual representation of the graphic design process"
              fill
              quality={100}
              priority
            />
          </div>

          <div className="flex flex-col items-center text-center col-span-1 md:items-start md:pt-0 md:text-left md:col-start-1 md:row-start-4 self-center">
            <h2 className="subheading font-b text-saddleBrown mb-4">Graphic Design</h2>
            <p className="leading-7">A passionate graphic designer adept at transforming ideas into visually striking concepts. Proficient in delivering impactful designs that resonate with target audiences. Eager to bring a unique blend of creativity and precision to your visual projects</p>
          </div>

      </div>
    </section>
  )
}

export default Services
