import Link from "next/link";
import { FiCheck } from "react-icons/fi";

// components
import Button from "../components/Button";
import SocialButtons from "./SocialButtons";
import Heading from "../components/Heading";

const AuthForm = ({ handleSubmit, onSubmit, title, register, errors, isChecked, handleCheckbox, isSignup, isLoading }) => {
  return (
    <div className='main-container min-h-[768px] flex flex-col justify-center items-center gap-5 pt-20 md:min-h-0 md:gap-10 w-full text-center md:pt-0 md:flex-row'>

      <div className='w-full max-w-xs md:max-w-sm md:bg-white md:shadow-outer md:p-10 md:rounded-xl'>
        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          <Heading className='mb-2 font-semibold text-nightSky text-[26px] md:text-[28px]'>
              {title}
          </Heading>

          <label className='max-w-min mb-2 text-base text-ashGray block' htmlFor="email">Email</label>
          <input
            className={`w-full py-2.5 px-4 rounded-md border-[1px] ${errors.email ? 'border-red-600' : 'border-gray-300'}`}
            id="email"
            type="email"
            {...register('email')}
            placeholder='user@email.com'
            spellCheck={false}
          />
          
          {errors.email && (<p className="form-error mt-1 text-left"> {errors.email.message}</p>)}

          {isSignup && (
              <div className="mt-5 flex items-start text-left">
                  <label className="relative">
                    <input className="max-w-min transform scale-125 opacity-0 peer" type="checkbox" value={isChecked} onChange={handleCheckbox} />
                    <span className="absolute left-0 top-0 w-[17px] h-[17px] border-[1px] border-[rgba(160,165,170,0.9)] flex items-center justify-center rounded cursor-pointer peer-checked:border-none peer-checked:bg-goldenOchre">
                       <FiCheck size={15} className={`${isChecked ? 'text-white' : 'text-transparent'}`} />
                    </span>
                  </label>

                  <span className="text-base block text-ashGray ml-2.5 -mt-1">By signing up I agree to the{' '}<Link className="text-nightSky" href='#'>privacy policy</Link>{' '}and{' '}<Link className='text-nightSky' href='#'>terms of service</Link></span>
              </div>
          )}

          <div className="mt-4 flex flex-col">
            <Button
              isLoading={isLoading}
              className='w-full p-[11px] bg-goldenOchre'
              text={title}
            />

            {!isSignup && (
              <Link className='mt-2 ml-auto' href={'/forgot-email'}>
                <span className='text-nightSky text-base'>Forgot email?</span>
              </Link>
            )}
          </div>
        </form>
      </div>

      <div className='flex flex-col w-full max-w-xs'>

        <div className='flex-1 flex items-center gap-3 mb-6'>
          <span className='w-full h-[1px] bottom-10 bg-ashGray opacity-30'></span>
          <p className=''>or</p>
          <span className='w-full h-[1px] bg-ashGray opacity-30'></span>
        </div>

        <SocialButtons text={title} />
        <div className="mt-7">
          <p className='mt-8  inline pr-2'>{`${isSignup ? 'Already have an account?' : "Don't have an account?" }`}</p>
          <Link className='text-nightSky text-base' href={`${isSignup ? '/login' : '/signup'}`}>{`${isSignup ? 'Login' : 'Sign up'}`}</Link>
        </div>
      </div>
      
    </div>
  )
}

export default AuthForm
