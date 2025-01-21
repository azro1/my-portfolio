// metadata
export const metadata = {
  title: 'My Portfolio | About Me',
  description: 'Learn more about my work, skills, and interests.',
}

// components
import Sidebar from "../components/Sidebar"
import AboutMe from "./AboutMe"
import History from "./History"
import KeySkills from "./KeySkills"
import Contributing from "./Contributing.jsx"
import Teaching from "./Teaching"
import Interests from "./Interests"
import Footer from "../components/Footer"


const About = () => {
  return (
    <div className="flex bg-slateOnyx">
      <Sidebar />
      <div className="flex-1">
        <div className="flex flex-col pt-44">
            

          <div className="pb-32">
            <div className="main-container uw:max-w-[1300px] uw:mx-auto">
               <main>
                 <AboutMe />
               </main>
            </div>
          </div>

          <div className="bg-nightSky py-32 mx-6 sm:mx-0">
            <div className="main-container">
              <main>
                <History />
              </main>
            </div>
          </div>

          <div className="py-32">
            <div className="main-container uw:max-w-[1600px] uw:mx-auto">
              <main>
                <KeySkills />
              </main>
            </div>
          </div>
          
          <div className="bg-nightSky py-32">
            <div className="main-container ">
              <main>
                <Contributing />
              </main>
            </div>
          </div>

          <div className="py-32">
            <div className="main-container uw:max-w-[1300px] uw:mx-auto">
              <main>
                <Teaching />
              </main>
            </div>
          </div>

          <div className="bg-nightSky py-32">
            <div className="main-container">
               <main>
                 <Interests />
               </main>
            </div>
          </div>

        </div>
        <Footer />
      </div>

    </div>

  )
}

export default About