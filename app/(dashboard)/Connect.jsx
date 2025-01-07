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
        <div className="text-center ">
          <h2 className="subheading font-bold text-saddleBrown mb-6">Connect With Me</h2>
          <p className="text-ashGray mb-8">
            Stay connected with me on LinkedIn, GitHub, YouTube, Instagram, Discord, and WhatsApp for the latest updates, projects, and collaborations.          
          </p>
         
          
          <div className="flex flex-col items-center justify-center gap-8 md:flex-row">

            {socialPlatforms.map((platform, index) => (
              <a href={platform.url} target="_blank" rel="noopener noreferrer" className="p-4 rounded-full bg-nightSky shadow-outer text-white text-3xl hover:scale-110 transform transition-all duration-200 ease-in-out" key={index}>
                {platform.icon}
              </a>
            ))}


          </div>
        </div>
    </section>
  );
};

export default Connect;
