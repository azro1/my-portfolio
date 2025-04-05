const AvailabilityInfo = () => {
    return (
        <div>
            <h3 className='font-b text-chocolate mb-4 text-1.375 md:text-2xl'>
                When you can reach me?
            </h3>
            <div className='flex flex-col gap-3 max-w-xs'>
                <p>I&apos;m available:</p>
                <ul className=' text-ashGray leading-7'>
                    <li>Monday to Friday:</li>
                    <li>9:00 AM - 5:00 PM (local time)</li>
                </ul>
                <p className="text-ashGray leading-7">Feel free to drop me a line, and I&apos;ll get back to you as soon as possible!</p>
            </div>
        </div>
    )
}

export default AvailabilityInfo
