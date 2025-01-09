import Link from "next/link"

const NotFound = () => {
    return (
      <div className="bg-softGray">
        <div className="main-container">
          <main>
            <div className="h-screen w-full text-center flex flex-col items-center justify-center">
                <h2 className="mb-2 font-b text-3xl text-saddleBrown">Page Not Found</h2>
                <p className="leading-7">We could not find the page you were looking for.</p>
                <p className="leading-7">
                  Go back to the <Link className="text-base text-saddleBrown" href="/">Homepage</Link>
                </p>
            </div>
          </main>
        </div>
      </div>
    )
  }
  
  export default NotFound