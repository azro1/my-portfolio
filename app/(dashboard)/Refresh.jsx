"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";



const Reload = () => {
    const [user, setUser] = useState(null);
    const [isFlagChecked, setIsFlagChecked] = useState(false);

    const supabase = createClientComponentClient()
    const router = useRouter()
    


    // get user
    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { data, error } = await supabase.auth.getUser();
                if (error) {
                    setUser(null);
                    return;
                }
                setUser(data?.user || null);
            } catch (error) {
                console.error("Unexpected error fetching user:", error);
                setUser(null);
            }
        };
        fetchUser();
    }, [supabase]);



    // check if reg is completed if so refresh
    useEffect(() => {
        if (user && !localStorage.getItem('hasMadeApiCall')) {
            const checkRegistrationFlag = async () => {
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
                    
                    if (data?.is_reg_complete) {

                        const res = await fetch(`${location.origin}/api/auth/delete-reg-token`, {
                            method: 'POST',
                            headers: {
                              'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({ 
                                isRegComplete: true 
                            })
                        })
    
                        if (!res.ok) {
                           throw new Error(res.statusText)
                        }

                        const tokenResponse = await res.json();
                        if (res.status === 200 && tokenResponse.message === 'success') {
                          router.refresh();
                        }

                    }
                     
                    localStorage.setItem('hasMadeApiCall', 'true');

                } catch (error) {
                    console.log('reload profiles error:', error.message)
                }
            }
            checkRegistrationFlag();
        }
    }, [user, isFlagChecked, supabase, router]);

}

export default Reload
