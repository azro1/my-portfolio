import Link from "next/link"

const Confirmation = () => {
  return (
    <main className='mb-4.5'>
      <div className="flex flex-col items-center justify-center text-center min-h-custom-md">
        <h2 className='pb-4 subheading font-b text-hint'>Success!</h2>
        <p className='leading-6 pb-1'>The reset has been successful and your password has been updated. </p>
        <p className=''>Go back to the <Link className=" text-hint" href="/">Homepage</Link></p>
      </div>
    </main>
  )
}

export default Confirmation