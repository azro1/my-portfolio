"use client"

import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { useState, useEffect } from 'react';


// custom hooks
import { useFetchProjectsById } from '@/app/hooks/useFetchProjectsById';
import { useMessage } from '@/app/hooks/useMessage';

const FavouriteProjectList = ({ user }) => {
    const [projectsError, setProjectsError] = useState(false);

    // custom hook to fetch viewed projects
    const { retrievedProjects, isProjectsLoading, errorMessage, getProjectsById } = useFetchProjectsById(user, 'favourites', 'user_id');
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
            <h3 className='text-nightSky text-lg font-b mb-4'>Favourite Projects</h3>
            {!errorMessage ? (
                <div className='flex items-center min-h-52 bg-frostWhite p-4'>
                    {!isProjectsLoading && (
                        <div className='flex flex-wrap gap-3'>
                            {retrievedProjects.length > 0 && (retrievedProjects.map((project) => (
                                <div key={project.id}>
                                    <div className='max-w-36 relative'>
                                        <div className='bg-frostWhite p-1 shadow-outer' >
                                            <Link href={`/projects/${project.id}`}>
                                                <img className='w-full h-30 object-cover object-left-top'
                                                    src={project.image_url}
                                                    alt={project.list_alt_desc}
                                                />
                                            </Link>
                                        </div>
                                        <FaHeart className='absolute bottom-1 left-1' size='18' color='red' />
                                    </div>
                                    <h4 className="font-os font-r text-stoneGray text-center text-sm mt-2">{project.title}</h4>
                                </div>))
                            )}
                        </div>
                    )}
                    {!isProjectsLoading && retrievedProjects.length === 0 && !projectsError && <p className='place-self-start'>No Projects Views.</p>}
                </div>
            ) : (
                <p className='place-self-start'>Currently unable to display project views. Try refreshing the page.</p>
            )}
        </div>
    )
}

export default FavouriteProjectList
