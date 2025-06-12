"use client"

import { motion } from "framer-motion";

import {
  FaGithub,
  FaLinkedin,
  FaYoutubeSquare,
  FaInstagram,
  FaDiscord
} from 'react-icons/fa';

const socialPlatforms = [
  {icon: <FaGithub size={30} />, url: 'https://github.com/azro1'},
  {icon: <FaLinkedin size={30} />, url: 'https://www.linkedin.com/in/yourprofile'},
  {icon: <FaYoutubeSquare size={30} />, url: 'https://www.youtube.com/channel/UCSK7zfwlgMq3r88lkchHsSw', visibility: 'hidden md:block'},
  {icon: <FaInstagram size={30} />, url: 'https://www.instagram.com/yourprofile'},
  {icon: <FaDiscord size={30} />, url: 'https://discord.com/users/yourprofile'},
]

// components
import Heading from '../components/Heading';

const Connect = () => {
  return (
    <section>
        <div className="flex flex-col items-center text-center xl:max-w-max uw:max-w-screen-xl mx-auto md:flex-col lg:bg-nightSky lg:p-10">
          
          <Heading className="font-bold text-goldenOchre subheading">
              Let&apos;s Connect
          </Heading>

          <div className="flex flex-wrap items-center justify-center gap-2 p-5 sm:max-w-max">
            {socialPlatforms.map((platform, index) => (
              <motion.a 
                href={platform.url} target="_blank" rel="noopener noreferrer"
                key={index}
                className={`p-3 bg-charcoalGray rounded-md w-max text-cloudGray ${platform.visibility} shadow-[0_4px_12px_rgba(0,0,0,0.3)]`} 
                whileHover={{
                  scale: 1.1
                }}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
              >
                {platform.icon}
              </motion.a>
            ))}
          </div>

          <div className='flex flex-col items-center justify-center '>
            <p className="text-stoneGray lg:hidden">
              Follow me on social media for upcoming projects and code repositories
            </p>

            <p className="hidden lg:block text-stoneGray">
              Follow me on social media to stay updated on my latest work, upcoming projects, development insights, code releases, tutorials, announcements and more!
            </p>
          </div>

        </div>
    </section>
  );
};

export default Connect;
