import Timer from "./Timer"

const OtpForm = ({ containerStyles, handleSubmit, onSubmit, title, subHeading, fields, register, handleInputChange, handleKeyDown, errors, isLoading, trigger, formState, authGroupEmailRef, profileEmailRef, profilePhoneRef, isButtonDisabled, isVerified }) => {


  return (
    <div className={containerStyles}> 
        <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <h2 className='text-3xl leading-tight mb-4 font-b text-nightSky'>{title}</h2>
            <p className='max-w-xs mb-4'>{subHeading}</p>


            <div className='flex flex-wrap gap-2'>
                {fields.map((field, index) => (
                    <div key={field.id}>
                        <label htmlFor={`codes[${index}].code`} className="max-w-min mb-2 text-base text-ashGray"></label>
                        <input
                            transition={{ type: 'spring', stiffness: 150, damping: 25 }}
                            {...register(`codes[${index}].code`)}
                            id={`codes[${index}].code`}
                            type='text'
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



            <button className={`btn block mt-5 w-full mb-3 ${isLoading ? 'opacity-65' : 'opacity-100'}`} disabled={isLoading}>
                {isLoading ? (
                    <div className='flex items-center justify-center gap-2'>
                        <img className="w-6 h-6 opacity-65" src="../images/loading/spinner.svg" alt="Loading indicator" />
                    </div>
                ) : (
                    'Verify'
                )}
            </button>
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
