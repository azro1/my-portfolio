"use client"

import Link from 'next/link';

// custom hooks
import { useFetchProjectsById } from '@/app/hooks/useFetchProjectsById';

const ProjectsViewedList = ({ user }) => {
  
  // custom hook to fetch viewed projects
  const { retrievedProjects, isProjectsLoading } = useFetchProjectsById(user, 'activity', 'activity_id')

  return (
      <div>
          <h3 className='text-lg text-deepCharcoal font-b mb-4'>Project Views</h3>
              <div className='min-h-52 flex items-center bg-frostWhite p-4'>
                {!isProjectsLoading && (
                    <div className='flex flex-wrap gap-3'>
                        {retrievedProjects && (retrievedProjects.map((project) => (
                            <div key={project.id}>
                                <div className='max-w-36 bg-frostWhite p-1 shadow-outer'>
                                    <Link href={`/projects/${project.id}`}>
                                      <img className='w-full h-30 object-cover object-left-top'
                                        src={project.image_url}
                                        alt={project.list_alt_desc}
                                      />
                                    </Link>
                                </div>
                                <h4 className="font-r text-stoneGray text-center text-sm mt-2">{project.title}</h4>
                            </div>))
                        )}
                    </div>
                )}
                {!isProjectsLoading && ! retrievedProjects && <p className='place-self-start'>No Projects Views.</p>}
              </div>
      </div>
  )

}

export default ProjectsViewedList