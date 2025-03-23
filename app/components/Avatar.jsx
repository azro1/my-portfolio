"use client"

import { useEffect, useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from 'next/image';


const Avatar = ({ url, width = 32, height = 32 }) => {
    const [signedUrl, setSignedUrl] = useState(null);
    const [error, setError] = useState(null);
    const supabase = createClientComponentClient();

    // The url that we take in as a prop is used to create a signed URL using Supabase's createSignedUrls function. This signedURL is then used in JSX to display the image.
    useEffect(() => {
        const fetchSignedUrl = async () => {
            try {
                const { data, error } = await supabase
                    .storage
                    .from('avatars')
                    .createSignedUrls([url], 60, { download: true }); // Expires in 60 seconds

                if (error) {
                    setError(error.message);
                } else {
                    setSignedUrl(data && data.length > 0 ? data[0].signedUrl : null);
                }
            } catch (error) {
                console.error(error.message);
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
        <>
            {signedUrl && (
                <div className='overflow-hidden rounded-full'>
                    <Image
                        src={signedUrl}
                        alt="a user avatar"
                        width={width}
                        height={height}
                        sizes="(max-width: 480px) 40px, (max-width: 768px) 60px, (max-width: 1024px) 80px, 100px"
                        quality={100}
                        priority
                    />
                </div>
            )}
        </>
    );
};

export default Avatar;













