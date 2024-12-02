import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion"

// components
import SocialButtons from "./SocialButtons";

const AuthForm = ({ handleSubmit, onSubmit, title, subHeading, register, errors, isChecked, handleCheckbox, isSignup, isLoading }) => {
  return (
    <div>
      <div className='flex flex-col items-stretch justify-center gap-12 md:flex-row'>
        <div className='sm:shadow-outer sm:p-10 sm:rounded-xl '>
          <form className=" max-w-xs min-w-xs" onSubmit={handleSubmit(onSubmit)} noValidate
            as={motion.form}
            transition={{ type: 'spring', stiffness: 150, damping: 30 }}
          >
            <h2 className='text-3xl mb-4 font-eb text-saddleBrown'>{title}</h2>
            <p className='mb-4'>{subHeading}</p>

            <label className='max-w-min mb-2 text-base text-ashGray block' htmlFor="email">Email</label>
            <motion.input
              transition={{ type: 'spring', stiffness: 150, damping: 25 }}
              className={`w-full py-2.5 px-4 rounded-md text-stoneGray bg-softCharcoal border-[1px] ${errors.email ? 'border-red-700' : 'border-ashGray'}`}
              id="email"
              type="email"
              {...register('email')}
              placeholder='e.g., user@email.com'
              spellCheck={false}
            />

            <AnimatePresence>
              {errors.email && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ type: 'tween' }}
                  className="text-red-700 mt-2 text-sm">
                    {errors.email.message}
                </motion.p>
              )}
            </AnimatePresence>

            {isSignup && (
                <motion.div
                    layout
                    transition={{ type: 'spring', stiffness: 200, damping: 30 }}
                    className="mt-5 flex items-center"
                >
                    <input className="self-start mt-0.21 max-w-min transform scale-125" type="checkbox" value={isChecked} onChange={handleCheckbox} />
                    <span className="text-base block text-ashGray ml-2.5 -mt-1">By signing up I agree to the{' '}<Link className="text-saddleBrown text-base" href='#'>Privacy Policy</Link>{' '}and{' '}<Link className='text-saddleBrown text-base' href='#'>Terms of Service</Link></span>
                </motion.div>
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
                <Link className='ml-auto mt-2' href={'/forgot-email'}>
                  <span className='text-saddleBrown text-base'>Forgot email?</span>
                </Link>
               )}
            </div>
          </form>
        </div>


        <div className='flex-1 flex flex-col items-center md:col-start-2'>
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
