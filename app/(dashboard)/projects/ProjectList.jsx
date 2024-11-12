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
      <div className='min-h-[600px] flex items-center justify-center'> 
          <img className='w-32' src="../images/loading/loading.gif" alt="a loading gif" />
      </div>
    );
  }


  return (
    <section>
      <h2 className="subheading font-b text-saddleBrown text-center pb-5">My Projects</h2>
      <Carousel showStatus={false} transitionTime={500} interval={5000} swipeable={true} showThumbs={true} selectedItem={selectedIndex} autoPlay infiniteLoop onChange={(index) => setSelectedIndex(index)} renderThumbs={() =>
        projects.map((project) => (
          <div key={project.id}>
            <Image
              src={project.image_url}
              alt={project.list_alt_desc}
              width={50}
              height={50}
              className="object-cover"
            />
          </div>
        ))
      }
      >
        {projects && projects.map((project) => (
          <div key={project.id}>
            <Link href={`/projects/${project.id}`}>
              <div className='relative w-full h-[380px] lg:h-[450px]'>
                <Image className='object-cover object-left-top md:object-contain'
                  src={project.image_url}
                  alt={project.list_alt_desc}
                  fill
                  sizes="(max-width: 480px) 100vw, (max-width: 768px) 100vw, (max-width: 976px) 50vw, (max-width: 1440px) 33vw, 25vw"
                  quality={100}
                  priority
                />
              </div>
            </Link>

          </div>
        ))}
      </Carousel>
    </section>

  )
}

export default ProjectList

