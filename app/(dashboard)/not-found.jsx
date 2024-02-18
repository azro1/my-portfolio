import Link from "next/link"

const NotFound = () => {
  return (
    <main className="mt-12 text-center">
      <h2 className="pb-4 font-b subheading text-hint">Page Not Found</h2>
      <p className="leading-6">We could not find the page you we're looking for</p>
      <p>Go back to the <Link className="text-hint" href="/">Homepage</Link></p>
    </main>
  )
}

export default NotFound
