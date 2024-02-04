import Link from "next/link"

// components
import Card from "./Card"

const Hero = () => {
  return (
    <section>
      <div className="block text-center lg:flex flex-row-reverse items-center">
        <Card values={"flex-1 inline-block my-16"}>
          <img className="w-full" src="https://via.placeholder.com/544x586" alt="placeholder" />
        </Card>
        <div className="flex-1 text-center">
          <h4 className="text-xl text-hint font-barlow">WEB DEVELOPER</h4>
          <h1 className="title font-b tracking-wide pt-5 mx-0 text-secondary">Hi, i'm Simon</h1>
          <p className="text-sm pt-4 px-4 pb-6 max-w-lg mx-auto leading-6">A full stack developer with 6+ years
            specializing in front and back end web 
            technologies and UI design</p>
          <Link href="#">
            <button className="btn bg-hint">DOWNLOAD CV</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
