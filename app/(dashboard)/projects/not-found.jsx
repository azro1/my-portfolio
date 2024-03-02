import Link from "next/link"

const NotFound = () => {
  return (
    <main className="mt-4.5 text-center">
      <h2 className="pb-4 font-b subheading text-hint">Oops! Nothing to See Here...</h2>
      <p className="text-base leading-8">The project you we're looking for doesn't exist.</p>
      <p className="text-base">Go back to the <Link className="text-base text-hint" href="/">Homepage</Link></p>
    </main>
  )
}

export default NotFound