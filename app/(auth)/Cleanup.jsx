"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect } from "react";
import { useRouter } from "next/navigation";


const Cleanup = () => {
    const router = useRouter();
    
    // remove reg flag after 2 seconds to givew enough time to display loading gif
    useEffect(() => {
        const hasVisitedRegPage = localStorage.getItem('hasVisitedRegPage') === 'true';
        if (hasVisitedRegPage) {
            setTimeout(() => localStorage.removeItem('hasVisitedRegPage'), 2000)
        }
    }, [])

    // get user
    useEffect(() => {
            const fetchUser = async () => {
                try {
                    const supabase = createClientComponentClient()
                    const { data: { user } } = await supabase.auth.getUser()
                    
                    if (user) {
                        const { data, error } = await supabase
                        .from('profiles')
                        .select('has_visited_reg, is_reg_complete')
                        .eq('id', user.id)
                        .single();
    
                        if (error) {
                            console.error(error);
                            return;
                        } 

                        if (data?.has_visited_reg && !data?.is_reg_complete) {
                            await supabase.auth.signOut();
                            router.refresh();
                        }
                    }
                    
                } catch (error) {
                    console.error("Unexpected error fetching user:", error);
                }
            };
            fetchUser();
    }, [router]);

}

export default Cleanup
