// components
import ProfileHeader from "./ProfileHeader";
import ProjectsViewedList from './ProjectsViewedList';
import CommentList from './CommentList';

const Profile = () => {
  return (
      <div>
        <ProfileHeader />

        <div className='mt-16'>
            <h2 className='text-center text-2xl font-b font-rubik text-hint'>Activity Feed</h2>
        </div>
        
        <div className='flex flex-col gap-8 text-center mt-10  lg:flex-row lg:gap-3'>
            <ProjectsViewedList  />
            <CommentList />
        </div>
    </div>
  );
};

export default Profile;
