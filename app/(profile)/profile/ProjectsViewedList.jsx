"use client"

import Link from 'next/link';
import { useState, useEffect } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

// custom hooks
import { useFetchUser } from '@/app/hooks/useFetchUser';

const ProjectsViewedList = () => {
  // custom hook to fetch user
    const { user } = useFetchUser()

    const [projectsViewed, setProjectsViewed] = useState('')
    const [isProjectsLoading, setIsProjectsloading] = useState(true)

    const supabase = createClientComponentClient()

  // get projects viewed
  useEffect(() => {
    async function getProjectsViewed() {

      try {
        // get activity table entries
        const { data: activities, error: activitiesError } = await supabase.from('activity')
          .select()
          .eq('activity_id', user.id)

        if (activitiesError) {
          throw new Error(activitiesError)
        }

        if (activities && activities.length > 0) {
          // convert array of string ids into an array of numbers
          const projectIds = activities.map(project => project.project_id)
          const projectIdsInt = projectIds.map(id => parseInt(id));

          // get projects using ids
          const { data: projects, error: projectsError } = await supabase.from('projects')
            .select()
            .in('id', projectIdsInt)

          if (projectsError) {
            throw new Error(projectsError.message)
          } else {

            // Associate projects with their corresponding activities
            const projectsViewed = projects.map(project => {
              const activity = activities.find(activity => activity.project_id === project.id);
              return {
                ...project,
                activity
              }
            });
            setProjectsViewed(projectsViewed)
          }
        }
      } catch (error) {
        console.log(error.message)
      } finally {
        setIsProjectsloading(false)
      }
    }

    if (user) {
      getProjectsViewed()
    }
  }, [user])


  return (
    <div className='text-center flex-1'>
        <h3 className='mb-4 text-lg font-rubik text-hint'>Project Views</h3>

        <div className='flex flex-wrap gap-3 max-w-sm mx-auto min-h-96 justify-center lg:justify-start'>
          {projectsViewed ? (projectsViewed.map((project) => (
              <div className='p-3 shadow-outer max-w-40 min-w-40 h-fit' key={project.id}>
                  <div className='max-w-full max-h-full bg-white p-1' >
                      <Link href={`/projects/${project.id}`}>
                          <img className='w-full h-28 object-cover object-left-top' 
                              src={project.image_url} 
                              alt={project.list_alt_desc}
                          />
                      </Link>
                  </div>

                  <h4 className="font-os font-r text-secondary text-center text-sm mt-2">{project.title}</h4>
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