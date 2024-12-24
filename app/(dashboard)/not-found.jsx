import Link from "next/link"

const NotFound = () => {
  return (
    <main className="pt-20">
      <div className="relative w-full flex items-center justify-center">
        <div className="text-center">
          <h2 className="pb-4 font-b text-3xl text-saddleBrown">Page Not Found</h2>
          <p className="leading-7">We could not find the page you were looking for.</p>
          <p className="leading-7">
            Go back to the <Link className="text-base text-saddleBrown" href="/">Homepage</Link>
          </p>
        </div>
      </div>
    </main>
  )
}

export default NotFound
