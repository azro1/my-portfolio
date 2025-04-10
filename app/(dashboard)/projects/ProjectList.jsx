"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from 'next/image';
import { Carousel } from "react-responsive-carousel"
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the CSS for the carousel


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
      <div className='min-h-[516px] flex items-center justify-center'> 
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
        <h2 className="text-2xl md:text-3xl font-b text-cloudGray text-center mb-6 md:mb-8">My Projects</h2>
        <Carousel showStatus={false} transitionTime={500} interval={5000} swipeable={true} showThumbs={false} selectedItem={selectedIndex} autoPlay infiniteLoop>
          {projects && projects.map((project) => (
            <div key={project.id}>
              <Link href={`/projects/${project.id}`}>


                <div className='relative w-full h-[380px] lg:h-[450px]'>
                  
                  <Image className='hidden md:object-left-top md:object-contain'
                    src={project.image_url}
                    alt={project.list_alt_desc}
                    fill
                    sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 976px) 50vw, (max-width: 1440px) 33vw, 25vw"
                    quality={100}
                    priority
                  />

                  <div className='md:hidden'>
                    <Image className=' object-cover object-left-top md:object-contain'
                      src={project.mobile_placeholder}
                      alt="mobile placeholder dark background"
                      fill
                      sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 976px) 50vw, (max-width: 1440px) 33vw, 25vw"
                      quality={100}
                      priority
                    />
                  </div>

                  <div className='absolute top-1/2 -translate-y-1/2 left-1/2 transform -translate-x-1/2 bg-softGray md:hidden '>
                    <Image className='max-w-[150px] max-h-[150px]'
                      src={'/images/wrench.svg'}
                      alt="rocket icon"
                      width={200}
                      height={200}
                      quality={100}
                      priority
                    />
                  </div>
                  <p className='text-stoneGray absolute bottom-[72px] left-1/2 transform -translate-x-1/2 md:hidden'>click to view project</p>
                  <p className='text-stoneGray text-2xl font-b absolute top-16 left-1/2 transform -translate-x-1/2 md:hidden'>{project.title}</p>


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

