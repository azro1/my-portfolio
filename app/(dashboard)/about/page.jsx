import Image from "next/image"

// metadata
export const metadata = {
  title: 'My Portfolio | About Me',
  description: 'Learn more about my work, skills, and interests.',
}

const About = () => {
  return (
    <div className="grid grid-cols-1 gap-y-6.25 md:gap-y-10.25">
      <div className="flex flex-col items-center md:flex-row md:gap-8">
        <div className="md:w-[80%]">
          <Image
            className="w-full"
            src={'/images/about/placeholder.png'}
            alt={'a picture of me'}
            width={378}
            height={340}
            priority
            quality={100}
          />
        </div>
        <div className="flex flex-col text-center mt-16 md:mt-0 md:text-left md:w-full">
          <h2 className="subheading font-b text-saddleBrown pb-3">About Me</h2>
          <p className="leading-7 pb-4">Hello there! I'm Simon a passionate Full Stack Developer and UI Designer with over six years of hands-on experience in crafting immersive digital experiences.</p> 
          <p className="leading-7">My journey into the world of code and design was fuelled by a fascination for technology's ability to transform ideas into interactive realities</p>
        </div>
      </div>

      <div className="flex flex-col-reverse text-center items-center md:flex-row md:gap-8">
        <div className="flex flex-col mt-16 md:mt-0 md:justify-center md:text-left md:w-full">
          <h2 className="subheading font-b text-saddleBrown pb-3">My History</h2>
          <p className="leading-7 pb-4">I've dedicated years to self-study and hands-on exploration in technology and design. From diving into coding languages to creating engaging digital interfaces, my journey is all about mastering digital innovation through relentless learning</p> 
          <p className="leading-7">With a foundation built on diverse tools across different technologies, I create digital solutions that are tailored to users needs and preferences</p>
        </div>
        
        <div className="w-[85%] sm:w-[70%] md:w-[50%]">
           <Image 
              className="w-full"
              src="/images/about/history.svg" 
              alt="an illustration of a man at his computer"
              width={64}
              height={64}
              quality={100}
              priority
           />
        </div>
      </div>

      <div className="flex flex-col text-center gap-8">
        <h2 className="subheading font-b text-saddleBrown text-center">Key Skills</h2>
        <ul className="flex flex-col gap-y-16 items-center md:flex-row md:justify-around">
          <li className="flex flex-col items-center justify-center w-28 text-center gap-3">
            <Image
              src={'/images/about/fed.svg'}
              alt={'an icon for front end development'} 
              width={30} 
              height={30} 
              quality={100}
              priority
            />
            <p>Front End Development</p>
          </li>
          <li className="flex flex-col items-center justify-center w-28 gap-3">
            <Image
              src={'/images/about/gd.svg'}
              alt={'an icon for graphic design'} 
              width={30} 
              height={30}
              quality={100}
              priority 
            />
            <p>Graphic Design</p>
          </li>
          <li className="flex flex-col items-center justify-center w-28 gap-3">
            <Image
              src={'/images/about/rd.svg'}
              alt={'an icon for responsive design'} 
              width={30} 
              height={30}
              quality={100}
              priority
            />
            <p>Responsive Design</p>
          </li>
          <li className="flex flex-col items-center justify-center w-28 gap-3">
            <Image
              src={'/images/about/uid.svg'}
              alt={'an icon for responsive design'} 
              width={30} 
              height={30}
              quality={100}
              priority
            />
            <p>UI Design</p>
          </li>
          <li className="flex flex-col items-center justify-center w-28 gap-3">
            <Image
              src={'/images/about/bed.svg'}
              alt={'an icon for responsive design'} 
              width={30} 
              height={30}
              quality={100}
              priority 
            />
            <p>Back End Development</p>
          </li>
        </ul>
        <p className="leading-7 md:max-w-3xl self-center">Over time, my expertise has evolved considerably from initially grasping fundamental concepts to now comprehensively understanding the complexities of both front-end and back-end development, my journey has been marked by continuous learning and growth</p>
      </div>

      <div className="flex flex-col items-center md:flex-row md:justify-between md:gap-8">
        <div className="md:w-[80%]">
          <Image
            className="w-full"
            src={'/images/about/placeholder.png'}
            alt={'a picture of me'}
            width={378}
            height={340}
            priority
            quality={100}
          />
        </div>
        <div className="flex flex-col text-center mt-16 md:mt-0 md:text-left md:w-full">
          <h2 className="subheading font-b text-saddleBrown pb-3">Contributing</h2>
          <p className="leading-7 pb-4">Beginning my open-source journey with simple HTML projects, I'm eager to learn, grow, and contribute. It's just the start as I strive to refine my skills and make an impact in web development.</p> 
          <p className="leading-7">Check out my <a className="text-base text-saddleBrown" href="https://github.com/azro1" target="_blank">GitHub</a> repository for a closer look at my community engagements and open-source contributions</p>
        </div>
      </div>


      <div className="flex flex-col-reverse text-center items-center md:flex-row md:gap-8">
        <div className="flex flex-col mt-16 md:mt-0 md:justify-center md:text-left md:w-full">
          <h2 className="subheading font-b text-saddleBrown pb-3">Teaching</h2>
          <p className="leading-7 pb-4">I'm passionate about sharing knowledge through my <a className="text-base text-saddleBrown" href="https://www.youtube.com/channel/UCSK7zfwlgMq3r88lkchHsSw" target="_blank">YouTube channel</a> offering tutorials on web development, graphic design, and more. Teaching via video content broadens my reach, empowering others to explore these creative realms</p> 
        </div>
        <div className="w-[90%] sm:w-[75%] md:w-[60%]">
          <Image
          className="w-full"
            src={'/images/about/teaching.svg'}
            alt="an illustration of a woman watching a youtube video"
            width={64}
            height={64}
            priority
            quality={100}
          />
        </div>
      </div>

      <div className="flex flex-col text-center items-center md:flex-row md:gap-8">
        <div className="w-[75%] sm:w-[60%] md:w-[45%]">
          <Image
            className="w-full"
            src={'/images/about/interests.svg'}
            alt="an illustration of a man cooking at a barbecue"
            width={64}
            height={64}
            priority
            quality={100}
          />
        </div>
        <div className="flex flex-col mt-16 md:mt-0 md:justify-center md:text-left md:w-full">
          <h2 className="subheading font-b text-saddleBrown pb-3">My Interests</h2>
          <p className="leading-7 pb-4">When I'm not absorbed in pixels and code or catching up on design trends, I indulge in the joys of cooking and diving into captivating books. These creative outlets fuel my imagination and bring balance to my life, inspiring both my personal and professional pursuits</p> 
        </div>
      </div>
    </div>
  )
}

export default About
