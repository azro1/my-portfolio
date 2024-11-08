"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';

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
  }, [])

  useEffect(() => {
    if (errorMessage) {
      changeMessage('error', errorMessage)
    }
  }, [errorMessage])

  return (
      <div>
          <h3 className='text-lg text-deepCharcoal font-b mb-4'>Project Views</h3>
              {!errorMessage ? (
                <div className='min-h-52 flex items-center bg-frostWhite p-4'>
                  {!isProjectsLoading && (
                      <div className='flex flex-wrap gap-4'>
                          {retrievedProjects.length > 0 && (retrievedProjects.map((project) => (
                              <div key={project.id}>
                                  <div className='max-w-36 bg-frostWhite p-1 shadow-outer'>
                                      <Link href={`/projects/${project.id}`}>
                                      <div className='relative w-[136px] h-[120px]'>
                                          <Image 
                                              className='object-cover object-left-top'
                                              src={project.image_url}
                                              alt={project.list_alt_desc}
                                              fill
                                              quality={100}
                                              priority
                                          />
                                      </div>

                                      </Link>
                                  </div>
                                  <h4 className="font-r text-stoneGray text-center text-sm mt-2">{project.title}</h4>
                              </div>))
                          )}
                      </div>
                  )}
                  {!isProjectsLoading && retrievedProjects.length === 0 && !errorMessage && <p className='place-self-start'>No Projects Views.</p>}
                </div>
              ) : (
                <p className='place-self-start'>Currently unable to display project views. Try refreshing the page.</p>
              )}
      </div>
  )

}

export default ProjectsViewedList