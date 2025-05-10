"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState, useEffect } from "react"
import { Carousel } from "react-responsive-carousel"

import Link from "next/link"
import Image from 'next/image';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

// components
import Heading from "@/app/components/Heading"


const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    async function getProjects() {
      const supabase = createClientComponentClient();
      const { data, error } = await supabase.from('projects')
      .select()
      
      if (error) {
        console.log(error.message)
      }
      
      if (data.length > 0) {
        setProjects(data);
        setLoading(false); 
      }
    }
    getProjects()
  }, [])


  if (loading) {
    return (
      <div className='min-h-[382px] md:min-h-[450px] lg:min-h-[518px] flex items-center justify-center '> 
          <Image
            width={64}
            height={64}
            src="/images/loading/pulse_darkbg.svg"  
            alt="A pulsating loading animation on a dark background" 
          />
      </div>
    );
  }


  return (
    <section>
      <div>
        <Heading className="text-2xl font-bold text-cloudGray text-center mb-5 md:text-3xl md:mb-7 xl:text-[32px]">
          My Projects
        </Heading>
        <Carousel showStatus={false} transitionTime={500} interval={5000} swipeable={false} showThumbs={false} selectedItem={selectedIndex} showArrows={false} autoPlay infiniteLoop>
          {projects && projects.map((project) => (
            <div key={project.id}>
              <Link href={`/projects/${project.id}`}>


                <div className='relative w-full h-[326px] md:h-[380px] lg:h-[450px]'>
                  
                  <div className='hidden md:block'>
                    <Image className='object-left-top md:object-contain'
                      src={project.image_url}
                      alt={project.list_alt_desc}
                      fill
                      sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 976px) 50vw, (max-width: 1440px) 33vw, 25vw"
                      quality={100}
                      priority
                    />
                  </div>
                  
                  {/* bg placeholder for mobile image */}
                  <div className='bg-nightSky w-[300px] h-[280px] absolute left-1/2 transform -translate-x-1/2 md:hidden'></div>

                  <div className='absolute top-[92px] left-1/2 transform -translate-x-1/2 bg-softGray md:hidden '>
                    <Image className='max-w-[100px] max-h-[100px]'
                      src={project.mobile_image_url}
                      alt="rocket icon"
                      width={150}
                      height={150}
                      quality={100}
                      priority
                    />
                  </div>
                  <p className='text-stoneGray absolute bottom-[94px] left-1/2 transform -translate-x-1/2 md:hidden'>click to view project</p>
                  <p className='text-stoneGray text-xl font-medium absolute top-[40px] left-1/2 transform -translate-x-1/2 md:hidden'>{project.title}</p>

                </div>

              </Link>
            </div>
          ))}
        </Carousel>
      </div>
    </section>

  )
}

export default ProjectList

