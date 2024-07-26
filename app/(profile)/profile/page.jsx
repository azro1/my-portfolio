import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';

// components
import ProfileHeader from "./ProfileHeader";
import ProjectsViewedList from './ProjectsViewedList';
import CommentList from './CommentList';
import FavouriteProjectList from "./FavouriteProjectList";

const Profile = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
      <div className='flex-1 flex flex-col gap-6 overflow-y-scroll hide-scrollbar h-profile-page-height'>
        <ProfileHeader title={'My Profile'} subheading={'Here you can view and edit your recent activity, update your personal information, view your data and personalize your account settings.'} showAvatar={true} />
        
        {user && (
          <div className="bg-cloudGray p-4 pt-10">
            <h2 className='text-2xl text-nightSky font-b'>Activity Feed</h2>
            <p className='mt-3 text-base leading-normal'>Shows your recent activity on the website, including projects viewed, favourite projects and comments.</p>
            
            <div className='mt-10 grid grid-cols-1 gap-20 grid-flow-row auto-rows-max'>
                <CommentList user={user} />
                <ProjectsViewedList user={user}  />
                <FavouriteProjectList user={user} />
            </div>
          </div>
        )}

    </div>
  );
};

export default Profile;
