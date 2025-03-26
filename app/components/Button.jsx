
const Button = ({ isLoading, padding, width, backgroundColor, text, margin }) => {
    return (
        <button className={`${isLoading ? 'opacity-65' : 'opacity-100'} ${padding} ${width} ${backgroundColor} ${margin} rounded-lg cursor-pointer text-white font-medium block`} disabled={isLoading}>
            {isLoading ? (
                <div className='flex items-center justify-center'>
                    <img className="w-6 h-6 opacity-65" src="../images/loading/reload.svg" alt="Loading indicator" />
                </div>
            ) : (
                <span>{text}</span>
            )}
        </button>
    )
}

export default Button
