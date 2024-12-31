import Link from "next/link"

const NotFound = () => {
  return (
    <main className="pt-20">
      <div className="relative w-full flex items-center justify-center">
      <div className="text-center">
        <h2 className="pb-4 font-b text-3xl text-saddleBrown">Are you lost?</h2>
        <p className="leading-7 text-base">The project you we're looking for doesn't exist. </p>
        <p className="leading-7 text-base">Go back to the <Link className="text-base text-saddleBrown" href="/">Homepage</Link></p>
        </div>
      </div>
    </main>
  )
}


export default NotFound