import { motion, AnimatePresence } from "framer-motion"
import Timer from "./Timer"

const OtpForm = ({ containerStyles, handleSubmit, onSubmit, title, subHeading, fields, register, handleInputChange, handleKeyDown, errors, isLoading, trigger, formState, authGroupEmailRef, profileEmailRef, profilePhoneRef, isButtonDisabled, isVerified }) => {


  return (
    <div className={containerStyles}> 
        <form className="max-w-[340px]" onSubmit={handleSubmit(onSubmit)} noValidate 
            as={motion.form}
            transition={{ type: 'spring', stiffness: 150, damping: 30 }}
        >
            <h2 className='text-3xl leading-tight mb-4 font-eb text-saddleBrown'>{title}</h2>
            <p className='mb-4'>{subHeading}</p>


            <div className='flex flex-wrap gap-2'>
                {fields.map((field, index) => (
                    <div key={field.id}>
                        <label htmlFor={`codes[${index}].code`} className="max-w-min mb-2 text-base text-ashGray"></label>
                        <motion.input
                            transition={{ type: 'spring', stiffness: 150, damping: 25 }}
                            {...register(`codes[${index}].code`)}
                            id={`codes[${index}].code`}
                            type='text'
                            maxLength={1}
                            className={`text-center w-[50px] h-[50px] rounded-md bg-softCharcoal border-[1px] text-lg text-stoneGray ${(formState.isSubmitted && typeof errors.codes === 'object' && !Array.isArray(errors.codes)) || (formState.isSubmitted && Array.isArray(errors.codes) && errors.codes.find((error) => error?.code?.message)) ? 'border-red-700' : 'border-ashGray'}`}
                            onChange={(e) => {
                                handleInputChange(e, index)
                                handleKeyDown(e, index)
                                trigger('codes');
                            }}
                            onKeyDown={(e) => handleKeyDown(e, index)} // Listen to key events
                        />
                    </div>
                ))}
            </div>


            <AnimatePresence>
                {(formState.isSubmitted && typeof errors.codes === 'object' && !Array.isArray(errors.codes)) && (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ type: 'tween' }}
                        className="text-red-600 mt-2 text-sm">
                            {errors.codes.message}
                    </motion.p>
                )}
                
                {formState.isSubmitted && Array.isArray(errors.codes) && errors.codes.find((error) => error?.code?.message) ? (
                    <motion.p
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ type: 'tween' }} 
                        className="text-red-600 mt-2 text-sm">
                        {errors.codes.find((error) => error?.code?.message)?.code?.message}
                    </motion.p>
                ) : null}
            </AnimatePresence>

            

            <button className='btn block mt-5 bg-saddleBrown' disabled={isLoading}>
                {isLoading ? (
                    <div className='flex items-center gap-2'>
                        <img className="w-5 h-5 opacity-50" src="../images/loading/spinner.svg" alt="Loading indicator" />
                        <span>Verify</span>
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
