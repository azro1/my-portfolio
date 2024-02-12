import Link from "next/link"

const NotFound = () => {
  return (
    <main className="p-24 text-center">
      <h2 className="pb-4 font-b title text-hint">Page Not Found</h2>
      <p>We could not find the page you we're looking for</p>
      <p>Go back to the <Link className="text-hint leading-7" href="/">Homepage</Link></p>
    </main>
  )
}

export default NotFound
