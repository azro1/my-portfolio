import Link from "next/link"

const NotFound = () => {
  return (
    <main>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
          <h2 className="pb-4 font-b text-3xl text-saddleBrown">Page Not Found</h2>
          <p className="leading-7">We could not find the page you we're looking for. </p>
          <p className="leading-7">Go back to the <Link className="text-base text-saddleBrown" href="/">Homepage</Link></p>
        </div>
    </main>
  )
}

export default NotFound
