import Link from "next/link"

const NotFound = () => {
  return (
    <main>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full text-center">
        <h2 className="pb-4 font-b text-3xl text-saddleBrown">Oops! Nothing to See Here...</h2>
        <p className="leading-7 text-base">The project you we're looking for doesn't exist. </p>
        <p className="leading-7 text-base">Go back to the <Link className="text-base text-saddleBrown" href="/">Homepage</Link></p>
      </div>
    </main>
  )
}

export default NotFound