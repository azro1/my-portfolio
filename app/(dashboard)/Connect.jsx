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
        <div className="flex flex-col items-center text-center max-w-max mx-auto md:flex-col lg:bg-nightSky lg:p-10">
          
          <Heading className="font-bold text-goldenOchre subheading">
              Let&apos;s Connect
          </Heading>

          <div className="flex flex-wrap items-center justify-center gap-2 p-5 sm:max-w-max">
            {socialPlatforms.map((platform, index) => (
              <motion.a 
                href={platform.url} target="_blank" rel="noopener noreferrer"
                key={index}
                className={`p-3 bg-charcoalGray rounded-md w-max text-cloudGray ${platform.visibility} md:p-4 md:shadow-[0_6px_8px_rgba(0,0,0,0.6)]`} 
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
            <p className="text-stoneGray md:hidden">
              Follow me on LinkedIn, GitHub, Instagram, and Discord for updates on latest projects, code repositories, and more!
            </p>

            <p className="hidden md:block text-stoneGray">
              Follow me on LinkedIn, GitHub, YouTube, Instagram, and Discord for updates on my latest projects, new videos, code repositories, and more!
            </p>
          </div>

        </div>
    </section>
  );
};

export default Connect;
