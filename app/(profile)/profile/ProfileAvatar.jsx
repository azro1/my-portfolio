"use client"

import React, { useEffect, useState } from 'react';
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from 'next/image';
import { FaUserCircle } from "react-icons/fa";


const ProfileAvatar = ({ url, size, lgSize, phSize }) => {
    const [signedUrl, setSignedUrl] = useState(null);
    const [error, setError] = useState(null);
    const supabase = createClientComponentClient();
    const [isLoading, setIsLoading] = useState(false);

    // the temporary URL is used to create a signed URL using Supabase's createSignedUrls function. This signedURL is then used to display the image in the ProfileAvatar component which we pass through as a prop.
    useEffect(() => {
        const fetchSignedUrl = async () => {
            setIsLoading(true)
            try {
                const { data, error } = await supabase
                    .storage
                    .from('avatars')
                    .createSignedUrls([url], 60, { download: true }); // Expires in 60 seconds
    
                if (error) {
                    setError(error.message);
                    setIsLoading(false)
                } else {
                    setSignedUrl(data && data.length > 0 ? data[0].signedUrl : null);
                }
            } catch (error) {
                console.error(error.message);
                setError('Error generating signed URL');
            } finally {
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
                <div className={`overflow-hidden ${lgSize} bg-primary rounded-full`}></div>
            ) : (
                <>
                    {signedUrl ? (
                        <div className={`overflow-hidden rounded-full ${size} relative`}>
                            <Image
                                src={signedUrl}
                                alt="Avatar"
                                width={80}
                                height={70}
                                quality={100}
                            />
                        </div>
                    ) : (
                        <FaUserCircle size={phSize} color="gray" />
                    )}
                </>
            )}
        </div>
    );
};

export default ProfileAvatar;













