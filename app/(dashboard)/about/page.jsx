import Image from "next/image"

// metadata
export const metadata = {
  title: 'My Portfolio | About Me',
  description: 'Learn more about my work, skills, and interests.',
}

const About = () => {
  return (
    <main>
      <div className="grid grid-cols-1 mt-16 gap-y-6.25 md:gap-y-10.25 mb-14 sm:mb-6.25 lg:mb-36">
        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-end md:gap-8">
          <div className="w-full h-80 md:h-96 relative">
            <Image
              src={'/images/about/untitled.png'}
              alt={'a picture of me'}
              fill={true}
              objectFit="scale-down"
            />
          </div>
          <div className="flex flex-col text-center mt-16 md:mt-0 md:text-left md:w-full">
            <h2 className="subheading font-b text-hint pb-3">About Me</h2>
            <p className="leading-6 pb-4">Hello there! I'm Simon a passionate Full Stack Developer and UI Designer with over six years of hands-on experience in crafting immersive digital experiences.</p> 
            <p className="leading-6">My journey into the world of code and design was fuelled by a fascination for technology's ability to transform ideas into interactive realities.</p>
          </div>
        </div>

        <div className="flex flex-col-reverse text-center items-center md:flex-row md:gap-8">
          <div className="flex flex-col mt-16 md:mt-0 md:justify-center md:text-left md:w-full">
            <h2 className="subheading font-b text-hint pb-3">My History</h2>
            <p className="leading-6 pb-4">I've dedicated years to self-study and hands-on exploration in technology and design. From diving into coding languages to creating engaging digital interfaces, my journey is all about mastering digital innovation through relentless learning.</p> 
            <p className="leading-6">With a foundation built on diverse tools across different technologies, I create digital solutions that are tailored to users needs and preferences.</p>
          </div>
          
          <div className="w-full h-64 md:h-74 relative">
            <Image
              src={'/images/about/triangle.svg'}
              alt={'a triangle shape'}
              fill={true}
              objectFit="scale-down"
            />
          </div>
        </div>

        <div className="flex flex-col text-center gap-8">
          <h2 className="subheading font-b text-hint text-center">Key Skills</h2>
          <ul className="flex flex-col gap-y-16 items-center md:flex-row md:justify-around">
            <li className="flex flex-col items-center justify-center w-28 text-center gap-3">
              <Image
                src={'/images/about/fed.svg'}
                alt={'an icon for front end development'} 
                width={30} 
                height={30} 
              />
              <p>Front End Development</p>
            </li>
            <li className="flex flex-col items-center justify-center w-28 gap-3">
              <Image
                src={'/images/about/gd.svg'}
                alt={'an icon for graphic design'} 
                width={30} 
                height={30} 
              />
              <p>Graphic Design</p>
            </li>
            <li className="flex flex-col items-center justify-center w-28 gap-3">
              <Image
                src={'/images/about/rd.svg'}
                alt={'an icon for responsive design'} 
                width={30} 
                height={30} 
              />
              <p>Responsive Design</p>
            </li>
            <li className="flex flex-col items-center justify-center w-28 gap-3">
              <Image
                src={'/images/about/uid.svg'}
                alt={'an icon for responsive design'} 
                width={30} 
                height={30} 
              />
              <p>UI Design</p>
            </li>
            <li className="flex flex-col items-center justify-center w-28 gap-3">
              <Image
                src={'/images/about/bed.svg'}
                alt={'an icon for responsive design'} 
                width={30} 
                height={30} 
              />
              <p>Back End Development</p>
            </li>
          </ul>
          <p className="leading-6 md:max-w-3xl self-center">Over time, my expertise has evolved considerably from initially grasping fundamental concepts to now comprehensively understanding the complexities of both front-end and back-end development, my journey has been marked by continuous learning and growth</p>
        </div>

        <div className="flex flex-col items-center md:flex-row md:justify-between md:items-end md:gap-8">
          <div className="w-full h-80 md:h-96 relative">
            <Image
              src={'/images/about/untitled.png'}
              alt={'a picture of me'}
              fill={true}
              objectFit="scale-down"
            />
          </div>
          <div className="flex flex-col text-center mt-16 md:mt-0 md:text-left md:w-full">
            <h2 className="subheading font-b text-hint pb-3">Contributing</h2>
            <p className="leading-6 pb-4">Beginning my open-source journey with simple HTML projects, I'm eager to learn, grow, and contribute. It's just the start as I strive to refine my skills and make an impact in web development.</p> 
            <p className="leading-6">Check out my <a className="text-hint" href="https://github.com/azro1" target="_blank">GitHub</a> repository for a closer look at my community engagements and open-source contributions.</p>
          </div>
        </div>


        <div className="flex flex-col-reverse text-center items-center md:flex-row md:gap-8">
          <div className="flex flex-col mt-16 md:mt-0 md:justify-center md:text-left md:w-full">
            <h2 className="subheading font-b text-hint pb-3">Teaching</h2>
            <p className="leading-6 pb-4">I'm passionate about sharing knowledge through my <a className="text-hint" href="https://www.youtube.com/channel/UCSK7zfwlgMq3r88lkchHsSw" target="_blank">YouTube channel</a> offering tutorials on web development, graphic design, and more. Teaching via video content broadens my reach, empowering others to explore these creative realms.</p> 
          </div>
          <div className="w-full h-64 md:h-74 relative">
            <Image
              src={'/images/about/ellipse.svg'}
              alt={'a triangle shape'}
              fill={true}
              objectFit="scale-down"
            />
          </div>
        </div>

        <div className="flex flex-col text-center items-center md:flex-row md:gap-8">
          <div className="w-full h-64 md:h-74 relative">
            <Image
              src={'/images/about/triangle.svg'}
              alt={'a triangle shape'}
              fill={true}
              objectFit="scale-down"
            />
          </div>
          <div className="flex flex-col mt-16 md:mt-0 md:justify-center md:text-left md:w-full">
            <h2 className="subheading font-b text-hint pb-3">My Interests</h2>
            <p className="leading-6 pb-4">When I'm not absorbed in pixels and code or catching up on design trends, I indulge in the joys of cooking and diving into captivating books. These creative outlets fuel my imagination and bring balance to my life, inspiring both my personal and professional pursuits.</p> 
          </div>
        </div>
      </div>
    </main>
  )
}

export default About
