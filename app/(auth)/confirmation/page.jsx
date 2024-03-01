import Link from "next/link"

const Confirmation = () => {
  return (
    <main className='mt-4.5 text-center'>
      <h2 className='pb-4 subheading font-b text-hint'>Success!</h2>
      <p className='text-base leading-8'>Your password reset has been successful and you can now <Link className="text-base text-hint" href="/login">Login</Link></p>
    </main>
  )
}

export default Confirmation