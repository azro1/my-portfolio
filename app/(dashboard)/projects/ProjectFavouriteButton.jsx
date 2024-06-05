"use client"

import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';

const ProjectFavouriteButton = ({ className, id }) => {
  const [isClicked, setIsClicked] = useState(false)
  const [isFavourite, setIsFavourite] = useState(false);
  const [isNotFavourite, setIsNotFavourite] = useState(false);


  const handleClick = () => {
    setIsClicked(!isClicked)

    if (!isClicked) {
        setIsFavourite(true)
        setIsNotFavourite(false)

        const tooltipTimeout = setTimeout(() => {
            setIsFavourite(false)
            return clearTimeout(tooltipTimeout)
        }, 2000)

    } else {
        setIsFavourite(false)
        setIsNotFavourite(true)

        const tooltipTimeout = setTimeout(() => {
            setIsNotFavourite(false)
            return clearTimeout(tooltipTimeout)
        }, 2000)
    }
    console.log(id)
  }

  
  return (
    <>
        <button className={className} onClick={handleClick}>  
            {isClicked ? <FaHeart className="cursor-pointer" size={24} color="red"/> : <FaRegHeart className="cursor-pointer" size={24} color="red"/>}
        </button>
        <div className='absolute right-16 -top-20'>
            {isFavourite && <span className='bg-primary text-secondary p-2 rounded-md'>Added to favorites</span> }
            {isNotFavourite && <span className='bg-primary text-secondary p-2 rounded-md'>Removed from favorites</span>}
        </div>
    </>


  )
}

export default ProjectFavouriteButton
