"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useState, useEffect } from 'react'
import { useRouter } from "next/navigation";



// components
import Modal from './Modal'


const PhoneForm = ({ user, profile }) => {
    const [phone, setPhone] = useState('')
    const [draftPhone, setDraftPhone] = useState('');
    const [showForm, setShowForm] = useState(false)
    const [formError, setFormError] = useState(null)
    const [isUpdating, setIsUpdating] = useState(false)
    
    const router = useRouter();



    // populate form fields from profiles table
    useEffect(() => {
        if (user && profile) {
            setDraftPhone(profile.phone || '')
            setPhone(profile.phone || '')
        }
    }, [user, profile])



    // function to convert uk mobile numbers into E.164 format
    const convertToInternationalFormat = (phoneNumber) => {
        // replace local prefix '0' with international code '+44' if it exists
        if (phoneNumber.startsWith('0')) return phoneNumber.replace('0', '+44');
    
        // return as is if already in international format
        return phoneNumber.startsWith('+') ? phoneNumber : phoneNumber;
    };


    // Phone number validation function
    const isValidPhoneNumber = (phoneNumber) => {
        // Check that the phone number follows E.164 format
        const phoneRegex = /^(0\d{10}|\+\d{1,3}\d{1,14})$/;
        return phoneRegex.test(phoneNumber);
    }


    // update last name
    const handlePhoneUpdate = async () => {
        setIsUpdating(true)
        
        if (!draftPhone) {
            setIsUpdating(false)
            setFormError('Please enter your new phone number.')
            setTimeout(() => setFormError(null), 2000)
            return
        } else if (!isValidPhoneNumber(draftPhone)) {
            setIsUpdating(false)
            setFormError('Invalid phone number.')
            setTimeout(() => setFormError(null), 2000)
            return
        } else if (phone === draftPhone) {
            setIsUpdating(false)
            setFormError('Please update your phone number before saving.')
            setTimeout(() => setFormError(null), 2000)
            return
        } else {

            const convertedPhoneNumber = convertToInternationalFormat(draftPhone);
            // store phone temporarily in local storage
            localStorage.setItem('phone', convertedPhoneNumber)
    
            try {
                const supabase = createClientComponentClient()
                const { data, error } = await supabase.auth.updateUser({
                    phone: convertedPhoneNumber
                })
        
                if (error) {
                    throw new Error(error.message)
                }
        
                if (data) {
                    router.push('/profile/verify-phone-otp')
                }  
            } catch (error) {
                console.log(error.message)
            }
    
            setTimeout(() => {
                setShowForm(false)
                setPhone(convertedPhoneNumber)
            }, 1000)
        }
    }


    // handleOpenForm function
    const handleOpenForm = () => {
        setShowForm(true)
        setIsUpdating(false)
    }


    // handleCloseForm function
    const handleCloseForm = () => {
        setShowForm(false)
        setDraftPhone(phone)
    }

    // prevent enter submission
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault()

        // Allow only numeric keys, backspace, and arrow keys
        } else if (!/[0-9+]/.test(e.key) && !['Backspace', 'ArrowLeft', 'ArrowRight', 'Delete'].includes(e.key)) {
          e.preventDefault();
        }
    }


    return (
        <div>
            <div className='my-4'>
                <div className="flex items-center justify-between pb-1">
                    <span className="inline-block text-stoneGray">Phone Number</span>
                    <span className='text-red-600 cursor-pointer' onClick={handleOpenForm}>
                        Edit
                    </span>
                </div>
                <p className="text-nightSky frostWhitespace-normal break-words">{phone}</p>
            </div>
  
            {showForm && (
                <Modal>
                    <form>
                        <label>
                            <span className='block mb-2 text-xl'>Edit Phone Number</span>
                            <p className='mb-3'>Please enter your new phone number. Ensure it's a valid 11-digit mobile number starting with 0 for local, or include the international code (e.g., +44 for UK, +1 for US). This number will be used for account verification purposes.</p>
                            <input
                                className='w-full p-2.5 rounded-md border-2'
                                type='tel'
                                value={draftPhone || ''}
                                placeholder='Phone'
                                spellCheck={false}
                                autoFocus={true}
                                maxLength={15}
                                onChange={(e) => setDraftPhone(e.target.value)}
                                onKeyDown={handleKeyDown}
                            />
                        </label>
                    </form>
                    <div className='flex items-center'>
                        <button className='btn-small bg-saddleBrown mt-3 mr-2' onClick={handleCloseForm}>Cancel</button>
                        <button className='btn-small bg-saddleBrown mt-3' onClick={handlePhoneUpdate}>
                            {isUpdating ? (
                                <div className='flex items-center gap-2'>
                                    <img className="w-5 h-5 opacity-50" src="../../images/loading/spinner.svg" alt="Loading indicator" />
                                    <span>Save</span>
                                </div>
                            ) : (
                                'Save'
                            )}
                        </button>
                    </div>
                    {formError && <p className='modal-form-error'>{formError}</p>}
                </Modal>
            )}
        </div>
    )
}

export default PhoneForm
