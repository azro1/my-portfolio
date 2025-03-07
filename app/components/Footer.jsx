import Link from "next/link"
import Image from "next/image";
import { FiLinkedin, FiGithub, FiInstagram, FiYoutube } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className="min-h-[300px] w-full flex items-start xl:min-h-[170px] bg-slateOnyx">



        <div className="px-1.625 mx-auto max-w-screen-lg uw:p-0 flex-1">
          <main>
              <div className="flex flex-col items-center justify-start gap-2 mt-4 mb-20 md:py-4 md:flex-row md:items-start md:justify-between md:m-0">

                <div className="flex flex-col gap-2 md:gap-2">
                  <div className="flex flex-col items-center gap-1 md:flex-row md:gap-3">
                    <div className="shadow-sm shadow-black rounded-full relative w-[40px] max-w-[40px] h-[40px]">
                      <Link href='/'>
                        <Image
                          className='cursor-pointer w-max'
                          src={'/images/my_logo.svg'}
                          alt="Navigate to home page"
                          width={40}
                          height={40}
                          priority
                          quality={100}
                        />
                      </Link>
                    </div>
                    <p className="text-ashGray">&copy; 2025 Simon Sutherland</p>
                  </div>
                  <div className="flex justify-center gap-4">
                      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                        <FiLinkedin size={24} />
                      </a>
                      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
                        <FiGithub size={24} />
                      </a>
                      <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer">
                        <FiYoutube size={24} />
                      </a>
                      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FiInstagram size={24} />
                      </a>
                  </div>
                </div>









                <div className="flex flex-col items-center justify-start">
                  <Link href="#">
                    <p className="text-sm text-ashGray">Terms of Use</p>
                  </Link>
                  <Link href="#">
                    <p className="text-sm text-ashGray">Privacy Policy</p>
                  </Link>
                </div>

              </div>


          </main>

        </div>
    </footer>
  )
}

export default Footer
