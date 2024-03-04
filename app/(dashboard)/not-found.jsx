import Link from "next/link"

const NotFound = () => {
  return (
    <main className="h-screen">
      <div className="my-4.5 text-center">
        <h2 className="pb-4 font-b subheading text-hint">Page Not Found</h2>
        <p className="text-base leading-8">We could not find the page you we're looking for.</p>
        <p className="text-base">Go back to the <Link className="text-base text-hint" href="/">Homepage</Link></p>
      </div>
    </main>
  )
}

export default NotFound
