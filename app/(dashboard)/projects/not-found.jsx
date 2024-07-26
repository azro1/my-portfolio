import Link from "next/link"

const NotFound = () => {
  return (
    <main>
      <div className="flex flex-col items-center justify-center text-center bg-softCharcoal h-projects-page-height">
        <h2 className="pb-4 font-b subheading text-accentRed">Oops! Nothing to See Here...</h2>
        <p className="text-base leading-8">The project you we're looking for doesn't exist. </p>
        <p className="text-base leading-8">Go back to the <Link className="text-base text-accentRed" href="/">Homepage</Link>.</p>
      </div>
    </main>
  )
}

export default NotFound