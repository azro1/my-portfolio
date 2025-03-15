import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { client } from "@/app/lib/db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// components
import UploadAvatar from "./UploadAvatar";


const Page = async () => {
    const supabase = createServerComponentClient({ cookies });
    const encryptedId = cookies().get('_reg_tkn')?.value;
    const accessToken = await client.get(`token-${encryptedId}`);

    if (!encryptedId) {
        return redirect('/auth/login');
    }

    if (!accessToken) {
        await supabase.auth.signOut();
    }

    return (
        <>
            <UploadAvatar />
        </>
    )
}

export default Page