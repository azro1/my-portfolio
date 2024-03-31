const Avatar = ({ user }) => {

  return (
    <div>
      {user && (
        <div className="flex flex-col items-center gap-1 absolute left-0 top-8.625 md:static mr-8">
          <div className="overflow-hidden rounded-full w-12 h-12">
              <img className="inline-block w-full h-full object-cover" src={user.user_metadata.avatar_url} alt="a user avatar" />
          </div>
          <p className="font-b text-base text-hint ">Hello, <span className="text-secondary">{user.user_metadata.full_name}</span></p>
        </div>
      )}   
    </div>
  )
}

export default Avatar
