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
        <Heading className="text-2xl font-bold text-cloudGray text-center mb-5 md:mb-7 md:text-[28px] lg:text-[30px] xl:text-[32px]">
          My Projects
        </Heading>
        <div className="mx-auto max-w-[300px] md:max-w-[400px] lg:max-w-[460px]">
        <Carousel showStatus={false} transitionTime={500} interval={5000} swipeable={false} showThumbs={false} selectedItem={selectedIndex} showArrows={false} autoPlay infiniteLoop>
          {projects && projects.map((project) => (
            <div key={project.id}>
              


                <div className='flex items-start pt-12 justify-center relative w-full h-[320px] md:h-[380px] md:pt-14 lg:h-[420px] lg:pt-[62px]'>
                      
                      {/* background div */}
                      <div className='absolute top-0 w-[280px] bg-nightSky h-[280px] md:w-[380px] md:h-[330px] lg:w-[440px] lg:h-[370px]'></div>
                        
                          <Link className='absolute' href={`/projects/${project.id}`}>
                            <div className='flex flex-col items-center gap-4'>
                              <h3 className='text-stoneGray text-lg font-semibold md:text-xl'>{project.title}</h3>
                              <div className='flex items-center justify-center bg-softGray min-w-[110px] min-h-[100px] md:min-w-[140px] md:min-h-[130px] lg:min-w-[170px] lg:min-h-[150px]'>
                                <Image className='max-w-[90px] md:max-w-[110px] lg:max-w-[130px]'
                                  src={project.mobile_image_url}
                                  alt={project.list_alt_desc}
                                  width={100}
                                  height={100}
                                  quality={100}
                                  priority
                                />
                              </div>
                              <p className='text-stoneGray md:text-lg'>click to view project</p>
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

