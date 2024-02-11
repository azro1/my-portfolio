import { FaGoogle, FaFacebook } from 'react-icons/fa';

const SocialButtons = ({ text }) => {
  return (
    <>
      <button className='py-2.5 px-4 text-sm rounded-lg font-rubik text-secondary font-b block mb-3 bg-red-600 w-64 flex items-center justify-center'>
        <FaGoogle className="mr-2" size={24} />
        {text} with Google
      </button>
      <button className='py-2.5 px-4 text-sm rounded-lg font-rubik text-secondary font-b block bg-blue-600 w-64 flex items-center justify-center'>
        <FaFacebook className="mr-2" size={24} />
        {text} with Facebook
      </button>
    </>
  )
}

export default SocialButtons
