import Link from "next/link";

// components
import SocialButtons from "./SocialButtons";

const AuthForm = ({ handleSubmit, onSubmit, title, subHeading, register, errors, isChecked, handleCheckbox, isSignup, isLoading }) => {
  return (
    <div className='main-container w-full flex flex-col items-center justify-center gap-12 md:flex-row sm:w-max'>
      <div className='w-full sm:bg-white sm:shadow-outer sm:p-12 sm:pt-10 sm:rounded-xl'>
        <form className="sm:max-w-xs sm:min-w-xs" onSubmit={handleSubmit(onSubmit)} noValidate
        >
          <h2 className='text-3xl mb-5 font-b text-nightSky'>{title}</h2>
          <p className='mb-4'>{subHeading}</p>

          <label className='max-w-min mb-2 text-base text-ashGray block' htmlFor="email">Email</label>
          <input
            className={`w-full py-2 px-4 rounded-md text-nightSky border-[1px] ${errors.email ? 'border-red-600' : 'border-gray-300'}`}
            id="email"
            type="email"
            {...register('email')}
            placeholder='user@email.com'
            spellCheck={false}
          />
          
          {errors.email && (<p className="text-red-600 mt-1 text-sm"> {errors.email.message}</p>)}


          {isSignup && (
              <div className="mt-5 flex items-center">
                  <input className="self-start max-w-min transform scale-125" type="checkbox" value={isChecked} onChange={handleCheckbox} />
                  <span className="text-base block text-ashGray ml-2.5 -mt-1">By signing up I agree to the{' '}<Link className="text-nightSky underline" href='#'>privacy policy</Link>{' '}and{' '}<Link className='text-nightSky underline' href='#'>terms of service</Link></span>
              </div>
          )}



          <div className="mt-4 flex flex-col">
            <button className={`btn ${isLoading ? 'opacity-65' : 'opacity-100'} w-full block`} disabled={isLoading}>
              {isLoading ? (
                <div className='flex items-center justify-center gap-2'>
                  <img className="w-6 h-6 opacity-65" src="../images/loading/reload.svg" alt="Loading indicator" />
                </div>
              ) : (
                <span>Send code</span>
              )}
            </button>

            {!isSignup && (
                <Link className='mt-1 ml-auto' href={'/auth/forgot-email'}>
                    <span className='text-nightSky text-base'>Forgot email?</span>
                </Link>
            )}
          </div>
        </form>
      </div>


      <div className='flex flex-col items-center '>
        <p className='mb-8'>Or</p>
        <SocialButtons text={title} />
        <div className="mt-7">
          <p className='mt-8 inline pr-2'>{`${isSignup ? 'Already have an account?' : "Don't have an account?" }`}</p>
          <Link className='text-nightSky text-base' href={`${isSignup ? '/auth/login' : '/auth/signup'}`}>{`${isSignup ? 'Login' : 'Sign up'}`}</Link>
        </div>
      </div>
    </div>
  )
}

export default AuthForm
