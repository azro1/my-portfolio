"use client"

import Link from 'next/link';
import Image from 'next/image';
import { useEffect } from 'react';
import { FiEye } from 'react-icons/fi';

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
      <div className='flex items-center gap-2 mb-4'>
          <Heading className='font-medium text-cloudGray'>
              Project Views
          </Heading>
          <FiEye size='16' className='text-cloudGray' />
      </div>

      {!errorMessage ? (
        <div className='min-h-[350px] bg-nightSky p-4'>
          {!isProjectsLoading && (
            <div className='flex flex-wrap gap-4'>
              {retrievedProjects.length > 0 && (retrievedProjects.map((project) => (
                <div className='max-w-[80px]' key={project.id}>
                  <div className='flex items-center justify-center bg-softGray min-w-[80px] min-h-[80px]'>
                    <Link href={`/projects/${project.id}`}>
                        <Image className='object-contain max-w-[70px]'
                          src={project.mobile_image_url}
                          alt="A project image"
                          width={80}
                          height={80}
                          quality={100}
                          priority
                        />
                    </Link>
                  </div>
                  <h4 className="font-semibold text-sm text-ashGray text-center mt-2 overflow-hidden text-ellipsis whitespace-nowrap">{project.title}</h4>
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