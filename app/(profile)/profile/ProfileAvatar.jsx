"use client"

import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from 'next/image';
import { FaUserCircle } from "react-icons/fa";


const ProfileAvatar = ({ url, size }) => {
    const [signedUrl, setSignedUrl] = useState(null);
    const [error, setError] = useState(null);
    const supabase = createClientComponentClient();
    const [isLoading, setIsLoading] = useState(true);


    // the temporary URL is used to create a signed URL using Supabase's createSignedUrls function. This signedURL is then used to display the image in the ProfileAvatar component which we pass through as a prop.
    useEffect(() => {
        const fetchSignedUrl = async () => {
            try {
                const { data, error } = await supabase
                    .storage
                    .from('avatars')
                    .createSignedUrls([url], 60, { download: true }); // Expires in 60 seconds
    
                if (error) {
                    setError(error.message);
                    setIsLoading(false)
                }
                if (data && data.length > 0) {  
                    // console.log("Signed URL:", data[0]);
                    setIsLoading(false)
                    setSignedUrl(data[0].signedUrl);
                } else {
                    setError('Image not found or access denied');
                }
            } catch (error) {
                console.error('Error generating signed URL:', error.message);
                setError('Error generating signed URL');
                setIsLoading(false)
            }
        };

        if (url) {
            fetchSignedUrl();
        }
    }, [url]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div>
            {isLoading ? (
                <img src="images/navbar/avatar/loader.gif" alt="" />
            ) : (
                <>
                    {signedUrl ? (
                        <div className='h-14 w-14 relative'>
                            <Image
                                src={signedUrl} // Use the signed URL here
                                alt="Avatar"
                                fill={true}
                                quality={100}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </div>
                    ) : (
                       <FaUserCircle size={56} color="gray"  />
                    )}
                </>  
            )}
        </div>
    );
};

export default ProfileAvatar;













