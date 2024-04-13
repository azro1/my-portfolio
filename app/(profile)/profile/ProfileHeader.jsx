const ProfileHeader = ({ heading, text }) => {
  return (
     <div className="">
        <div className="text-center">
            <h2 className="subheading text-hint">{heading}</h2>
            <p className="text-base p-5">{text}</p>
        </div>
     </div>
  )
}

export default ProfileHeader
