import Link from "next/link"
import Avatar from "./Avatar";

// components
import Chevron from "../Chevron";
import Card from "../Card";

const Navbar = ({ user }) => {

  return (
    <main>
      <nav className={`flex items-center h-9.5 relative ${user && user.user_metadata.avatar_url || user && user.user_metadata.first_name  ? 'mb-36 md:mb-0' : 'mb-0'}`}>
        <Link className="mr-auto" href='/'>
          <Card values={'shadow-3xl pt-1.5 px-4 pb-0.5 rounded-xl bg-deepCharcoal'}>
            <h2 className='mainheading font-eb text-deepOlive'>
              Port<span className="text-stoneGray">folio</span>
            </h2>
          </Card>
        </Link>

        <Chevron order={'order-1'} user={user} />
        {user && <Avatar user={user} />}


      </nav>
    </main>
  );
}

export default Navbar
