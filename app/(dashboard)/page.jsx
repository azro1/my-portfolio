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
    <main>
      <div className="flex flex-col mt-16 gap-y-6.25 mb-14 md:gap-y-10.25 sm:mb-6.25 lg:mb-36">
        <Hero />
        <Services />
        <Skills />
        <Suspense fallback={<Loading />}>
          <ProjectList />
        </Suspense>
        <Connect />
      </div>
    </main>
  )
}

export default Home