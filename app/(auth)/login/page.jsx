import Link from "next/link";

// components
import SocialButtons from "../SocialButtons";

const Login = () => {
  return (
    <main className='mb-14 mt-10 md:mb-4.5 '>
      <div className="flex flex-col items-center mx-auto">

          <h2 className='mb-7 text-1.75xl font-rubik font-eb text-secondary'>Login</h2>
          <SocialButtons text={"Login"} />
          <p className='text-sm mt-8'>
            Don't have an account?{' '}
            <Link className='text-sm text-hint' href='/signup'>
              Sign Up
            </Link>
          </p>

      </div>
    </main>
    
  );
};

export default Login;
