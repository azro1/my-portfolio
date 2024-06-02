"use client"

import Link from 'next/link';
import { useState, useEffect } from "react";
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';

const ProjectsViewedList = () => {
    const [user, setUser] = useState(null);
    const [projectsViewed, setProjectsViewed] = useState('')

    const supabase = createClientComponentClient()


    useEffect(() => {
      async function getUser() {
        try {
          const {data: { user }, error} = await supabase.auth.getUser();
          if (error) {
            throw new Error(error.message);
          }
          if (user) {
            setUser(user);
          }
        } catch (error) {
            console.log(error.massage);
        }
      }
      getUser();
   }, []);


   
  // get projects viewed
  useEffect(() => {
    async function getProjectsViewed() {
      
      // get activity table entries
      const { data: activities, error: activitiesError } = await supabase.from('activity')
      .select()
      .eq('activity_id', user.id)
      
      if (activitiesError) {
          console.log(activitiesError.message)
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
          console.log(projectsError.message)
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
    }
    if (user && user.id) {
      getProjectsViewed()
    }
  }, [user && user.id])


  return (
    <div className='grid grid-cols-2 flex-1 place-self-start '>
        <h3 className='row-start-1 col-span-2 mb-5 text-xl font-b font-rubik text-hint'>Project Views</h3>
        {projectsViewed && projectsViewed.map((project) => (
            <div className='flex flex-col p-3' key={project.id}>
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
        }
    </div>
  )

}

export default ProjectsViewedList