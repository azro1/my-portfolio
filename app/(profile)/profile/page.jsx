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
      <div>
        <ProfileHeader />

        <div className='mt-12'>
          <div>
            <h2 className='text-center text-2xl text-hint my-16'>Activity Feed</h2>
            <div className='flex flex-col gap-20 lg:gap-x-0 lg:gap-y-20 lg:flex-row lg:flex-wrap'>
                <ProjectsViewedList user={user}  />
                <CommentList user={user} />
                <FavouriteProjectList user={user} />
            </div>
          </div>

        </div>
    </div>
  );
};

export default Profile;
