// metadata
export const metadata = {
  title: 'My Portfolio | About Me',
  description: 'Learn more about my work, skills, and interests.',
}

// components
import AboutMe from "./AboutMe"
import History from "./History"
import KeySkills from "./KeySkills"
import Contributing from "./Contributing.jsx"
import Teaching from "./Teaching"
import Interests from "./Interests"


const About = () => {
  return (
    <div className="flex flex-col min-h-screen bg-slateOnyx">

        <div className="flex-1 flex flex-col pt-44">
          <div className="pb-16 md:pb-32">
            <div className="px-1.625 mx-auto max-w-screen-lg xl:p-0 uw:max-w-[1300px]">
              <main>
                <AboutMe />
              </main>
            </div>
          </div>

          <div className="py-16 md:py-32 bg-nightSky">
            <div className="px-1.625 mx-auto max-w-screen-lg xl:p-0">
              <main>
                <History />
              </main>
            </div>
          </div>

          <div className="py-16 md:py-32">
            <div className="px-1.625 mx-auto max-w-screen-lg xl:p-0 uw:max-w-[1600px]">
              <main>
                <KeySkills />
              </main>
            </div>
          </div>

          <div className="py-16 md:py-32 bg-nightSky">
            <div className="px-1.625 mx-auto max-w-screen-lg xl:p-0">
              <main>
                <Contributing />
              </main>
            </div>
          </div>

          <div className="py-16 md:py-32">
            <div className="px-1.625 mx-auto max-w-screen-lg xl:p-0 uw:max-w-[1300px]">
              <main>
                <Teaching />
              </main>
            </div>
          </div>

          <div className="py-16 md:py-32 bg-nightSky">
            <div className="px-1.625 mx-auto max-w-screen-lg xl:p-0">
              <main>
                <Interests />
              </main>
            </div>
          </div>
        </div>

    </div>

  )
}

export default About