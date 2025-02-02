import Link from "next/link"

const NotFound = () => {
    return (
        <div className="main-container">
          <main>
            <div className="w-full text-center flex flex-col items-center justify-center">
                <h2 className="mb-2 font-b mainheading text-saddleBrown">404</h2>
                <p className="text-lg">We could not find the page you were looking for.</p>
                <p className="text-lg">
                  Go back to <Link className="text-lg text-saddleBrown font-b" href="/auth/login">Login</Link>
                </p>
            </div>
          </main>
        </div>
    )
  }
  
  export default NotFound