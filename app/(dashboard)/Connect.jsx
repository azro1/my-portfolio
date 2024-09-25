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
          <h2 className='subheading font-b text-saddleBrown pb-3'>Connect With Me</h2>
          <p className='leading-7'>
            Follow me on <a href="#" target="_blank" className="text-saddleBrown text-base">LinkedIn</a> for professional insights, <a href="https://github.com/azro1" target="_blank" className="text-saddleBrown text-base">GitHub</a> for code
            repositories and projects, and subscribe to my YouTube channel <a href="https://www.youtube.com/channel/UCSK7zfwlgMq3r88lkchHsSw"  target="_blank" className="text-saddleBrown text-base">Code Dynamics </a>
            where I share insights and tutorials on Full Stack
            Development, UI Design, and more
          </p>
        </div>

        <div className='md:w-1/2'>
          <div className='grid grid-flow-col auto-cols-max place-items-center justify-end gap-3'>
            <div className='row-start-1 col-start-3'>
              <FaGithub className="text-frostWhite" size={50} />
            </div>
            <div className='row-start-3'>
              <FaInstagram className="text-frostWhite" size={50} />
            </div>
            <div className='row-start-3 col-start-2 '>
              <FaLinkedin className="text-frostWhite" size={50} />
            </div>
            <div className='row-start-3 col-start-3'>
              <FaYoutubeSquare className="text-frostWhite" size={50} />
            </div>
            <div className='row-start-2 col-start-38'>
              <FaDiscord className="text-frostWhite" size={50} />
            </div>
            <div className='row-start-2 col-start-2'>
              <FaWhatsapp className="text-frostWhite" size={50} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Connect;
