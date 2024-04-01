import Link from "next/link"

// components
import Icons from "../../components/Icons"
import SocialButtons from "../SocialButtons";


const Signup = () => {

    return (
      <main className='mb-14 mt-12 md:mb-4.5'>
        <div className='max-w-screen-lg mx-auto grid gap-12 md:gap-y-20 md:grid-cols-2'>


          <div className='flex flex-col md:place-self-center items-center row-start-2 md:col-start-1 md:row-start-1'>
            <h2 className='mb-7 text-1.75xl font-rubik font-eb text-secondary'>Sign up</h2>
            <SocialButtons text={"Continue"} />
            <span className='block text-secondary text-base mt-8'>
              Have an account?{' '}
              <Link className='text-base text-hint' href='/login'>
                Login
              </Link>
            </span>
          </div>

          <div className="row-start-1 max-w-sm justify-self-center md:place-self-start md:col-start-2 md:w-full ">
            <h2 className="text-1.75xl font-rubik font-eb text-secondary leading-normal mb-5">
              Unlock <span className='text-hint'>CodeDynamic's</span> Creative
              Vault!
            </h2>
            <span className="block text-secondary text-sm font-os text-justify leading-6 mb-4">
              Uncover the secrets behind my web development and graphic design
              projects by signing up for exclusive content:
            </span>
            <span className="block text-secondary text-sm font-os text-justify leading-6 mb-4">
              🚀 Creative Process Unveiled: Get an inside look at the making of
              each project, from concept to completion.
            </span>
            <span className="block text-secondary text-sm font-os text-justify leading-6 mb-4">
              📬 Be the First to Know: Receive notifications on new projects and
              stay in the loop with the latest news and updates.
            </span>
            <span className="block text-secondary text-sm font-os text-justify leading-6">
              Ready to dive in? Join now to elevate your understanding of design
              and development with CodeDynamics!
            </span>
          </div>
          <Icons values={"flex gap-x-5 place-content-center md:col-start-2 md:place-content-end md:items-end"} color={"#757575"} />
        </div>
      </main>
    );
  }

  
  export default Signup