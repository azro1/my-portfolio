import Image from "next/image"
import { Suspense } from "react"

// components
import Hero from "./components/Hero"
import Services from "./components/Services"
import Skills from "./components/Skills"
import ProjectList from "./projects/ProjectList"
import Connect from "./components/Connect"
import Loading from "./loading"

const Home = ()=> {
  return (
    <main>
      <Hero />
      <Services />
      <Skills />
      <Suspense fallback={<Loading />}>
        <ProjectList />
      </Suspense>
      <Connect />
    </main>
  )
}

export default Home