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
        <div className="mx-auto max-w-[300px] md:max-w-[400px] lg:max-w-[460px]">
        <Carousel showStatus={false} transitionTime={500} interval={5000} swipeable={false} showThumbs={false} selectedItem={selectedIndex} showArrows={false} autoPlay infiniteLoop>
          {projects && projects.map((project) => (
            <div key={project.id}>
              


                <div className='flex items-start pt-9 justify-center relative w-full h-[320px] md:h-[380px] md:pt-12 lg:h-[420px] lg:pt-14'>
                      
                      {/* background div */}
                      <div className='absolute top-0 w-[280px] bg-nightSky h-[280px] md:w-[380px] md:h-[330px] lg:w-[440px] lg:h-[370px]'></div>
                        
                          <Link className='absolute' href={`/projects/${project.id}`}>
                            <div className='flex flex-col items-center gap-4'>
                              <h3 className='text-stoneGray text-xl font-semibold'>{project.title}</h3>
                                <Image className='bg-softGray max-w-[120px] md:max-w-[150px] lg:max-w-[180px]'
                                  src={project.mobile_image_url}
                                  alt={project.list_alt_desc}
                                  width={120}
                                  height={120}
                                  quality={100}
                                  priority
                                />
                              <p className='text-stoneGray '>click to view project</p>
                            </div>
                          </Link>

                </div>

            </div>
          ))}
        </Carousel>
        </div>

      </div>
    </section>

  )
}

export default ProjectList

