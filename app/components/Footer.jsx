"use client"

import Link from "next/link"
import { FiLinkedin, FiGithub, FiInstagram, FiYoutube } from 'react-icons/fi';
import Logo from "./Logo";
import { usePathname } from "next/navigation";

const Footer = ({ showAuthFooter }) => {
  const pathname = usePathname();

  const routes = [
    '/verify-signup-otp',
    '/verify-login-otp',
    '/verify-forgot-email-otp',
    '/upload-avatar',
    '/register-form',
    '/verify-email-otp',
    '/verify-phone-otp',
  ];

  const protectedRoutes = routes.some(route => pathname.includes(route));

  const socialLinks = (colorClass) => (
    <>
      <a
        className={`${colorClass} ${protectedRoutes ? 'pointer-events-none' : ''}`}
        href={protectedRoutes ? undefined : 'https://www.linkedin.com'}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FiLinkedin size={24} />
      </a>
      <a
        className={`${colorClass} ${protectedRoutes ? 'pointer-events-none' : ''}`}
        href={protectedRoutes ? undefined : 'https://github.com'}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FiGithub size={24} />
      </a>
      <a
        className={`${colorClass} ${protectedRoutes ? 'pointer-events-none' : ''}`}
        href={protectedRoutes ? undefined : 'https://www.youtube.com'}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FiYoutube size={24} />
      </a>
      <a
        className={`${colorClass} ${protectedRoutes ? 'pointer-events-none' : ''}`}
        href={protectedRoutes ? undefined : 'https://www.instagram.com'}
        target="_blank"
        rel="noopener noreferrer"
      >
        <FiInstagram size={24} />
      </a>
    </>
  );


  if (!showAuthFooter) {
    return (
      <footer className="min-h-[300px] w-full flex items-start xl:min-h-[170px] bg-slateOnyx">
        <div className="flex-1 p-10 mx-auto max-w-screen-lg md:p-0">
          <main className="flex-grow flex flex-col">
            <div className="flex flex-col items-center justify-start gap-2 mt-4 mb-20 md:p-4 md:flex-row md:items-start md:justify-between md:m-0 lg:px-0">
              <div className="flex flex-col gap-2 md:gap-2">
                <div className="flex flex-col items-center gap-2 md:flex-row">
                  <Link href='/'><Logo size={36} /></Link>
                  <p className="text-stoneGray">&copy; 2025 Simon Sutherland</p>
                </div>
                <div className="flex justify-center gap-4">
                  {socialLinks("text-stoneGray")}
                </div>
              </div>
              <div className="flex flex-col items-center justify-start">
                <Link href="#"><p className="text-sm text-stoneGray">Terms of Use</p></Link>
                <Link href="#"><p className="text-sm text-stoneGray">Privacy Policy</p></Link>
              </div>
            </div>
          </main>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full flex min-h-[96px] bg-slateOnyx">
      <div className="flex-1 flex p-10 max-w-screen-xl mx-auto md:p-0">
        <main className="flex-grow flex flex-col">
          <div className="flex-grow flex flex-col items-center justify-center gap-2 mb-10 md:p-4 md:flex-row md:items-center md:justify-between md:m-0 lg:px-0">
            <div className="flex flex-col items-center gap-2 md:flex-row">
              {protectedRoutes ? (
                <div className="pointer-events-none">
                  <Logo size={36} />
                </div>
              ) : (
                <Link href="/">
                  <div className="cursor-pointer">
                    <Logo size={36} />
                  </div>
                </Link>
              )}
              <p className="text-stoneGray">&copy; 2025 Simon Sutherland</p>
            </div>
            <div className="flex items-center justify-center gap-4 md:order-2">
              {socialLinks("text-stoneGray")}
            </div>
          </div>
        </main>
      </div>
    </footer>
  );
};

export default Footer;

