import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { client } from "@/app/lib/db";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";

// components
import RegisterForm from "./RegisterForm";


const Page = async () => {
    const supabase = createServerComponentClient({ cookies });
    const { data: { user } } = await supabase.auth.getUser()

    const encryptedId = cookies().get('_reg_tkn')?.value;
    const accessToken = await client.get(`token-${encryptedId}`);

    if (!encryptedId) {
        return redirect('/auth/login');
    }

    if (user) {
        try {
            const { data, error } = await supabase
            .from('profiles')
            .select('is_reg_complete')
            .eq('id', user.id)
            .single();
    
            if (error) {
                console.error(error);
                return;
            } 
    
            if (data?.is_reg_complete && !accessToken) {
                console.log('redirecting to home in register form server ...')
                redirect('/');
            } else if (!data?.is_reg_complete && !accessToken) {
                console.log('signing out in register form server ...')
                await supabase.auth.signOut();
            }
        } catch (error) {
            console.log(error.message)
        }
    
    }

    return (
        <>
            <RegisterForm />
        </>
    )
}

export default Page