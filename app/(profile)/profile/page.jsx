"use client"

import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useState, useEffect } from "react";
import { formatDistanceToNow } from 'date-fns/formatDistanceToNow';

// components
import ProfileHeader from "./ProfileHeader";
import Link from 'next/link';


const Profile = () => {
  const [user, setUser] = useState(null);
  const [first_name, setFirstName] = useState(user ? user.user_metadata.full_name : '');
  const [avatar_url, setAvatarUrl] = useState('');
  const [projectsViewed, setProjectsViewed] = useState('');
  const [comments, setComments] = useState(null);

  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isProfileLoading, setIsProfileLoading] = useState(true);




  const supabase = createClientComponentClient();

  useEffect(() => {
    async function getUser() {
      setIsUserLoading(true)
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
      } finally {
          setIsUserLoading(false)
      }
    }
    getUser();
  }, []);





  // get user profile
  useEffect(() => {
      async function getProfile() {

          try {
            setIsProfileLoading(true)

              const { data, error } = await supabase
               .from('profiles')
               .select('*, comments(*)')
               .eq('id', user.id)
              
              if (error) {
                throw new Error(error.message);
              }
              
              if (data && data.length > 0) {
                const profileData = data[0];
                setFirstName(profileData.first_name || user.user_metadata.full_name);
                setAvatarUrl(profileData.avatar_url);

                if (data[0].comments && data[0].comments.length > 0) {
                   setComments(data[0].comments)
                }
              } else {
                setFirstName(user.user_metadata.full_name);
            }
          } catch (error) {
              console.log(error.message);
          } finally {
              setIsProfileLoading(false)
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


  const isLoading = isUserLoading || isProfileLoading;



  return (
      <div>
        <ProfileHeader
          user={user}
          isLoading={isLoading} 
          avatar_url={avatar_url} 
          first_name={first_name}
        />

        <div className='mt-16'>
            <h2 className='text-center text-2xl font-b font-rubik text-secondary'>Activity Feed</h2>
        </div>
        
        <div className='text-center mt-10 gap-3 lg:flex'>
    
            <div className='grid grid-cols-2 flex-1 place-self-start'>
                <h3 className='row-start-1 col-span-2 mb-3 text-xl font-b font-rubik text-hint'>Project Views</h3>
                {projectsViewed ? (projectsViewed.map((project) => (
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
                ))) : 
                    <p className='col-span-2'>No project views yet.</p>
                }
            </div>

            <div className='flex-1'>
              <h3 className='row-start-1 col-span-2 mb-3 text-xl font-b font-rubik text-hint'>Comments</h3>
              <div className='flex flex-col gap-5 text-left'>
                  {comments ? (comments.map((comment) => (
                    <div className='flex items-start justify-between gap-3 pt-2' key={comment.id}>
                      <div>
                          <p>{comment.text}</p>
                          <span className='text-xs text-hint'>{formatDistanceToNow(new Date(comment.created_at), { addSuffix: true })}</span>
                      </div>
                        <button className='btn bg-hint'>Delete</button>

                    </div>
                  ))) :
                    <p className='text-center'>No comments yet.</p>
                  }
              </div>
            </div>

        </div>
    </div>
  );
};

export default Profile;
