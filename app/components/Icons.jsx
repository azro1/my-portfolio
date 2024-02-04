import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Icons = ({ values }) => {
  return (
    <div className={values}>
      <FaLinkedin className='text-secondary' size={26} />
      <FaGithub className='text-secondary' size={26} />
      <FaInstagram className='text-secondary' size={26} />
      <FaWhatsapp className='text-secondary' size={26} />
    </div>
  )
}

export default Icons
