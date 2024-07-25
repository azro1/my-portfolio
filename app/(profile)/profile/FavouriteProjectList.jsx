"use client"

import Link from 'next/link';
import { FaHeart } from 'react-icons/fa';


// custom hooks
import { useFetchProjectsById } from '@/app/hooks/useFetchProjectsById';

const FavouriteProjectList = ({ user }) => {

  // custom hook to fetch viewed projects
  const { retrievedProjects, isProjectsLoading } = useFetchProjectsById(user, 'favourites', 'user_id')

    return (
        <div>
            <h3 className='text-nightSky text-lg font-b mb-4'>Favourite Projects</h3>
            <div className='flex items-center min-h-52 bg-frostWhite p-4'>
                {!isProjectsLoading && (
                    <div className='flex flex-wrap gap-3'>
                        {retrievedProjects && (retrievedProjects.map((project) => (
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
                {!isProjectsLoading && !retrievedProjects && <p className='place-self-start'>No Projects Views.</p>}
            </div>
        </div>
    )
}

export default FavouriteProjectList
