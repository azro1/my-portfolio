import Link from "next/link";

// components
import Button from "../components/Button";
import SocialButtons from "./SocialButtons";

const AuthForm = ({ handleSubmit, onSubmit, title, register, errors, isChecked, handleCheckbox, isSignup, isLoading }) => {
  return (
    <div className='main-container flex flex-col justify-center items-center gap-5 md:gap-10 w-full md:flex-row text-center '>

      <div className='flex-1 w-full max-w-xs sm:max-w-sm sm:bg-white sm:shadow-outer sm:p-10 sm:rounded-xl '>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          <h2 className='text-3xl mb-3 font-b text-nightSky'>{title}</h2>

          <label className='max-w-min mb-2 text-base text-ashGray block' htmlFor="email">Email</label>
          <input
            className={`w-full py-2.5 px-4 rounded-md text-nightSky border-[1px] ${errors.email ? 'border-red-600' : 'border-gray-300'}`}
            id="email"
            type="email"
            {...register('email')}
            placeholder='user@email.com'
            spellCheck={false}
          />
          
          {errors.email && (<p className="text-left text-red-600 mt-1 text-sm"> {errors.email.message}</p>)}


          {isSignup && (
              <div className="mt-5 flex items-center text-left">
                  <input className="self-start max-w-min transform scale-125" type="checkbox" value={isChecked} onChange={handleCheckbox} />
                  <span className="text-base block text-ashGray ml-2.5 -mt-1.5">By signing up I agree to the{' '}<Link className="text-nightSky underline" href='#'>privacy policy</Link>{' '}and{' '}<Link className='text-nightSky underline' href='#'>terms of service</Link></span>
              </div>
          )}

          <div className="mt-4 flex flex-col">
            <Button
              isLoading={isLoading}
              padding='p-3'
              width='w-full'
              backgroundColor='bg-nightSky'
              text={title}
            />

            {!isSignup && (
              <Link className='mt-1.5 ml-auto' href={'/forgot-email'}>
                <span className='text-nightSky text-base'>Forgot email?</span>
              </Link>
            )}
          </div>
        </form>
      </div>

      <div className='flex-1 flex flex-col w-full max-w-xs'>
        <p className='mb-6'>Or</p>
        <SocialButtons text={title} />
        <div className="mt-7">
          <p className='mt-8 inline pr-2'>{`${isSignup ? 'Already have an account?' : "Don't have an account?" }`}</p>
          <Link className='text-nightSky text-base' href={`${isSignup ? '/login' : '/signup'}`}>{`${isSignup ? 'Login' : 'Sign up'}`}</Link>
        </div>
      </div>
      
    </div>
  )
}

export default AuthForm
