"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState, useEffect } from "react"
import Link from "next/link"
import Image from 'next/image';
import { Carousel } from "react-responsive-carousel"
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import the CSS for the carousel



const ProjectList = () => {
  const [projects, setProjects] = useState([]);


  
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
      }
    }
    getProjects()
  }, [])



  return (
    <section>
      <h2 className="subheading font-b text-saddleBrown text-center pb-5">My Projects</h2>
      <div>

          <Carousel showStatus={false} showThumbs={false} transitionTime={500} interval={5000} swipeable={true} >
             
              {projects && projects.map((project) => (
                <div key={project.id}>

                    <Link href={`/projects/${project.id}`}>
                        <div className='relative w-full h-[380px] lg:h-[450px]'>
                            <Image className='object-cover object-left-top md:object-contain'
                                src={project.image_url}
                                alt={project.list_alt_desc}
                                fill
                                sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 976px) 50vw, (max-width: 1440px) 33vw, 25vw"               
                                priority                   
                            />
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

