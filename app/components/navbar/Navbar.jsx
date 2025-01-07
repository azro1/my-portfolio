import Link from "next/link"
import NavbarAvatar from "./NavbarAvatar";

// components
import Chevron from "../Chevron";

const Navbar = ({ user }) => {

  return (
    <>
      {!user && (
        <div className="relative pt-10 w-full xl:hidden">
          <nav className='w-max ml-auto '>
            <Chevron user={user} />
          </nav>
        </div>)}



      {user && (
        <div className='relative h-9.5 mt-10'>
          <nav className='flex'>

            {user && (
              <div className='xl:ml-auto'>
                <NavbarAvatar className user={user} />
              </div>
            )}

            <div className='ml-auto col-start-2 row-start-1 place-self-center md:col-start-3 xl:hidden'>
              <Chevron user={user} />
            </div>

          </nav>
        </div>)}
    </>

  );
}

export default Navbar
