// components
import Hero from "./Hero"
import Services from "./Services"
import Statement from "./Statement"
import Skills from "./Skills"
import ProjectList from "./projects/ProjectList"
import Connect from "./Connect"

const Home = () => {
  return (
      <div className="flex flex-col pt-44">

        <div className="pb-16 md:pb-32">
          <div className="px-1.625 mx-auto max-w-screen-lg xl:p-0 uw:max-w-[1300px]">
            <main>
              <Hero />
            </main>
          </div>
        </div>

        <div className="py-16 md:py-32 bg-slateOnyx">
          <div className="px-1.625 mx-auto max-w-screen-lg xl:p-0 uw:max-w-[1700px]">
            <main>
              <Services />
            </main>
          </div>
        </div>

        <div className="py-16 md:py-32 bg-nightSky">
          <div className="px-1.625 mx-auto max-w-screen-lg xl:p-0 uw:max-w-[1300px]">
            <main>
              <Statement />
            </main>
          </div>
        </div>

        <div className="py-16 md:py-32 bg-nightSky">
          <div className="main-container">
            <main>
              <Skills />
            </main>
          </div>
        </div>

        <div className="py-16 px-1.625 bg-slateOnyx md:py-32 lg:px-0">
          <main>
            <ProjectList />
          </main>
        </div>

        <div className="py-16 md:py-32 bg-nightSky">
          <div className="px-1.625 lg:px-0">
            <main>
              <Connect />
            </main>
          </div>
        </div>
        
      </div>
  )
}

export default Home