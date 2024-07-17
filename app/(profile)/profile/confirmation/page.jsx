import Link from "next/link"

const Confirmation = () => {
  return (
    <main className='mb-4.5'>
      <div className="flex flex-col items-center justify-center text-center min-h-custom-md">
        <h2 className='pb-4 text-3xl font-b text-hint'>Success!</h2>
        <p className='leading-7'>Your password has been updated. Go back to the <Link className="text-base text-hint" href="/">Homepage</Link></p>
      </div>
    </main>
  )
}

export default Confirmation