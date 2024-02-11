import Link from "next/link"
import { HiMiniEnvelopeOpen } from "react-icons/hi2";
import { FaPhoneAlt, FaLinkedin } from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { IoLogoYoutube, IoLogoWhatsapp } from "react-icons/io";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t-8 border-hint p-3">
       <main className="my-4.1875">
          <div className="flex flex-col items-center text-center newsletter gap-y-6 ">
            <h4>Get News, Insights & Updates</h4>
            <p className="max-w-2xl">Sign up to my newsletter to recieve the latest industry insights, information on upcoming events and updates on new projects</p>
            <form className="block sm:flex ">
              <div className="relative sm:pr-2 mb-3 sm:m-0">
                <HiMiniEnvelopeOpen className="absolute top-2 left-4" size={28} />
                 <input className="p-2 w-80 pl-14 pr-5 rounded-lg text-left border-2 border-primary" type="text" placeholder="Enter you email address" />
              </div>
              <Link className="group" href="#">
                <button className="p-3 text-sm rounded-lg font-os font-eb text-secondary bg-primary">SIGN ME UP</button>
              </Link>
            </form>
          </div>

          <div className="pagelinks flex flex-col text-center place-items-center gap-y-10 md:flex md:flex-row md:place-items-stretch md:text-left  gap-x-6 my-16">
            <div className="flex-1 md:flex-initial md:w-1/6 ">
              <h4>PAGE LINKS</h4>
              <div>
                <Link href="/about"><p>About</p></Link>
                <Link href="/contact"><p>Contact</p></Link>
                <Link href="/login"><p>Login</p></Link>
                <Link href="/signup"><p>Signup</p></Link>
                <Link href="/help"><p>Help</p></Link>
              </div>
            </div>
            <div className="flex-1 ">
              <h4>ACCESSIBILTY</h4>
              <div>
                <Link href="#">
                  <p>Accessibility Statement</p>
                </Link>
                <Link href="#">
                  <p>Accessibility & Inclusivity</p>
                </Link>
                <Link href="#">
                  <p>Our Accessibility Commitment</p>
                </Link>
              </div>
            </div>
            <div className="flex-1 ">
              <h4>COMPLIANCE</h4>
              <div>
                <Link href="#">
                  <p>Compliance Standards</p>
                </Link>
                <Link href="#">
                  <p>Regulatory Compliance</p>
                </Link>
                <Link href="#">
                  <p>Our Commitment to Standards</p>
                </Link>
              </div>
            </div>
            <div className="">
              <h4>GET IN TOUCH</h4>
              <div className="">
                <FaPhoneAlt className="inline-block" />
                <p className="inline-block pl-2">07455132994</p>
              </div>
              <div>
                <MdEmail className="inline-block" />
                <p className="inline-block pl-2">simon.789@hotmail.co.uk</p>
              </div>
              <div>
                <FaLocationDot className="inline-block" />
                <p className="inline-block pl-2 whitespace-normal">New Southgate, London N11 2RG</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col-reverse items-center text-center gap-y-10 md:h-9.5 md:flex-row md:justify-between md:text-left ">
            <div className="">
              <Link href="/">
                <h2 className="logo font-eb text-hint pb-3">Port<span>folio</span></h2>
              </Link>
              <p className="text-xs">&copy; 2024 Simon Sutherland. All rights reserved.</p>
            </div>
            <div className="self-center md:self-end flex items-center">
              <Link href="#">
                <p className="text-xs pt-1 pr-2">Terms of Use</p>
              </Link>
              <span>|</span>
              <Link href="#">
                <p className="text-xs pt-1 pl-2">Privacy Policy</p>
              </Link>
            </div>
            <div className="">
              <div>
                <h4>FOLLOW ME ON SOCIAL MEDIA</h4>
              </div>
              <div className="flex gap-x-5 justify-center pt-3">
                <FaLinkedin size={26} />
                <IoLogoYoutube size={26} />
                <IoLogoWhatsapp size={26} />
              </div>
            </div>
          </div>
        </main>
    </footer>
  )
}

export default Footer
