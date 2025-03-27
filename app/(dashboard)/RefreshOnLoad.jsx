"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect } from "react";
import { useRouter } from "next/navigation";


const RefreshOnLoad = ({ registrationCookie }) => {
    const supabase = createClientComponentClient()
    const router = useRouter()

    // get user
    useEffect(() => {
        const fetchUser = async () => {

            // on initial component mount server wont pick up the cookie allowing table check and page refresh thereafter it will and will exiting early preventing any further tabkle checks
            if (registrationCookie) return;

            try {
                const { data: { user } } = await supabase.auth.getUser()

                if (user) {
                    console.log("im checking in the table......");
                    const { data, error } = await supabase
                        .from('profiles')
                        .select('is_reg_complete')
                        .eq('id', user.id)
                        .single();

                    if (error) {
                        console.error(error);
                        return;
                    }

                    if (data?.is_reg_complete) {
                        router.refresh();
                    }
                }

            } catch (error) {
                console.error("Unexpected error fetching user:", error);
            }
        };
        fetchUser();
    }, [registrationCookie, supabase, router]);



}

export default RefreshOnLoad
