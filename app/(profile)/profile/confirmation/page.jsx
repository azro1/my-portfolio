import Link from "next/link"

const Confirmation = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-profile-page-height flex-1">
      <h2 className='pb-4 text-3xl font-b text-accentRed'>Success!</h2>
      <p className='leading-7'>Your password has been updated. Go back to your <Link className="text-base text-accentRed" href="/profile">Dashboard</Link>.</p>
    </div>
  )
}

export default Confirmation