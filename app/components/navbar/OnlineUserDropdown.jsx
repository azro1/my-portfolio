// components
import OnlineStatus from "@/app/(community)/chat/OnlineStatus";

const OnlineUserDropdown = ({ users, dropDownOnlineMenuRef }) => {

    // Convert the users object into an array and sort if needed (e.g., alphabetically)
    const userList = Object.values(users).sort((a, b) =>
        (a.first_name || '').localeCompare(b.first_name || '')
    );

    return (
        <div className='online-user-dropdown absolute w-full right-0 top-[60px] md:top-[60px] z-40 bg-[#141716]' ref={dropDownOnlineMenuRef}>
            <ul className="flex flex-col">
                {userList.map((user) => (
                    <li key={user.id} className="flex items-center gap-3 p-3 border-b-[1px] border-opacity-30 border-dashed border-ashGray">
                        <OnlineStatus status={user.status} />
                        <p className="text-ashGray">
                            {user.first_name || 'User'}
                        </p>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default OnlineUserDropdown


