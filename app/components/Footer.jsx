"use client"

import Link from "next/link"
import Image from "next/image";
import { FiLinkedin, FiGithub, FiInstagram, FiYoutube } from 'react-icons/fi';


const Footer = () => {

  return (
    <footer className="min-h-[300px] w-full flex items-start xl:min-h-[170px] bg-slateOnyx">



        <div className="p-10 mx-auto max-w-screen-lg md:p-0 flex-1">
          <main>
              <div className="flex flex-col items-center justify-start gap-2 mt-4 mb-20 md:p-4 md:flex-row md:items-start md:justify-between md:m-0 lg:px-0">

                <div className="flex flex-col gap-2 md:gap-2">
                  <div className="flex flex-col items-center gap-1 md:flex-row md:items-end md:gap-3">
                    <div className="shadow-sm shadow-black rounded-full relative w-[34px] max-w-[34px] h-[30px]">
                      <Link href='/'>
                        <Image
                          className='cursor-pointer w-max'
                          src={'/images/logo.svg'}
                          alt="Navigate to home page"
                          width={34}
                          height={30}
                          priority
                          quality={100}
                        />
                      </Link>
                    </div>
                    <p className="text-stoneGray" >&copy; 2025 Simon Sutherland</p>
                  </div>
                  <div className="flex justify-center gap-4">
                      <a className="text-stoneGray" href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" >
                        <FiLinkedin size={24} />
                      </a>
                      <a className="text-stoneGray" href="https://github.com" target="_blank" rel="noopener noreferrer" >
                        <FiGithub size={24} />
                      </a>
                      <a className="text-stoneGray" href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" >
                        <FiYoutube size={24} />
                      </a>
                      <a className="text-stoneGray" href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" >
                        <FiInstagram size={24} />
                      </a>
                  </div>
                </div>









                <div className="flex flex-col items-center justify-start">
                  <Link href="#">
                    <p className="text-sm text-stoneGray">Terms of Use</p>
                  </Link>
                  <Link href="#">
                    <p className="text-sm text-stoneGray">Privacy Policy</p>
                  </Link>
                </div>

              </div>


          </main>

        </div>
    </footer>
  )
}

export default Footer
