const AvailabilityInfo = () => {
    return (
        <div className='h-44 row-start-4 col-start-1 col-span-2 md:row-start-2 md:col-start-1 md:col-span-1 md:place-self-end md:justify-self-start'>
            <h3 className='text-xl font-b font-rubik text-hint mb-4'>
                When You Can Reach Me
            </h3>
            <div className='flex flex-col gap-3 max-w-xs'>
                <p>I'm available:</p>
                <ul className=' text-secondary leading-7'>
                    <li>Monday to Friday:</li>
                    <li>9:00 AM - 5:00 PM (local time)</li>
                </ul>
                <p className="text-secondary leading-7">Feel free to drop me a line, and I'll get back to you as soon as possible!</p>
            </div>
        </div>
    )
}

export default AvailabilityInfo
