import Link from "next/link"

const NotFound = () => {
  return (
    <main className="mb-4.5">
      <div className="flex flex-col items-center justify-center text-center min-h-custom-md">
        <h2 className="pb-4 font-b subheading text-hint">Oops! Nothing to See Here...</h2>
        <p className="text-base leading-8">The project you we're looking for doesn't exist. </p>
        <p className="text-base leading-8">Go back to the <Link className="text-base text-hint" href="/">Homepage</Link></p>
      </div>
    </main>
  )
}

export default NotFound