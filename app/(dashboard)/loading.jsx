import Image from "next/image"

const Loading = () => {
    return (
        <div className="bg-nightSky">
            <div className="main-container">
                <div className="h-screen w-full text-center flex flex-col items-center justify-center">
                    <Image
                        width={64}
                        height={64}
                        src="/images/loading/pulse_darkbg.svg"
                        alt="A pulsating loading animation on a dark background"
                    />
                </div>
            </div>
        </div>
    )
}

export default Loading