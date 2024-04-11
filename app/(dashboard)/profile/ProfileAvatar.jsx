"use client"

import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from 'next/image';

const ProfileAvatar = ({ url, size }) => {
    const [signedUrl, setSignedUrl] = useState(null);
    const [error, setError] = useState(null);
    const supabase = createClientComponentClient();

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
                }
                if (data && data.length > 0) {  
                    // console.log("Signed URL:", data[0]);
                    setSignedUrl(data[0].signedUrl);
                } else {
                    setError('Image not found or access denied');
                }
            } catch (error) {
                console.error('Error generating signed URL:', error.message);
                setError('Error generating signed URL');
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
        <div className='max-w-min flex flex-col gap-4'>
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
                <div className='h-14 w-14 bg-shade'>

                </div>
            )}
        </div>
    );
};

export default ProfileAvatar;













