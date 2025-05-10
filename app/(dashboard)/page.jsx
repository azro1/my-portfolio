// components
import Hero from "./Hero"
import Services from "./Services"
import MySkills from "./MySkills"
import ProjectList from "./projects/ProjectList"
import Connect from "./Connect"

const Home = () => {
  return (
      <div className="flex flex-col min-h-screen bg-nightSky lg:bg-[linear-gradient(to_bottom_right,_theme(colors.nightSky)_35%,_theme(colors.charcoalGray)_35%,_theme(colors.charcoalGray)_65%,_theme(colors.nightSky)_65%)]">

        <div className="flex-1 flex flex-col pt-32 sm:pt-44">
        <div className="pb-16 md:pb-32">
          <div className="px-[x-pad] mx-auto max-w-screen-lg xl:p-0 uw:max-w-[1300px]">
            <main>
              <Hero />
            </main>
          </div>
        </div>

        <div className="py-16 md:py-32 bg-charcoalGray">
          <div className="px-[x-pad] mx-auto max-w-screen-lg xl:p-0 uw:max-w-[1700px]">
            <main>
              <Services />
            </main>
          </div>
        </div>

        <div className="py-16 md:py-32">
          <div className="main-container">
            <main>
              <MySkills />
            </main>
          </div>
        </div>

        <div className="py-16 px-[x-pad] bg-charcoalGray md:py-32 lg:px-0">
          <main>
            <ProjectList />
          </main>
        </div>

        <div className="py-16 md:pt-32 md:pb-44">
          <div className="px-[x-pad] lg:px-0">
            <main>
              <Connect />
            </main>
          </div>
        </div>
        </div>

      </div>
  )
}

export default Home