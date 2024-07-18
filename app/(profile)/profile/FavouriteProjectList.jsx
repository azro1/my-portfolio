"use client"

import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';


// custom hooks
import { useFetchProjectsById } from '@/app/hooks/useFetchProjectsById';

const FavouriteProjectList = ({ user }) => {

  // custom hook to fetch viewed projects
  const { retrievedProjects, isProjectsLoading } = useFetchProjectsById(user, 'favourites', 'user_id')

    return (
        <div className='text-center'>
            <h3 className='profile-sub-subheading text-lg text-hint mb-4'>Favourite Projects</h3>

            <div className='flex flex-wrap gap-2 max-w-sm mx-auto min-h-96 justify-center lg:justify-start'>
                {retrievedProjects ? (retrievedProjects.map((project) => (
                    <div key={project.id}>
                        <div className='p-3 shadow-outer max-w-40 min-w-40 h-fit border-shade border-4 relative' key={project.id}>
                            <div className='max-w-full max-h-full bg-white p-1' >
                                <Link href={`/projects/${project.id}`}>
                                    <img className='w-full h-30 object-cover object-left-top'
                                        src={project.image_url}
                                        alt={project.list_alt_desc}
                                    />
                                </Link>
                            </div>
                            <FaHeart className='absolute bottom-4 left-4' size='18' color='red' />
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

export default FavouriteProjectList
