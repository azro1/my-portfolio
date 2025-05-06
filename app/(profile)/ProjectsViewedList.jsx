"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

// components
import Heading from "../components/Heading";

// custom hooks
import { useFetchProjectsById } from '@/app/hooks/useFetchProjectsById';
import { useMessage } from '@/app/hooks/useMessage';

const ProjectsViewedList = ({ user }) => {

  // custom hook to fetch viewed projects
  const { retrievedProjects, isProjectsLoading, errorMessage, getProjectsById } = useFetchProjectsById(user, 'project_views', 'user_id');
  const { changeMessage } = useMessage();
  
  // function to handle failure and display global message to user
  useEffect(() => {
    getProjectsById()
  }, [getProjectsById])

  useEffect(() => {
    if (errorMessage) {
      changeMessage('error', errorMessage)
    }
  }, [errorMessage, changeMessage])

  return (
    <div>
      <Heading className='text-base font-light text-cloudGray mb-3'>
        Project Views
      </Heading>
      {!errorMessage ? (
        <div className={`min-h-[350px] flex items-center justify-center md:justify-normal bg-nightSky ${retrievedProjects.length === 0 ? 'p-4' : 'p-12'}`}>
          {!isProjectsLoading && (
            <div className='flex flex-wrap justify-center gap-8  '>
              {retrievedProjects.length > 0 && (retrievedProjects.map((project) => (
                <div key={project.id}>
                  <div className=' bg-softGray'>
                    <Link href={`/projects/${project.id}`}>
                      <div className='flex items-center justify-center w-[196px] h-[180px]'>
                        <Image className='max-w-[150px] max-h-[150px]'
                          src={project.mobile_image_url}
                          alt="rocket icon"
                          width={200}
                          height={200}
                          quality={100}
                          priority
                        />
                      </div>
                    </Link>
                  </div>
                  <h4 className="font-b text-ashGray text-center mt-2">{project.title}</h4>
                </div>))
              )}
            </div>
          )}
          {!isProjectsLoading && retrievedProjects.length === 0 && !errorMessage && (
            <div className='flex-1 place-self-start'>
              <p>No Projects Views.</p>
            </div>
          )}
        </div>
      ) : (
        <p className='place-self-start'>Currently unable to display project views. Try refreshing the page.</p>
      )}
    </div>
  )

}

export default ProjectsViewedList