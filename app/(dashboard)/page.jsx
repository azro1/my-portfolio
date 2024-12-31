import { Suspense } from "react"

// components
import Hero from "./Hero"
import Services from "./Services"
import Skills from "./Skills"
import ProjectList from "./projects/ProjectList"
import Connect from "./Connect"
import Loading from "../components/Loading"

const Home = ()=> {
  return (
    <div className="flex flex-col gap-y-56 md:gap-y-52">
      <Hero />
      <Services />
      <Skills />
      <Suspense fallback={<Loading />}>
        <ProjectList />
      </Suspense>
      <Connect />
    </div>
  )
}

export default Home