import { FaLinkedin, FaGithub, FaInstagram, FaWhatsapp } from 'react-icons/fa';

const Icons = ({ values, color}) => {
  return (
    <div className={values}>
      <a href='#'>
        <FaLinkedin color={color} size={26} />
      </a>
      <a href='#'>
        <FaWhatsapp color={color} size={26} />
      </a>
      <a href='#'>
        <FaGithub color={color} size={26} />
      </a>
      <a href='#'>
        <FaInstagram color={color} size={26} />
      </a>

    </div>
  );
};

export default Icons;
