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
      <div className='overflow-y-scroll hide-scrollbar h-[80vh]'>
        <ProfileHeader title={'My Profile'} subheading={'Here you can view and edit your recent activity, update your personal information and security preferences, view your data and personalize your privacy settings.'} showAvatar={true} />
        

        {user && (
          <div className="pt-16">
            <h2 className='text-2xl text-stoneGray font-b'>Activity Feed</h2>
            <p className='mt-3 text-base leading-normal text-ashGray'>Shows your recent activity on the website, including projects viewed, favourite projects and any comments you've made.</p>
            
            <div className='mt-10 grid grid-cols-1 gap-16 grid-flow-row auto-rows-max'>
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
