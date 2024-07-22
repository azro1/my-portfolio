"use client"

import Link from 'next/link';

// custom hooks
import { useFetchProjectsById } from '@/app/hooks/useFetchProjectsById';

const ProjectsViewedList = ({ user }) => {
  
  // custom hook to fetch viewed projects
  const { retrievedProjects, isProjectsLoading } = useFetchProjectsById(user, 'activity', 'activity_id')


  return (
    <div className=''>
        <h3 className='text-lg text-shade font-b mb-4'>Project Views</h3>

        <div className='flex flex-wrap items-center justify-center md:justify-normal gap-2 min-h-52 bg-primary p-4'>
          {retrievedProjects ? (retrievedProjects.map((project) => (
            <div key={project.id}>
              <div className='max-w-40 bg-white p-1'>
                  <Link href={`/projects/${project.id}`}>
                      <img className='w-full h-30 object-cover object-left-top' 
                          src={project.image_url} 
                          alt={project.list_alt_desc}
                      />
                  </Link>
              </div>
              <h4 className="font-r text-secondary text-center text-sm mt-2">{project.title}</h4>
            </div>

              ))
            ) : (
              <div className='w-full relative'>
                {isProjectsLoading ? (
                  <img className="w-16 absolute top-16 left-1/2 transform -translate-x-1/2" src="../images/loading/loader.gif" alt="a loading gif" />
                ) : (
                  <>
                    {!isProjectsLoading && (<p className='text-center w-full pt-0'>No Projects Views.</p>)}
                  </>
                )}
              </div>
            )
          }

        </div>
    </div>
  )

}

export default ProjectsViewedList