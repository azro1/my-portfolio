import Image from "next/image"

const loading = () => {
  return (
    <div className="bg-softGray">
      <div className="h-screen w-full text-center flex flex-col items-center justify-center">
        <Image
          width={64}
          height={64}
          src="/images/loading/pulse_lightbg.svg"
          alt="A pulsating loading animation on a dark background"
        />
      </div>
    </div>
  )
}

export default loading