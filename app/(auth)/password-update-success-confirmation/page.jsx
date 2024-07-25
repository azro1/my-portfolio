import Link from "next/link"

const Confirmation = () => {
  return (
    <div className="flex flex-col items-center justify-center text-center h-auth-page-height">
      <h2 className='pb-3 text-3xl font-b text-accentRed'>Success!</h2>
      <p className='leading-7'>The reset has been successful and your password has been updated. </p>
      <p className='leading-7'>Go back to the <Link className='text-base text-accentRed' href='/'>Homepage</Link>.</p>
    </div>
  )
}

export default Confirmation