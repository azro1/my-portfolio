// components
import ProfileHeader from '../ProfileHeader';
import PasswordForm from './PasswordForm';

const Security = () => {
    return (
        <div className='flex-1 flex flex-col gap-6 overflow-y-scroll hide-scrollbar h-profile-page-height relative'>

            <div>
                <ProfileHeader title={'Security'} subheading={'Update Your Security Preferences.'} showAvatar={false} />
            </div>


            <div className="bg-cloudGray p-4 pt-10">
                <h2 className='text-xl text-nightSky font-b'>My Account</h2>

                <div className='flex flex-col gap-6'>
                    <div className='mt-6 bg-frostWhite p-4'>
                        <PasswordForm />
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Security
