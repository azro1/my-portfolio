import Image from "next/image"

const Button = ({ isLoading, padding, width, backgroundColor, text, margin }) => {
    return (
        <button className={`${isLoading ? 'opacity-65' : 'opacity-100'} ${padding} ${width} ${backgroundColor} ${margin} rounded-lg cursor-pointer text-white font-b block`} disabled={isLoading}>
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
                <span>{text}</span>
            )}
        </button>
    )
}

export default Button
