"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

// components
import Modal from "@/app/components/Modal";
import { useMessage } from "@/app/hooks/useMessage";




const DeleteAccountButton = ({ id }) => {
    const [showModal, setShowModal] = useState(false);
    const [confirmationText, setConfirmationText] = useState('');
    const [isDisabled, setIsDisabled] = useState(true);

    const supabase = createClientComponentClient();
    const router = useRouter();
    const { changeMessage } = useMessage();
    const modalFormRef = useRef()




    // close modal form if user clicks outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            const clickedOutsideMenu = modalFormRef.current && !modalFormRef.current.contains(event.target)

            if (clickedOutsideMenu && showModal) {
                setShowModal(false)
            }

        }
        document.addEventListener("click", handleClickOutside);
        return () => {
            document.removeEventListener("click", handleClickOutside);
        };
    }, [showModal]);




    // watch input value and toggle disabled
    useEffect(() => {
        if (confirmationText === "I want to delete my account") {
            setIsDisabled(false)
        } else {
            setIsDisabled(true)
        }
    }, [confirmationText])




    // first confirm user is certain they want to delete thier account
    const handleDeleteConfirmation = () => {
        setShowModal(true)
    }



    // handle account deletion
    const handleDeleteUserAccount = async (e) => {
        e.preventDefault();

        // Call rpc function to permanently delete users account
        const { error } = await supabase.rpc('delete_user_account', {
            uid: id
        })

        if (!error) {
            changeMessage('success', 'Your account was deleted');
            setShowModal(false);
            await supabase.auth.signOut();
            router.push("/login");
        } else {
            console.error("Error deleting account:", error.message);
        }
    }



    return (
        <>
            {showModal && (
                <Modal
                    className='bg-softGray p-6 sm:p-10 w-[420px] mx-auto rounded-md sm:rounded-xl'
                    backdrop='bg-modal-translucent-dark'
                >
                    <form onSubmit={handleDeleteUserAccount} ref={modalFormRef}>
                        <label className='block mb-2 text-xl font-medium'>Delete your account</label>
                        <p className='mb-3 font-light'>This will permanently delete your account and all associated data. Type <span className='font-medium text-black'>I want to delete my account</span> to confirm</p>
                        <input
                            className='w-full p-2.5 px-4 rounded-md border-[1px] border-gray-300'
                            type='text'
                            placeholder='I want to delete my account'
                            spellCheck={false}
                            autoFocus={true}
                            onChange={(e) => setConfirmationText(e.target.value)}
                        />
                        <button
                            type="submit"
                            className={`mt-3 bt py-2.5 px-3 text-cloudGray font-semibold bg-red-600 rounded-lg ${!isDisabled ? 'cursor-pointer opacity-100' : 'cursor-default opacity-60'}`}
                            disabled={isDisabled}
                        >
                            Delete Account
                        </button>
                    </form>
                </Modal>
            )}


            <button
                className='btn-small text-[17px] text-cloudGray bg-red-700 hover:bg-red-600 transition-colors duration-200 rounded-md'
                onClick={handleDeleteConfirmation}
            >
                Delete Account
            </button>
        </>
    )
}

export default DeleteAccountButton
