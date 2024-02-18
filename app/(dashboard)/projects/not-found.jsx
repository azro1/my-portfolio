import Link from "next/link"

const NotFound = () => {
  return (
    <main className="mt-12 text-center">
      <h2 className="pb-4 font-b subheading text-hint">Oops! Nothing to See Here...</h2>
      <p>The project you we're looking for doesn't exist!</p>
      <p>Go back to the <Link className="text-hint leading-6" href="/">Homepage</Link></p>
    </main>
  )
}

export default NotFound