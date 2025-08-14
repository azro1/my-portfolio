"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { FiAlertTriangle } from "react-icons/fi";

// components
import Modal from "@/app/components/Modal";
import { useMessage } from "@/app/hooks/useMessage";

const DeleteAccountButton = ({ id }) => {
    const [showModal, setShowModal] = useState(false);
    const [confirmationText, setConfirmationText] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isButtonDisabled, setIsButtonDisabled] = useState(true);
    const supabase = createClientComponentClient();
    const router = useRouter();
    const { changeMessage } = useMessage();
    const modalFormRef = useRef();

    // Close modal if click outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalFormRef.current && !modalFormRef.current.contains(event.target) && showModal) {
                handleCloseModal();
            }
        }
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [showModal]);

    // Enable button only if exact confirmation text matches
    useEffect(() => {
        setIsButtonDisabled(confirmationText !== "I want to delete my account");
    }, [confirmationText]);

    // Open modal and reset states
    const handleDeleteConfirmation = () => {
        setConfirmationText('');
        setIsLoading(false);
        setIsButtonDisabled(true);
        setShowModal(true);
    };

    // Close modal and reset states
    const handleCloseModal = () => {
        setShowModal(false);
        setConfirmationText('');
        setIsLoading(false);
        setIsButtonDisabled(true);
    };

    // Handle actual delete
    const handleDeleteUserAccount = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const { error } = await supabase.rpc('delete_user_account', { uid: id });

        if (!error) {
            changeMessage('success', 'Your account was deleted');
            handleCloseModal();
            await supabase.auth.signOut();
            router.push("/login");
        } else {
            console.error("Error deleting account:", error.message);
            setIsLoading(false);
        }
    };

    return (
        <div>
            {showModal && (
                <Modal
                    className='bg-softGray p-6 sm:p-10 w-[420px] mx-auto rounded-md sm:rounded-xl'
                    backdrop='bg-modal-translucent-dark'
                >
                    <form onSubmit={handleDeleteUserAccount} ref={modalFormRef}>
                        <h3 className='block text-xl font-medium'>Confirm to delete account</h3>
                        <div className='flex items-start gap-2 mt-4 my-3'>
                            <div>
                               <FiAlertTriangle color="black" fill="#FFD700" size={23} />
                            </div>
                            <p>
                                This will permanently delete your account and all associated data. Type <span className='font-medium text-black'>I want to delete my account</span> to confirm
                            </p>
                        </div>

                        <input
                            className='w-full p-2.5 px-4 rounded-md border-[1px] border-gray-300'
                            type='text'
                            placeholder='I want to delete my account'
                            spellCheck={false}
                            autoFocus={true}
                            onChange={(e) => setConfirmationText(e.target.value)}
                            value={confirmationText}
                        />
                        <div className='flex items-center mt-3 gap-3'>
                            <button
                                type="button"
                                className='w-1/2 py-2.5 px-3 text-cloudGray font-semibold bg-charcoalGray rounded-lg'
                                onClick={handleCloseModal}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                className={`w-1/2 py-2.5 px-3 text-cloudGray font-semibold bg-red-800 rounded-lg ${isButtonDisabled || isLoading ? 'opacity-65' : 'opacity-100'}`}
                                disabled={isButtonDisabled || isLoading}
                            >
                                {isLoading ? (
                                    <div className='flex items-center justify-center h-[24px]'>
                                        <Image
                                            className='opacity-65'
                                            width={22}
                                            height={22}
                                            src="/images/loading/reload.svg"
                                            alt="Loading spinner"
                                        />
                                    </div>
                                ) : (
                                    'Delete'
                                )}
                            </button>
                        </div>
                    </form>
                </Modal>
            )}

            <button
                className='btn-small text-[17px] text-cloudGray bg-red-800 hover:bg-red-700 transition-colors duration-200 rounded-md'
                onClick={handleDeleteConfirmation}
            >
                Delete Account
            </button>
        </div>
    )
}

export default DeleteAccountButton
