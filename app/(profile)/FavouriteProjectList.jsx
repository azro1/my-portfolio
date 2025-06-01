"use client"

import Link from 'next/link';
import { FiHeart } from 'react-icons/fi';
import { useEffect } from 'react';
import Image from 'next/image';

// components
import Heading from "../components/Heading";

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
            <div className='flex items-center gap-2 mb-4'>
                <Heading className='font-medium text-cloudGray'>
                    Favourite Projects
                </Heading>
               <FiHeart size='16' className='text-cloudGray' />
            </div>

            {!errorMessage ? (
                <div className='min-h-[350px] bg-nightSky p-4'>
                    {!isProjectsLoading && (
                        <div className='flex flex-wrap gap-4'>
                            {retrievedProjects.length > 0 && (retrievedProjects.map((project) => (
                                <div className='max-w-[80px]' key={project.id}>
                                    <div className='bg-softGray' >
                                        <Link href={`/projects/${project.id}`}>
                                            <div className='w-[80px] h-[80px]'>
                                                <Image className='object-contain'
                                                    src={project.mobile_image_url}
                                                    alt="rocket icon"
                                                    width={80}
                                                    height={80}
                                                    quality={100}
                                                    priority
                                                />
                                            </div>
                                        </Link>
                                    </div>
                                    <h4 className="font-semibold text-ashGray text-sm text-center mt-2 overflow-hidden text-ellipsis whitespace-nowrap">{project.title}</h4>
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
