import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';

// components
import ProfileHeader from "../ProfileHeader";
import ProjectsViewedList from '../ProjectsViewedList';
import ForumChatList from "../ForumChatList";
import FavouriteProjectList from "../FavouriteProjectList";

const Profile = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
      <div className='overflow-y-scroll hide-scrollbar h-[90vh] pb-24 pt-48 xl:pb-0 xl:pt-32'>
        <ProfileHeader title={'My Profile'} subheading={'This is your profile dashboard. Here you can view and edit your most recent activity.'} showAvatar={true} />
        

        {user && (
          <div className="pt-16">
            <h2 className='text-cloudGray font-medium text-1.375 md:text-2xl'>Activity Feed</h2>
            <p className='mt-3 leading-normal text-charcoalGrayLight md:text-lg'>Your recent activity on the website, including any projects you have viewed, your favourite projects and your chat history.</p>
            
            <div className='pt-16 grid grid-cols-1 gap-16 grid-flow-row auto-rows-max'>
                <ForumChatList user={user} />
                <ProjectsViewedList user={user}  />
                <FavouriteProjectList user={user} />
            </div>
          </div>
        )}

    </div>
  );
};

export default Profile;
