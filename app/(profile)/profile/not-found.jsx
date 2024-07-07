import Link from "next/link"

const NotFound = () => {
  return (
    <main className="">
      <div className="flex flex-col items-center justify-center text-center min-h-custom-md">
        <h2 className="pb-4 font-b subheading text-hint">This page isn't here.</h2>
        <p className="text-base">Go back to your <Link className="text-base text-hint" href="/profile">Dashboard</Link></p>
      </div>
    </main>
  )
}

export default NotFound