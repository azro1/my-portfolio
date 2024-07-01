import Link from "next/link"

// components
import Card from "../components/Card"

const Hero = () => {
  return (
    <section>
      <div className="block text-center lg:flex flex-row-reverse gap-16 items-center">
        <Card values={"flex-1 inline-block p-3 rounded-md"}>
          <img className="w-full" src="https://via.placeholder.com/544x586" alt="Simon Sutherland, Web Developer and Designer" />
        </Card>
        <div className="flex-1 text-center mt-16 lg:mt-0">
          <h4 className="text-xl text-hint font-barlow">WEB DEVELOPER</h4>
          <h1 className="mainheading font-b tracking-wider pt-5 mx-0 text-secondary">Hi, i'm Simon</h1>
          <p className="text-sm pt-4 pb-6 max-w-lg mx-auto leading-6">A full stack developer with 6+ years
            specializing in front and back end web 
            technologies and UI design</p>
          <Link className="group" href="#">
            <button className="btn bg-hint hover:filter hover:brightness-75 duration-300">DOWNLOAD CV</button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default Hero
