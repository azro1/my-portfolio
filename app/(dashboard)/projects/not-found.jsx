import Link from "next/link"

const NotFound = () => {
  return (
    <main>
      <div className="flex flex-col items-center justify-center text-center bg-softCharcoal h-projects-page-height">
        <h2 className="pb-4 font-b text-3xl text-deepOlive">Oops! Nothing to See Here...</h2>
        <p className="leading-7 text-base">The project you we're looking for doesn't exist. </p>
        <p className="leading-7 text-base">Go back to the <Link className="text-base text-deepOlive" href="/">Homepage</Link>.</p>
      </div>
    </main>
  )
}

export default NotFound