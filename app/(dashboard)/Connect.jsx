import {
  FaGithub,
  FaLinkedin,
  FaYoutubeSquare,
  FaInstagram,
  FaDiscord,
  FaWhatsapp
} from 'react-icons/fa';

const socialPlatforms = [
  {icon: <FaGithub size={28} />, url: 'https://github.com/azro1'},
  {icon: <FaLinkedin size={28} />, url: 'https://www.linkedin.com/in/yourprofile'},
  {icon: <FaYoutubeSquare size={28} />, url: 'https://www.youtube.com/channel/UCSK7zfwlgMq3r88lkchHsSw'},
  {icon: <FaInstagram size={28} />, url: 'https://www.instagram.com/yourprofile'},
  {icon: <FaDiscord size={28} />, url: 'https://discord.com/users/yourprofile'},
  {icon: <FaWhatsapp size={28} />, url: 'https://wa.me/yourphonenumber'}
]

const Connect = () => {
  return (
    <section>
        <div className="text-center max-w-max mx-auto lg:p-10">
          <div className='flex flex-col items-center justify-center '>
            <h2 className="subheading font-b text-chocolate mb-3.5">Connect With Me</h2>
            <p className="md:leading-7">
              Stay connected with me on LinkedIn, GitHub, YouTube, Instagram, Discord, and WhatsApp for the latest updates, projects, and collaborations         
            </p>
          </div>

         
          
          <div className="w-max mx-auto  flex flex-col items-center justify-center gap-4 md:flex-row p-6">

            {socialPlatforms.map((platform, index) => (
              <a href={platform.url} target="_blank" rel="noopener noreferrer" className="p-4 text-white rounded-full shadow-[0_0_8px_2px_#131519] bg-gradient-to-tl from-charcoalGray via-nightSky to-stoneGray transition-shadow duration-300" key={index}>
                {platform.icon}
              </a>
            ))}


          </div>
        </div>
    </section>
  );
};

export default Connect;
