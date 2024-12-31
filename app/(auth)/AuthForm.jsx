import Link from "next/link";

// components
import SocialButtons from "./SocialButtons";

const AuthForm = ({ handleSubmit, onSubmit, title, subHeading, register, errors, isChecked, handleCheckbox, isSignup, isLoading }) => {
  return (
    <div>
      <div className='flex flex-col items-stretch justify-center gap-12 md:flex-row md:w-full'>
        <div className='sm:shadow-outer sm:p-10 sm:rounded-xl'>
          <form className="max-w-xs min-w-xs" onSubmit={handleSubmit(onSubmit)} noValidate
          >
            <h2 className='text-3xl mb-6 font-eb text-saddleBrown'>{title}</h2>
            <p className='mb-4'>{subHeading}</p>

            <label className='max-w-min mb-2 text-base text-ashGray block' htmlFor="email">Email</label>
            <input
              className={`w-full py-3 px-4 rounded-md text-ashGray bg-softCharcoal border-[1px] ${errors.email ? 'border-red-700' : 'border-ashGray'}`}
              id="email"
              type="email"
              {...register('email')}
              placeholder='e.g., user@email.com'
              spellCheck={false}
            />

            {errors.email && (<p className="text-red-700 mt-2 text-sm"> {errors.email.message}</p>)}

            {isSignup && (
                <div
                    className="mt-5 flex items-center"
                >
                    <input className="self-start mt-0.21 max-w-min transform scale-125" type="checkbox" value={isChecked} onChange={handleCheckbox} />
                    <span className="text-base block text-ashGray ml-2.5 -mt-1">By signing up I agree to the{' '}<Link className="text-saddleBrown text-base" href='#'>Privacy Policy</Link>{' '}and{' '}<Link className='text-saddleBrown text-base' href='#'>Terms of Service</Link></span>
                </div>
            )}

            <div className="mt-4 flex">
              <button className={`btn bg-saddleBrown ${isLoading ? 'opacity-65' : 'opacity-100'}`} disabled={isLoading}>
                {isLoading ? (
                  <div className='flex items-center gap-2'>
                    <img className="w-5 h-5 opacity-50" src="images/loading/spinner.svg" alt="Loading indicator" />
                    <span>{title}</span>
                  </div>
                ) : (
                  <span>{title}</span>
                )}
              </button>
              {!isSignup && (
                <Link className='ml-auto -mt-2' href={'/forgot-email'}>
                  <span className='text-saddleBrown text-base'>Forgot email?</span>
                </Link>
               )}
            </div>
          </form>
        </div>


        <div className='flex flex-col items-center '>
          <p className='mb-8'>{`or ${title} using`}</p>
          <SocialButtons text={title} />
          <div className="mt-7">
            <p className='mt-8 inline pr-2'>{`${isSignup ? 'Already have an account?' : "Don't have an account?" }`}</p>
            <Link className='text-saddleBrown text-base' href={`${isSignup ? '/login' : '/signup'}`}>{`${isSignup ? 'Login' : 'Sign up'}`}</Link>
          </div>
        </div>
      </div>

    </div>
  )
}

export default AuthForm
