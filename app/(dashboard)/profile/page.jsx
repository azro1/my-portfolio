import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";

// components
import ProfileForm from "./ProfileForm";

const Profile = async() => {

  const supabase = createServerComponentClient({ cookies })
  const { data: { user } } = await supabase.auth.getUser()
  

  return (
    <div className="max-w-screen-lg mx-auto h-screen">
       <ProfileForm user={user} />
    </div>
  )
}

export default Profile

