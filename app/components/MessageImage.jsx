"use client";

import { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";

const MessageImage = ({ filePath, width = 200, height = 200, className='' }) => {
  const [signedUrl, setSignedUrl] = useState(null);
  const [error, setError] = useState(null);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const getSignedUrl = async () => {
      try {
        const { data, error } = await supabase
          .storage
          .from("messages")
          .createSignedUrls([filePath], 60, { download: true });

        if (error) setError(error.message);
        else setSignedUrl(data?.[0]?.signedUrl || null);
      } catch (err) {
        console.error(err.message);
        setError("Error generating signed URL");
      }
    };

    if (filePath) getSignedUrl();
  }, [filePath]);

  if (error) return <p className="text-red-500 text-xs">Error loading image</p>;

  return (
    signedUrl && (
      <Image
        src={signedUrl}
        alt="Uploaded chat image"
        width={width}
        height={height}
        className={`${className}`}
        priority
      />
    )
  );
};

export default MessageImage;
