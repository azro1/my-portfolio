import { FaSignOutAlt } from 'react-icons/fa';

const LogoutButton = ({ handleLogout }) => {
  return (
    <div onClick={handleLogout} className="hidden lg:block tooltip group">
      <FaSignOutAlt className="group-hover:text-hint transition duration-300 text-secondary cursor-pointer" size={31} />
      <span className="tooltiptext -left-4">Logout</span>
    </div>
  )
}

export default LogoutButton
