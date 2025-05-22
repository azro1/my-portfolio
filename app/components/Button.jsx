import Image from "next/image"

const Button = ({ isLoading, className='', textStyles='', text }) => {
    return (
        <button className={`${isLoading ? 'opacity-65' : 'opacity-100'} ${className} rounded-lg cursor-pointer text-white font-medium block`} disabled={isLoading}>
            {isLoading ? (
                <div className='flex items-center justify-center'>
                        <Image
                            className='opacity-65'
                            width={24}
                            height={24}
                            src="/images/loading/reload.svg"
                            alt="A spinning loading animation on a transparent background"
                        />
                </div>
            ) : (
                <span className={`text-cloudGray ${textStyles}`}>{text}</span>
            )}
        </button>
    )
}

export default Button
