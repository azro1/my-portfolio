import Link from "next/link"
import NavbarAvatar from "./NavbarAvatar";

// components
import Chevron from "../Chevron";
import Card from "../Card";

const Navbar = ({ user }) => {

  return (
    <main>
      <div className='relative'>
        <nav className={`grid grid-cols-[minmax(200px,_1fr)_minmax(40px,_40px)] ${user ? 'grid-rows-[minmax(152px,_auto)_minmax(90px,_90px)]' : 'grid-rows-[minmax(152px,_auto)]'} md:grid-cols-[minmax(200px,_1fr)_minmax(70px,_70px)_minmax(40px,_40px)] md:grid-rows-[minmax(152px,_1fr)] md:gap-3`}>

          <Link className="col-start-1 row-start-1 justify-self-start place-self-center" href='/'>
            <Card values={'shadow-3xl pt-1.5 px-4 pb-0.5 rounded-xl bg-softCharcoal'}>
              <h2 className='mainheading font-eb text-saddleBrown'>
                Port<span className="text-stoneGray">folio</span>
              </h2>
            </Card>
          </Link>
          
          <div className='col-start-2 row-start-1 place-self-center md:col-start-3'>
            <Chevron user={user} />
          </div>

          {user && (
            <div className='col-start-1 row-start-2 justify-self-start place-self-center md:col-start-2 md:row-start-1 md:justify-self-center'>
              <NavbarAvatar className user={user} />
            </div>
          )}

        </nav>
      </div>

    </main>
  );
}

export default Navbar
