
// components
import Button from "./Button"
import Timer from "./Timer"
import Heading from "./Heading";

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

function maskEmail(email) {
    const [local, domain] = email.split('@');
    if (local.length <= 2) return `${local[0]}***@${domain}`;
    return `${local[0]}***${local[local.length - 1]}@${domain}`;
}

  return (
    <div className={containerStyles}> 
        <form onSubmit={handleSubmit(onSubmit)} noValidate>

            <Heading className='text-center leading-tight mb-6 font-semibold text-nightSky text-[26px] md:text-[28px]'>
                {title}
            </Heading>

            {email && (
                <p className='mb-4 text-[17px] text-center leading-normal'>Enter the code sent to <span className='font-r text-nightSky'>{maskEmail(email)}</span> to verify your email address{title === 'Log In' || title === 'Update Email' ? '' : ' and create your account'}</p>
            )}

            {phone && (
                <p className='mb-4 text-[17px] leading-normal'>To update your phone number, enter the code sent to the number you provided ending in <span className='text-black'>{maskedPhone}</span></p> 
            )}

            <div className='flex gap-2 md:gap-2.5'>
                {fields.map((field, index) => (
                    <div key={field.id}>
                        <label htmlFor={`codes[${index}].code`} className="max-w-min mb-2 text-base text-ashGray"></label>
                        <input
                            transition={{ type: 'spring', stiffness: 150, damping: 25 }}
                            {...register(`codes[${index}].code`)}
                            id={`codes[${index}].code`}
                            type='tel'
                            maxLength={1}
                            className={`text-center w-[100%] h-[56px] rounded-[5px] border-[1px] text-lg ${(formState.isSubmitted && typeof errors.codes === 'object' && !Array.isArray(errors.codes)) || (formState.isSubmitted && Array.isArray(errors.codes) && errors.codes.find((error) => error?.code?.message)) ? 'border-red-600' : 'border-gray-300'}`}
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
                <p className="form-error text-center mt-2">
                    {errors.codes.message}
                </p>
            )}
            
            {formState.isSubmitted && Array.isArray(errors.codes) && errors.codes.find((error) => error?.code?.message) ? (
                <p className="form-error mt-2">
                    {errors.codes.find((error) => error?.code?.message)?.code?.message}
                </p>
            ) : null}


            <div className='my-5'>
               <Button
                    isLoading={isLoading}
                    className='w-[92px] mx-auto p-3 bg-goldenOchre'
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
