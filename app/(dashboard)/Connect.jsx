import {
  FaGithub,
  FaLinkedin,
  FaYoutubeSquare,
  FaInstagram,
  FaDiscord,
  FaWhatsapp
} from 'react-icons/fa';

const socialPlatforms = [
  {icon: <FaGithub />, url: 'https://github.com/azro1'},
  {icon: <FaLinkedin />, url: 'https://www.linkedin.com/in/yourprofile'},
  {icon: <FaYoutubeSquare />, url: 'https://www.youtube.com/channel/UCSK7zfwlgMq3r88lkchHsSw'},
  {icon: <FaInstagram />, url: 'https://www.instagram.com/yourprofile'},
  {icon: <FaDiscord />, url: 'https://discord.com/users/yourprofile'},
  {icon: <FaWhatsapp />, url: 'https://wa.me/yourphonenumber'}
]

const Connect = () => {
  return (
    <section>
        <div className="text-center max-w-max mx-auto">
          <div className='flex flex-col items-center justify-center '>
            <h2 className="subheading font-bold text-saddleBrown mb-4">Connect With Me</h2>
            <p className="text-ashGray max-auto">
              Stay connected with me on LinkedIn, GitHub, YouTube, Instagram, Discord, and WhatsApp for the latest updates, projects, and collaborations         
            </p>
          </div>

         
          
          <div className="w-max mx-auto mt-6 flex flex-col items-center justify-center gap-8 md:flex-row bg-slateOnyx p-6 ">

            {socialPlatforms.map((platform, index) => (
              <a href={platform.url} target="_blank" rel="noopener noreferrer" className="p-4 rounded-full shadow-[0_0_8px_2px_#131519] text-white text-3xl hover:scale-110 transform transition-all duration-200 ease-in-out" key={index}>
                {platform.icon}
              </a>
            ))}


          </div>
        </div>
    </section>
  );
};

export default Connect;
