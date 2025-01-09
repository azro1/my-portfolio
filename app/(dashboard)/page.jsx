// components
import Hero from "./Hero"
import Services from "./Services"
import Skills from "./Skills"
import ProjectList from "../projects/ProjectList"
import Connect from "./Connect"

const Home = ()=> {
  return (
    <div className="flex flex-col gap-y-56 md:gap-y-52">
      <Hero />
      <Services />
      <Skills />
      <ProjectList />
      <Connect />
    </div>
  )
}

export default Home