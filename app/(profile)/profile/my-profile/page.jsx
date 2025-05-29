import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from 'next/headers';

// components
import ProfileHeader from "../../ProfileHeader";
import ProjectsViewedList from '../../ProjectsViewedList';
import ForumChatList from "../../ForumChatList";
import FavouriteProjectList from "../../FavouriteProjectList";
import Heading from "@/app/components/Heading";

const MyProfile = async () => {
  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()

  return (
      <div className='overflow-y-scroll hide-scrollbar h-[90vh] pt-40 px-[x-pad] xl:pt-36'>
        <ProfileHeader title={'My Profile'} subheading={'This is your profile dashboard. Here you can view and edit your most recent activity'} showAvatar={true} />
        

        {user && (
          <div className="pt-16">
            <Heading className='text-cloudGray font-medium text-lg md:text-xl'>
              Activity Feed
            </Heading>
            <p className='leading-normal text-charcoalGrayLight mt-3'>Your recent activity on the website, including any projects you have viewed, your favourite projects and your chat history</p>
            
            <div className='pt-8 grid grid-cols-1 gap-12 grid-flow-row auto-rows-max'>
                <ForumChatList user={user} />
                <ProjectsViewedList user={user}  />
                <FavouriteProjectList user={user} />
            </div>
          </div>
        )}

    </div>
  );
};

export default MyProfile;
