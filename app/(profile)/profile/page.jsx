"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from "react";
import { FaUserCircle } from "react-icons/fa";
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';



// components
import ProfileHeader from "./ProfileHeader";
import ProfileAvatar from './ProfileAvatar';
import Link from 'next/link';

const Profile = () => {
  const [first_name, setFirstName] = useState('');
  const [avatar_url, setAvatarUrl] = useState('');
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [projectsViewed, setProjectsViewed] = useState('')


  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      setIsLoading(true)
      try {
        const {data: { user }, error} = await supabase.auth.getUser();
        if (error) {
          throw new Error(error.message);
        }
        if (user) {
          setIsLoading(false)
          setUser(user);
        }
      } catch (error) {
          setIsLoading(false)
          console.log(error.massage);
      } finally {
          setIsLoading(false)
      }
    }
    getUser();
  }, []);





  // get user profile
  useEffect(() => {
      async function getProfile() {

          try {
              const { data: profile, error: profilesError } = await supabase.from('profiles')
               .select()
               .eq('id', user.id)
               .limit(1)
              
              if (profilesError) {
                throw new Error(profilesError.message);
              }
              
              if (profile && profile.length > 0) {
                setIsLoading(false)
                const profileData = profile[0];
                setFirstName(profileData.first_name);
                setAvatarUrl(profileData.avatar_url);
              }
              
          } catch (error) {
              setIsLoading(false)
              console.log(error.message);
          } finally {
              setIsLoading(false)
          }

      }
      if (user && user.id) {
        getProfile();
    }
  }, [avatar_url, first_name, user && user.id])






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
              timestamp: activity ? activity.updated_at : null
            };
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
      <div className=''>
          {user && user.app_metadata.provider !== "email" ? ( 
              <div className='flex-1 flex flex-col items-center gap-3'>
                  {isLoading ? (
                      <div className='overflow-hidden w-20 h-20'>
                          <img src="images/navbar/avatar/loader.gif" alt="a loading gif" />
                      </div>
                  ) : (
                      <>
                          {avatar_url ? (
                              <div className="overflow-hidden rounded-full w-20 h-20">
                                  <img className="inline-block w-full h-full object-cover" src={avatar_url} alt="a user avatar" />
                              </div>
                          ) : (
                              <div className="overflow-hidden rounded-full min-w-max h-auto">
                                  <FaUserCircle size={48} color="gray" />
                              </div>
                          )}
                      </>
                  )}

                  <ProfileHeader heading={`Hi, ${user.user_metadata.full_name}`} text={"Welcome to your Profile dashboard. Get started by personalizing your account settings and exploring our features."} />
              </div>
         )
       :
         (
          <div className='flex-1 flex flex-col items-center gap-3'>
               <ProfileAvatar
                    url={avatar_url}
                    onUpload={(url) => {
                        setAvatarUrl(url);
                    }}
                    size={'h-20 w-20'}
                    phSize={80}
  
               />
               <ProfileHeader heading={`Hi, ${first_name}`} text={"Welcome to your Profile dashboard. Get started by personalizing your account settings and exploring our features."} />
          </div>
         )}

         <div className='mt-16'>
             <h2 className='text-center text-2xl font-b font-rubik text-secondary'>History</h2>
         </div>
         
         <div className='text-center mt-10 flex'>
     
             <div className='grid grid-cols-2 w-1/2'>
                 <h3 className='row-start-1 col-span-2 mb-3 text-xl font-b font-rubik text-hint'>Project Views</h3>
                 {projectsViewed ? (projectsViewed.map((project) => (
                    <div className='flex flex-col p-3' key={project.id}>
                      <div className='w-full h-full bg-white p-1' >
                          <Link href={`/projects/${project.id}`}>
                              <img className='w-full h-28 object-cover object-left-top' 
                                src={project.image_url} 
                                alt={project.list_alt_desc}
                              />
                          </Link>
                      </div>

                      <h4 className="font-os font-r text-secondary text-center text-sm mt-2">{project.title}</h4>
                      {project.timestamp && <p className="text-xs text-hint mt-2">{formatDistanceToNow(new Date(project.timestamp), { addSuffix: true })}</p>}
                    </div>
                 ))) : 
                    <p className='col-span-2'>No project views yet.</p>
                 }
                 
             </div>

             <div className='w-1/2'>
               <h3 className='row-start-1 col-span-2 mb-3 text-xl font-b font-rubik text-hint'>Activity Feed</h3>
               <div className=''>
                  {/* feed loop */}
               </div>

             </div>
         </div>



     </div>
  );
};

export default Profile;
