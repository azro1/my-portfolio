"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useEffect, useRef } from "react";
import { useRouter } from "next/navigation";


// server actions
import { getRegFlag } from "../actions";
import { deleteRegFlag } from "../actions";


const RefreshOnLoad = () => {
    const supabase = createClientComponentClient()
    const router = useRouter()
    const hasDeletedRegFlag = useRef(false);



    // get user
    useEffect(() => {
            const fetchUser = async () => {
                try {


                    const hasMadeApiCall = await getRegFlag();
                    if (!hasMadeApiCall) return;
                    

                    const { data: { user } } = await supabase.auth.getUser()
                    
                    if (user) {
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
                    

                    if (!hasDeletedRegFlag.current) {
                        await deleteRegFlag();
                        hasDeletedRegFlag.current = true;
                    }


                } catch (error) {
                    console.error("Unexpected error fetching user:", error);
                }
            };
            fetchUser();
    }, [router, supabase]);



}

export default RefreshOnLoad
