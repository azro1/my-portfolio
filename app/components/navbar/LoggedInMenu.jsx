import Link from "next/link"

const LoggedInMenu = ({handleLogout, handleCloseMenu }) => {
  return (
    <>
      <Link href='/profile'>
        <div className='flex items-center gap-3 p-2 px-3 group transition duration-300' onClick={handleCloseMenu}>
          <span className='text-ashGray group-hover:text-cloudGray transition duration-300 text-base'>Profile</span>
        </div>
      </Link>
      <Link href='/chat'>
        <div className='flex items-center gap-3 p-2 px-3 group transition duration-300' onClick={handleCloseMenu}>
          <span className='text-ashGray group-hover:text-cloudGray transition duration-300 text-base'>Chatroom</span>
        </div>
      </Link>
      <Link href='/help'>
          <div className='flex items-center gap-3 p-2 px-3 group transition duration-300' onClick={handleCloseMenu}>
            <span className='text-ashGray group-hover:text-cloudGray transition duration-300 text-base'>Help</span>
          </div>
      </Link>
      <div onClick={handleLogout}>
          <div className='flex items-center gap-3 p-2 px-3 group transition duration-300' onClick={handleCloseMenu}>
            <span className='text-ashGray group-hover:text-cloudGray transition duration-300 text-base'>Logout</span>
          </div>
      </div>
    </>
  )
}

export default LoggedInMenu
