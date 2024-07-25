"use client"

import { useState, useEffect } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { v4 as uuidv4 } from 'uuid';


const ProjectFavouriteButton = ({ className, projectId, user }) => {
  const [isClicked, setIsClicked] = useState(false)
  const [isFavourite, setIsFavourite] = useState(false);
  const [favouriteProjects, setFavouriteProjects] = useState([])
  const [message, setMessage] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const supabase = createClientComponentClient()




    // get favourites
    useEffect(() => {
        async function getFavourites() {
            const { data, error } = await supabase
            .from('favourites')
            .select()
            .eq('user_id', user.id)

            if (error) {
                console.log(error)
            }

            if (data) {
                setFavouriteProjects(data);
                const isFav = data.some(fav => fav.project_id === projectId)
                setIsFavourite(isFav)
            }
            setIsLoading(false)
        }
        if (user) {
            getFavourites()
        }
    }, [user, projectId, supabase])







    // add favourites    
    const addFavourite = async () => {
        const { error } = await supabase
        .from('favourites')
        .upsert({
            id: uuidv4(),
            created_at: new Date().toISOString(),
            project_id: projectId,
            user_id: user.id
        })
        .single()

        if (error) {
            console.log(error)
            setIsFavourite(false)
        } else {
            setIsFavourite(true)
            setMessage('Added to Favourites')
            setTimeout(() => setMessage(''), 2000)
        } 
    }





    // delete favourites
    const deleteFavourite = async () => {
        const { error } = await supabase
        .from('favourites')
        .delete()
        .eq('project_id', projectId)
        .eq('user_id', user.id);

        if (error) {
            console.log(error)
        } else {
            setIsFavourite(false)
            setMessage('Removed from Favourites')
            setTimeout(() => setMessage(''), 2000)
        }
    }






    const handleClick = async () => {
        setIsClicked(!isClicked)
        setIsFavourite(prevFavourite => !prevFavourite)
    
        if (isFavourite) {
            await deleteFavourite()
        } else {
            await addFavourite()
        }
      }




  
  return (
    <>
        <button className={className} onClick={handleClick}> 
        {isLoading ? null : (isFavourite ? 
          <FaHeart className="cursor-pointer" size={24} color="red"/> : 
          <FaRegHeart className="cursor-pointer" size={24} color="red"/>
        )}
        </button>

        <div className='absolute right-16 -top-20'>
            {message && <span className='bg-nightSky text-stoneGray p-2 rounded-md'>{message}</span>}         
        </div>
    </>


  )
}

export default ProjectFavouriteButton
































