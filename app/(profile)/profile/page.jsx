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
      <div className='flex-1 overflow-y-scroll hide-scrollbar h-profile-page-height'>
        <ProfileHeader />
        <div className='mt-12'>
            <h2 className='profile-subheading text-center my-16'>Activity Feed</h2>
            <div className='grid grid-cols-1 gap-20 lg:grid-cols-2 lg:gap-x-0 grid-flow-row auto-rows-max'>
                <ProjectsViewedList user={user}  />
                <CommentList user={user} />
                <FavouriteProjectList user={user} />
            </div>
        </div>

    </div>
  );
};

export default Profile;
