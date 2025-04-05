import Link from "next/link"

const NotFound = () => {
    return (
      <div className="bg-nightSky">
        <div className="main-container">
          <main>
            <div className="h-screen w-full text-center flex flex-col items-center justify-center">
                <h2 className="mb-2 font-b mainheading text-chocolate">404</h2>
                <p className="text-lg">Sorry, that project doesn&apos;t exist..</p>
                <p className="text-lg">Go back to the <Link className="text-chocolate text-lg" href="/">Homepage</Link></p>
            </div>
          </main>
        </div>
      </div>
    )
  }
  
  export default NotFound