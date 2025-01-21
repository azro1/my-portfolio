// components
import Hero from "./Hero"
import Services from "./Services"
import Statement from "./Statement"
import Skills from "./Skills"
import ProjectList from "../projects/ProjectList"
import Connect from "./Connect"

const Home = ()=> {
  return (
    <div className="flex flex-col bg-nightSky">

      <div className="bg-nightSky pt-44 pb-32">
        <div className="main-container">
          <main>
            <Hero />
          </main>
        </div>
      </div>
      
      <div className=" relative">
        <div className="services-bg"></div>
        <div className="py-32"> 
          <div className="main-container uw:max-w-[1700px] uw:mx-auto">
              <main>
                <Services />
              </main>
          </div>
        </div>
      </div>

      <div className="bg-nightSky py-32">
        <div className="main-container uw:max-w-[1300px] uw:mx-auto ">
          <main>
            <Statement />
          </main>
        </div>
      </div>

      <div className="bg-nightSky pb-32">
        <div className="main-container">
          <main>
            <Skills />
          </main>
        </div>
      </div>

      <div className="bg-slateOnyx py-32">
       <main>
          <ProjectList />
       </main>
      </div>

      <div className="py-32">
        <div className="main-container">
          <main>
            <Connect />
          </main>
        </div>
      </div>



    </div>
  )
}

export default Home