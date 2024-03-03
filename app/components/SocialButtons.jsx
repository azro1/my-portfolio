import { FaGoogle, FaGithub } from 'react-icons/fa';

const SocialButtons = ({ text }) => {
  return (
    <>
      <button className='py-2.5 px-4 text-sm rounded-lg font-rubik text-white font-b block mb-3 bg-red-600 border-2 w-64 flex items-center justify-center hover:filter hover:brightness-75 duration-300'>
        <FaGoogle className="mr-2" size={24} />
        {text} with Google
      </button>
      <button className='py-2.5 px-4 text-sm rounded-lg font-rubik text-white font-b block bg-shade border-2 w-64 flex items-center justify-center hover:filter hover:brightness-75 duration-300'>
        <FaGithub className="mr-2" size={24} />
        {text} with GitHub
      </button>
    </>
  )
}

export default SocialButtons
