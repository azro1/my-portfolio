import Link from "next/link"

// components
import Chevron from "../Chevron";

const Navbar = ({ user }) => {

  return (
    <main>
      <nav className='flex items-center h-9.5 relative'>
        <Link href='/' className='shadow-3xl pt-1.5 px-4 pb-0.5 rounded-xl bg-shade mr-auto'>
          <h2 className='logo font-eb text-hint'>
            Port<span>folio</span>
          </h2>
        </Link>

        <Chevron order={'order-1'} user={user} />
          
          {user && (
            <p className="font-b text-base text-hint absolute left-0 top-36 md:static mr-8">Hello, <span className="text-secondary">{user.user_metadata.first_name}</span></p>
          )}   
      </nav>
    </main>
  );
}

export default Navbar
