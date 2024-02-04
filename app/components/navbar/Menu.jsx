import Link from "next/link"
import { FaAngleRight } from "react-icons/fa";

const Menu = ({ isOpen }) => {

  return (
    <>
      {isOpen && (
      <nav className="menu-links lg:hidden flex flex-col">
        <div className="flex items-center pr-5 ">
          <Link href="/about">About</Link>
          <FaAngleRight size={20} className="text-secondary"/>
        </div>
        <div className="flex items-center pr-5">
          <Link href="/contact">Contact</Link>
          <FaAngleRight size={20} className="text-secondary"/>
        </div>
        <div className="flex items-center pr-5">
          <Link href="/login">Login</Link>
          <FaAngleRight size={20} className="text-secondary"/>
        </div>
        <div className="flex items-center pr-5">
          <Link href="signup">Sign up</Link>
          <FaAngleRight size={20} className="text-secondary"/>
        </div>
      </nav>
      )}
    </>
  )
}


export default Menu
