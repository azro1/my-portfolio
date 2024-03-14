import {
  FaGithub,
  FaLinkedin,
  FaYoutubeSquare,
  FaInstagram,
  FaDiscord,
  FaWhatsapp
} from 'react-icons/fa';

const Connect = () => {
  return (
    <section>
      <div className='flex flex-col-reverse items-center text-center md:flex-row md:gap-10 md:items-end'>
        <div className='mt-6 md:mt-0 md:text-left'>
          <h2 className='subheading text-hint pb-3'>Connect With Me</h2>
          <p className='mb-3'>Let's connect!</p>
          <p className='leading-6'>
            Follow me on LinkedIn for professional insights, GitHub for code
            repositories and projects, and subscribe to my YouTube channel
            CodeDynamics where I share insights and tutorials on Full Stack
            Development, UI Design, and more.
          </p>
        </div>

        <div className='md:w-1/2'>
          <div className='grid grid-flow-col auto-cols-max place-items-center gap-3 '>
            <div className='row-start-2 col-start-2'>
              <FaGithub color='#F0F0F0' size={60} />
            </div>
            <div className='row-start-3'>
              <FaInstagram color='#F0F0F0' size={60} />
            </div>
            <div className='row-start-2 col-start-1 '>
              <FaLinkedin color='#F0F0F0' size={60} />
            </div>
            <div className='row-start-3 col-start-2'>
              <FaYoutubeSquare color='#F0F0F0' size={60} />
            </div>
            <div className='row-start-1 col-start-1'>
              <FaDiscord color='#F0F0F0' size={60} />
            </div>
            <div className='row-start-3 col-start-3'>
              <FaWhatsapp color='#F0F0F0' size={60} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;
