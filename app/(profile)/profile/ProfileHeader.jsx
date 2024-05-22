import ProfileAvatar from "./ProfileAvatar";
import { FaUserCircle } from "react-icons/fa";

const ProfileHeader = ({ user, isLoading, avatar_url, first_name }) => {
  return (
      <>
         {user && user.app_metadata.provider !== "email" ? ( 
            <div className='flex-1 flex flex-col items-center text-center gap-3'>
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
                                 <FaUserCircle size={80} color="gray" />
                           </div>
                        )}
                     </>
               )}
               
                <div>
                  <h2 className='subheading text-hint mb-3'>{`Hi, ${first_name}`}</h2>
                  <p className='text-base'>Welcome to your Profile dashboard. Get started by personalizing your account settings and exploring our features.</p>  
                </div>
            </div>
         )
      :
         (
            <div className='flex-1 flex flex-col items-center text-center gap-3'>
               <ProfileAvatar
                  url={avatar_url}
                  size={'h-20 w-20'}
                  phSize={80}
               />
                <div>
                  <h2 className='subheading text-hint mb-3'>{`Hi, ${first_name}`}</h2>
                  <p className='text-base'>Welcome to your Profile dashboard. Get started by personalizing your account settings and exploring our features.</p>  
                </div>            
            </div>
         )}
      </>
  )
}

export default ProfileHeader
