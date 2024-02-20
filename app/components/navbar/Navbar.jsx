import Link from "next/link"
import {
  FaInfoCircle,
  FaUser,
  FaSignInAlt,
  FaUserPlus
} from 'react-icons/fa';


// components
import Chevron from "../Chevron";
import LogoutButton from "../LogoutButton";

const Navbar = ({ user }) => {

  return (
    <main>
      <nav className='flex items-center justify-between gap-12 h-9.5 relative'>
        <Link href='/' className='shadow-3xl pt-1.5 px-4 pb-0.5 rounded-xl bg-shade'>
          <h2 className='logo font-eb text-hint'>
            Port<span>folio</span>
          </h2>
        </Link>

        <Chevron order={'order-1'} user={user} />

          {!user && (
            <div className='hidden lg:flex lg:items-center gap-12'>
              <Link href="/about">
                <div className="tooltip group">
                    <FaInfoCircle className="group-hover:text-hint transition duration-300 text-secondary cursor-pointer" size={26} />
                  <span className="tooltiptext -left-3">About</span>
                </div>
              </Link>
              <Link href="/contact">
                <div className="tooltip group">
                  <FaUser className="group-hover:text-hint transition duration-300 text-secondary cursor-pointer" size={26} />
                  <span className="tooltiptext -left-5">Contact</span>
                </div>
              </Link>
              <Link href="/signup">
                <div className="tooltip group">
                  <FaSignInAlt className="group-hover:text-hint transition duration-300 text-secondary cursor-pointer" size={31} />
                  <span className="tooltiptext -left-2.5">Sign up</span>
                </div>
              </Link>
              <Link href="/login">
                <div className="tooltip group">
                  <FaUserPlus className="group-hover:text-hint transition duration-300 text-secondary cursor-pointer" size={33} />
                  <span className="tooltiptext -left-2.5">Login</span>
                </div>
              </Link>
            </div>
          )}
          
          {user && (
            <>

            <div className='hidden lg:flex lg:items-center gap-12 mr-auto'>
              <Link href="/about">
                <div className="tooltip group">
                    <FaInfoCircle className="group-hover:text-hint transition duration-300 text-secondary cursor-pointer" size={26} />
                  <span className="tooltiptext -left-3">About</span>
                </div>
              </Link>
              <Link href="/contact">
                <div className="tooltip group">
                  <FaUser className="group-hover:text-hint transition duration-300 text-secondary cursor-pointer" size={26} />
                  <span className="tooltiptext -left-5">Contact</span>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center gap-8">
              <p className="font-b text-base text-hint absolute left-0 top-36 md:static">Hello, <span className="text-secondary">{user.email}</span></p>
              <LogoutButton />
            </div>

            </>

          )}
          
      </nav>
    </main>
  );
}

export default Navbar
