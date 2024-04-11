"use client"

// Profile.jsx
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// components
import ProfileAvatar from "./ProfileAvatar";
import ProfileHeader from "./ProfileHeader";

const Profile = () => {
    const [user, setUser] = useState('');
    const [first_name, setFirstName] = useState(null);
    const [full_name, setFullName] = useState(null);
    const [avatar_url, setAvatarUrl] = useState(null);
    const [email, setEmail] = useState(null);
    const [uploadSuccess, setUploadSuccess] = useState(null);
    const [updateSuccess, setUpdateSuccess] = useState(null);
    const [error, setError] = useState(null);
    const [selectedFile, setSelectedFile] = useState(null);
    const [uploading, setUploading] = useState(false);
    const [pageFirstName, setPageFirstName] = useState(null);

    const supabase = createClientComponentClient();
    

    // when a user selects a file this function is invoked and the file is stored in state, the URL.createObjectURL function takes a File object as an input and creates a temporary URL that represents the file's content. It creates a URL that can be used to reference the file directly in the browser without uploading it to a server. This is stored as the value to avatar_url which is then passed as a prop to the ProfileAvatar component
    const handleFileInputChange = async (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);

      try {
        const { data, error } = await supabase
          .storage
          .from('avatars')
          .createSignedUrls([file.name], 60, { download: true }); // Expires in 60 seconds
    
        if (error) {
          throw new Error(error.message);
        }
        if (data && data.length > 0) {
          setAvatarUrl(data[0].signedUrl);
        } else {
          throw new Error('Image not found or access denied');
        }
      } catch (error) {
        setError(error.message)
        console.error('Error generating signed URL:', error.message);
        // Handle error appropriately
      }
    };


    
    // get user session object as soon as component loads, set user state then call getProfile
    useEffect(() => {
        async function getSession() {
            const { data: { session } } = await supabase.auth.getSession();
            if (session) {
                setUser(session.user);
            }
        }
        getSession();
    }, []);
    
    useEffect(() => {
        if (user && user.id) {
            getProfile();
        }
    }, [user && user.id]);
    
    
    

    // gets a users profile row with the id that is equal to the users id who is signed in and store properties in state whose values are being pre-poulated in the input fields as we have 2 way binding unsing controlled inputs
    const getProfile = async () => {
      setError("");
      setUpdateSuccess('');

      try {
          const { data, error } = await supabase.from('profiles')
              .select()
              .eq("id", user.id)
              .limit(1);
          if (error) {
              throw new Error(error.message);
          }
          if (data && data.length > 0) {
              const profileData = data[0];
              setFirstName(profileData.first_name);
              setFullName(profileData.full_name);
              setAvatarUrl(profileData.avatar_url);
              setEmail(profileData.email);
              setPageFirstName(profileData.first_name)

              setError("");
          } else {
              throw new Error('You currently have no profile.');
          }
      } catch (error) {
          setError(error.message);
          console.log(error.message);
      }
  };

    
  // users can edit the state values in the form input fields and then when the form is submitted we call this function to update the profiles table in supabase
  const updateProfile = async ({ first_name, full_name, avatar_url, email }) => {
    setUpdateSuccess("");
    setUploadSuccess("");
    setError("");
   
    try {
        const updatedProfile = {
            id: user.id,
            first_name,
            full_name,
            avatar_url,
            email,
            updated_at: new Date().toISOString()
        };

        const { error } = await supabase
            .from('profiles')
            .upsert(updatedProfile);

        if (error) {
            throw new Error(error.message);
        } else {
            location.reload()
          }
        
        if (first_name || full_name || email) {
            setUpdateSuccess('Profile updated!');
        } else {
            setUploadSuccess('Avatar uploaded successfully.');
        }

        function clearSuccessMsg() {
          setUpdateSuccess('')
          setUploadSuccess('')
        }
        setTimeout(clearSuccessMsg, 1500)

    } catch (error) {
        console.error('Error updating profile:', error);
        setError(error.message);
    }
};

    // we use the file that a user selects to construct a file path which we use to uload the file to the avatars bucket, once the operation is complete we upadte the users profile again this time setting the value of the avatar_url property to the filePath which was just uploaded to the bucket and use await to wait until the operation is complete
    const uploadAvatar = async () => {
      setUpdateSuccess('');
      setUploadSuccess('');
      setError('')

      try {
          setUploading(true);
          if (!selectedFile) {
              throw new Error('You must select an image to upload.');
          }
          const fileExt = selectedFile.name.split('.').pop();
          const filePath = `${user.id}-${Math.random()}.${fileExt}`;
          const { error: uploadError } = await supabase.storage
              .from('avatars')
              .upload(filePath, selectedFile, { upsert: true });
          if (uploadError) {
              throw uploadError;
          } else {
            location.reload()
          }
          await updateProfile({ avatar_url: filePath }); // Wait for profile update

      } catch (error) {
          setError(error.message);
      } finally {
          setUploading(false);
      }
  };
  
    return (
        <main className='mt-4.5 lg:mb-28'>
         
         <ProfileHeader user={user} />

            <div className="flex flex-col-reverse gap-8 md:flex-row  mt-16">

                    <div className="flex-1 sm:max-w-xs md:mx-auto">
                      <form>
                          <label>
                              <span className='mt-4 mb-2 text-sm font-os text-secondary block'>Full Name</span>
                              <input
                                  className="w-full p-2.5 rounded-md"
                                  type="text"
                                  value={full_name || ''}
                                  placeholder="Full Name"
                                  spellCheck='false'
                                  onChange={(e) => setFullName(e.target.value)}
                              />
                          </label>
                          <label>
                              <span className='mt-4 mb-2 text-sm font-os text-secondary block'>First Name</span>
                              <input
                                  className="w-full p-2.5 rounded-md"
                                  type="text"
                                  value={first_name || ''}
                                  placeholder="First Name"
                                  spellCheck='false'
                                  onChange={(e) => setFirstName(e.target.value)}
                              />
                          </label>
                          <label>
                              <span className='max-w-min mt-4 mb-2 text-sm font-os text-secondary block'>Email</span>
                              <input
                                  className="w-full p-2.5 rounded-md"
                                  type="url"
                                  value={email || ''}
                                  placeholder="Email"
                                  spellCheck='false'
                                  onChange={(e) => setEmail(e.target.value)}
                              />
                          </label>
    
                          {error && <div className="error mt-2">* {error}</div>}
                          {updateSuccess && <div className="success mt-2">* {updateSuccess}</div>}
                      </form>
                      <button
                          className="btn block mt-4 bg-hint"
                          onClick={() => updateProfile({ first_name, full_name, email })}
                          >
                          Update
                      </button>
                    </div>


                    <div className="max-w-xs md:ml-auto flex flex-col gap-6">
                        <h2 className="text-2xl font-rubik font-b text-secondary text-center mb-4">Upload an image</h2>

                    <div>
                        <div className="mb-4">
                            <ProfileAvatar
                                url={avatar_url}
                                size={150}
                            />
                        </div>
                        <input
                            className='text-white'
                            type="file"
                            id="single"
                            accept="image/*"
                            onChange={handleFileInputChange}
                            disabled={uploading}
                        />
                          {uploadSuccess && <div className="success mt-2">* {uploadSuccess}</div>}
                        <button className="btn bg-hint max-w-max primary block mt-3.5" onClick={uploadAvatar} disabled={uploading}>
                            {uploading ? 'Uploading ...' : 'Upload'}
                        </button>
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Profile;



