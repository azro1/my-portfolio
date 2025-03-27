"use client"

import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';
import { useEffect } from 'react';
import Image from 'next/image';


// custom hooks
import { useFetchProjectsById } from '@/app/hooks/useFetchProjectsById';
import { useMessage } from '@/app/hooks/useMessage';

const FavouriteProjectList = ({ user }) => {
    // custom hook to fetch viewed projects
    const { retrievedProjects, isProjectsLoading, errorMessage, getProjectsById } = useFetchProjectsById(user, 'favourites', 'user_id');
    const { changeMessage } = useMessage();

    
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
            <h3 className='text-frostWhite text-lg font-medium mb-4'>Favourite Projects</h3>
            {!errorMessage ? (
                <div className={`min-h-[350px] flex items-center justify-center md:justify-normal bg-softCharcoal ${retrievedProjects.length === 0 ? 'p-4' : 'p-12'}`}>
                    {!isProjectsLoading && (
                        <div className='flex flex-wrap gap-8'>
                            {retrievedProjects.length > 0 && (retrievedProjects.map((project) => (
                                <div key={project.id}>
                                    <div className='relative'>
                                        <div className='w-max bg-frostWhite p-1 shadow-outer' >
                                            <Link href={`/projects/${project.id}`}>
                                                <div className='relative w-[236px] h-[220px]'>
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
                                        <FaHeart className='absolute bottom-1 left-1' size='24' color='red' />
                                    </div>
                                    <h4 className="font-os font-r text-ashGray text-center text-sm mt-2">{project.title}</h4>
                                </div>))
                            )}
                        </div>
                    )}
                    {!isProjectsLoading && retrievedProjects.length === 0 && !errorMessage&& (
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

export default FavouriteProjectList
