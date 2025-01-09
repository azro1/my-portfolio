import Image from "next/image"

// metadata
export const metadata = {
  title: 'My Portfolio | About Me',
  description: 'Learn more about my work, skills, and interests.',
}

const About = () => {
  return (
    <div className="grid grid-cols-1 grid-auto-rows md:grid-rows-[repeat(auto-fill,_minmax(0,_340px))] md:md:grid-cols-2 gap-4 md:gap-x-16 md:gap-y-44">

        <div className="relative h-[340px]">
          <Image
            className="object-contain"
            src={'/images/about/placeholder.png'}
            alt={'a picture of me'}
            fill
            priority
            quality={100}
            sizes="(max-width: 768px) 100vw, 378px"
          />
        </div>

        <div className="flex flex-col text-center justify-center md:text-left">
          <h2 className="subheading font-b text-saddleBrown mb-4">About Me</h2>
          <p className="leading-7 pb-4">Hello, I'm Simon a passionate Full Stack Developer and UI Designer with over six years of hands-on experience in crafting immersive digital experiences.</p> 
          <p className="leading-7">My journey into the world of code and design was fuelled by a fascination for technology's ability to transform ideas into interactive realities</p>
        </div>




        <div className="mt-20 md:mt-0 md:col-start-2 md:row-start-2 relative h-[340px] bg-gradient-to-b from-nightSky to-cloudGray">
           <Image 
              className="object-cover max-w-[380px] mx-auto"
              src="/images/about/Coding-bro.svg" 
              alt="an illustration of a man at his computer"
              fill
              quality={100}
              priority
           />
        </div>

        <div className="flex flex-col text-center md:justify-center md:text-left">
          <h2 className="subheading font-b text-saddleBrown mb-4">My History</h2>
          <p className="leading-7 pb-4">I've dedicated years to self-study and hands-on exploration in technology and design. From diving into coding languages to creating engaging digital interfaces, my journey is all about mastering digital innovation through relentless learning</p> 
          <p className="leading-7">With a foundation built on diverse tools across different technologies, I create digital solutions that are tailored to users needs and preferences</p>
        </div>
        



        <div className="mt-20 md:mt-0 md:col-span-2 md:row-start-3 flex flex-col text-center gap-8 ">
          <h2 className="subheading font-b text-saddleBrown text-center mb-4">Key Skills</h2>
          <ul className="flex flex-col gap-y-16 items-center md:flex-row  md:justify-around">

          <li className="flex flex-col items-center justify-center w-28 text-center gap-2">
            <span className="p-4 rounded-full shadow-outer hover:scale-110 transform transition-all duration-200 ease-in-out">
              <Image
                src={'/images/about/fed.svg'}
                alt={'an icon for front end development'}
                width={30}
                height={30}
                quality={100}
                priority
              />
            </span>
            <div className="flex items-start md:h-12">
              <p>Front End</p>
            </div>
          </li>


          <li className="flex flex-col items-center justify-center w-28 gap-2">
            <span className="p-4 rounded-full shadow-outer hover:scale-110 transform transition-all duration-200 ease-in-out">
              <Image
                src={'/images/about/gd.svg'}
                alt={'an icon for graphic design'}
                width={30}
                height={30}
                quality={100}
                priority
              />
            </span>
            <div className="flex items-start md:h-12">
            <p>Graphic Design</p>
            </div>
          </li>


          <li className="flex flex-col items-center justify-center w-28 gap-2">
            <span className="p-4 rounded-full shadow-outer hover:scale-110 transform transition-all duration-200 ease-in-out">
              <Image
                src={'/images/about/rd.svg'}
                alt={'an icon for responsive design'}
                width={30}
                height={30}
                quality={100}
                priority
              />
            </span>
            <div className="flex items-start md:h-12">
              <p>Responsive Design</p>
            </div>
          </li>


          <li className="flex flex-col items-center justify-center w-28 gap-2">
            <span className="p-4 rounded-full shadow-outer hover:scale-110 transform transition-all duration-200 ease-in-out">
              <Image
                src={'/images/about/uid.svg'}
                alt={'an icon for responsive design'}
                width={30}
                height={30}
                quality={100}
                priority
              />
            </span>
            <div className="flex items-start md:h-12">
              <p>UI Design</p>
            </div>
          </li>


          <li className="flex flex-col items-center justify-center w-28 gap-2">
            <span className="p-4 rounded-full shadow-outer hover:scale-110 transform transition-all duration-200 ease-in-out">
              <Image
                src={'/images/about/bed.svg'}
                alt={'an icon for responsive design'}
                width={30}
                height={30}
                quality={100}
                priority
              />
            </span>
            <div className="flex items-start md:h-12">
              <p>Back End</p>
            </div>
          </li>

          </ul>
        </div>




        <div className="mt-20 md:mt-0 relative h-[340px]">
          <Image
            className="object-contain"
            src={'/images/about/placeholder.png'}
            alt={'a picture of me'}
            fill
            priority
            quality={100}
            sizes="(max-width: 768px) 100vw, 378px"
          />
        </div>

        <div className="flex flex-col text-center md:justify-center md:text-left">
          <h2 className="subheading font-b text-saddleBrown mb-4">Contributing</h2>
          <p className="leading-7 pb-4">Beginning my open-source journey with simple HTML projects, I'm eager to learn, grow, and contribute. It's just the start as I strive to refine my skills and make an impact in web development.</p> 
          <p className="leading-7">Check out my <a className="text-base text-saddleBrown" href="https://github.com/azro1" target="_blank" rel="noopener noreferrer">GitHub</a> repository for a closer look at my community engagements and open-source contributions</p>
        </div>




        <div className="mt-20 md:mt-0 md:col-start-2 md:row-start-5 relative h-[340px] bg-gradient-to-b from-nightSky to-cloudGray">
          <Image
            className="object-contain max-w-[380px] mx-auto"
            src={'/images/about/Webinar-pana.svg'}
            alt="an illustration of a woman watching a youtube video"
            fill
            priority
            quality={100}
          />
        </div>

        <div className="flex flex-col text-center md:justify-center md:text-left">
          <h2 className="subheading font-b text-saddleBrown mb-4">Teaching</h2>
          <p className="leading-7 pb-4">I'm passionate about sharing knowledge through my <a className="text-base text-saddleBrown" href="https://www.youtube.com/channel/UCSK7zfwlgMq3r88lkchHsSw" target="_blank" rel="noopener noreferrer">YouTube channel</a> offering tutorials on web development, graphic design, and more. Teaching via video content broadens my reach, empowering others to explore these creative realms</p> 
        </div>




        <div className="mt-20 md:mt-0 relative h-[340px] bg-gradient-to-b from-nightSky to-cloudGray">
          <Image
            className="object-contain max-w-[360px] mx-auto"
            src={'/images/about/Reading glasses-bro.svg'}
            alt="an illustration of a man cooking at a barbecue"
            fill
            priority
            quality={100}
          />
        </div>

        <div className="flex flex-col text-center md:justify-center md:text-left">
          <h2 className="subheading font-b text-saddleBrown mb-4">My Interests</h2>
          <p className="leading-7 pb-4">When I'm not absorbed in pixels and code or catching up on design trends, I indulge in the joys of cooking and diving into captivating books. These creative outlets fuel my imagination and bring balance to my life, inspiring both my personal and professional pursuits</p> 
        </div>



    </div>
  )
}

export default About
