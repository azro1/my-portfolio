// components
import ProfileHeader from "./ProfileHeader";
import ProjectsViewedList from './ProjectsViewedList';
import CommentList from './CommentList';

const Profile = () => {
  return (
      <div>
        <ProfileHeader />

        <div className='mt-12'>
          <div>
            <h2 className='text-center text-2xl font-rubik text-hint my-6'>Activity Feed</h2>
            <div className='flex flex-col text-center lg:flex-row'>
                <ProjectsViewedList  />
                <CommentList />
            </div>
          </div>

        </div>
    </div>
  );
};

export default Profile;
