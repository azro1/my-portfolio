import Link from "next/link"

const NotFound = () => {
  return (
    <main>
      <div className="flex flex-col items-center justify-center text-center h-[50vh]">
        <h2 className="pb-4 font-b text-3xl text-saddleBrown">Page Not Found</h2>
        <p className="leading-7">We could not find the page you we're looking for. </p>
        <p className="leading-7">Go back to the <Link className="text-base text-saddleBrown" href="/">Homepage</Link></p>
      </div>
    </main>
  )
}

export default NotFound
