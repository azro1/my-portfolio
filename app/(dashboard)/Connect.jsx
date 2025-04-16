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
  {icon: <FaYoutubeSquare size={30} />, url: 'https://www.youtube.com/channel/UCSK7zfwlgMq3r88lkchHsSw'},
  {icon: <FaInstagram size={30} />, url: 'https://www.instagram.com/yourprofile'},
  {icon: <FaDiscord size={30} />, url: 'https://discord.com/users/yourprofile'},
]

// components
import Heading from '../components/Heading';

const Connect = () => {
  return (
    <section>
        <div className="text-center max-w-max mx-auto lg:p-10">
          
          <div className='flex flex-col items-center justify-center '>
            <Heading className="subheading font-b text-goldenOchre mb-3.5">
               Let&apos;s Connect
            </Heading>
            <p className="md:leading-7">
              Follow me on LinkedIn, GitHub, YouTube, Instagram, and Discord for updates on my latest projects, new videos, code repositories, and more!        
            </p>
          </div>

          <div className="w-max mx-auto flex flex-col items-center justify-center gap-4 p-6 md:flex-row md:gap-2">
            {socialPlatforms.map((platform, index) => (
              <motion.a 
                href={platform.url} target="_blank" rel="noopener noreferrer"
                key={index}
                className="p-4 bg-charcoalGray shadow-lg shadow-deepCharcoal rounded-md w-max text-cloudGray" 
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

        </div>
    </section>
  );
};

export default Connect;
