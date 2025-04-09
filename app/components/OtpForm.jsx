
// components
import { useEffect } from "react"
import Button from "./Button"
import Timer from "./Timer"

const OtpForm = ({
    containerStyles,
    handleSubmit,
    onSubmit,
    title,
    email,
    phone,
    fields,
    register,
    handleInputChange,
    handleKeyDown,
    errors,
    isLoading,
    trigger, 
    formState, 
    authGroupEmailRef, 
    profileEmailRef, 
    profilePhoneRef, 
    isButtonDisabled, 
    isVerified 
}) => {

const maskedPhone = phone ? `********${phone.slice(-4)}` : '';

  return (
    <div className={containerStyles}> 
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h2 className='text-3xl leading-tight mb-3 font-b text-nightSky'>{title}</h2>

            {email && (
                <p className='max-w-xs mb-4'>A verification code has been sent to <span className='text-black'>{email}</span>. Please enter the code into the fields below</p>
            )}

            {phone && (
                <p className='max-w-xs mb-4'>A verification code has been sent to the number ending in <span className='text-black'>{maskedPhone}</span>. Please enter the code into the fields below</p> 
            )}

            <div className='flex gap-2'>
                {fields.map((field, index) => (
                    <div key={field.id}>
                        <label htmlFor={`codes[${index}].code`} className="max-w-min mb-2 text-base text-ashGray"></label>
                        <input
                            transition={{ type: 'spring', stiffness: 150, damping: 25 }}
                            {...register(`codes[${index}].code`)}
                            id={`codes[${index}].code`}
                            type='tel'
                            maxLength={1}
                            className={`text-center w-[48px] h-[48px] rounded-md border-[1px] border-gray-300 text-lg text-nightSky ${(formState.isSubmitted && typeof errors.codes === 'object' && !Array.isArray(errors.codes)) || (formState.isSubmitted && Array.isArray(errors.codes) && errors.codes.find((error) => error?.code?.message)) ? 'border-red-600' : 'border-gray-300'}`}
                            onChange={(e) => {
                                handleInputChange(e, index)
                                handleKeyDown(e, index)
                                trigger('codes');
                            }}
                            onKeyDown={(e) => handleKeyDown(e, index)}
                        />
                    </div>
                ))}
            </div>
            
            {(formState.isSubmitted && typeof errors.codes === 'object' && !Array.isArray(errors.codes)) && (
                <p className="text-red-600 mt-2 text-sm">
                    {errors.codes.message}
                </p>
            )}
            
            {formState.isSubmitted && Array.isArray(errors.codes) && errors.codes.find((error) => error?.code?.message) ? (
                <p className="text-red-600 mt-2 text-sm">
                    {errors.codes.find((error) => error?.code?.message)?.code?.message}
                </p>
            ) : null}


            <div className='mt-5 mb-3'>
               <Button
                    isLoading={isLoading}
                    padding='p-3'
                    width='w-full'
                    backgroundColor='bg-nightSky'
                    text='Verify'
               />
            </div>
        </form>

        <Timer 
            authGroupEmailRef={authGroupEmailRef}
            profileEmailRef={profileEmailRef}
            profilePhoneRef={profilePhoneRef}
            isButtonDisabled={isButtonDisabled}
            isVerified={isVerified}
        />
    </div>
  )
}

export default OtpForm
