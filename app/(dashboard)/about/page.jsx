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
    <div className="flex flex-col min-h-screen bg-charcoalGray lg:bg-[linear-gradient(to_bottom_right,_theme(colors.nightSky)_35%,_theme(colors.charcoalGray)_35%,_theme(colors.charcoalGray)_65%,_theme(colors.nightSky)_65%)]">



        <div className="flex-1 flex flex-col pt-32 sm:pt-44">
          <div className="pb-16 md:pb-32">
            <div className="px-[x-pad] mx-auto max-w-screen-lg xl:p-0 uw:max-w-[1300px]">
              <main>
                <AboutMe />
              </main>
            </div>
          </div>

          <div className="py-16 bg-nightSky md:py-32 lg:bg-charcoalGray">
            <div className="px-[x-pad] mx-auto max-w-screen-lg xl:p-0">
              <main>
                <History />
              </main>
            </div>
          </div>

          <div className="py-16 bg-charcoalGray md:py-32 lg:bg-nightSky">
            <div className="px-[x-pad] mx-auto max-w-screen-lg xl:p-0 uw:max-w-[1600px]">
              <main>
                <KeySkills />
              </main>
            </div>
          </div>


          <div className="py-16 bg-nightSky md:py-32 lg:bg-charcoalGray">
            <div className="px-[x-pad] mx-auto max-w-screen-lg xl:p-0 uw:max-w-[1300px]">
              <main>
                <Teaching />
              </main>
            </div>
          </div>

          <div className="py-16 md:py-32 ">
            <div className="px-[x-pad] mx-auto max-w-screen-lg xl:p-0">
              <main>
                <Contributing />
              </main>
            </div>
          </div>

          <div className="py-16 bg-nightSky md:pt-32 md:pb-44 lg:bg-charcoalGray">
            <div className="px-[x-pad] mx-auto max-w-screen-lg xl:p-0 uw:max-w-[1300px]">
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