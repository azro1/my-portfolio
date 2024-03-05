import { Suspense } from "react"


// components
import Hero from "../components/Hero"
import Services from "../components/Services"
import Skills from "../components/Skills"
import ProjectList from "./projects/ProjectList"
import Connect from "../components/Connect"
import Loading from "./loading"

const Home = ()=> {
  return (
    <main>
      <Hero />
      <Services />
      <div className="flex flex-col mt-6.25 gap-y-6.25 mb-14 sm:mb-6.25 lg:gap-y-40 lg:mt-8.375 lg:mb-36">
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