"use client"

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

// components
import LoggedInMenu from "./LoggedInMenu";
import LoggedOutMenu from "./LoggedOutMenu";

// hooks
import { useUpdateTable } from "@/app/hooks/useUpdateTable";



const MainMenuDropdown = ({ user, handleCloseMenu, isForumPage, dropDownMenuRef }) => {

    const router = useRouter()
    const { updateTable } = useUpdateTable();

    const handleLogout = async (e) => {
        await updateTable(user, 'profiles', { is_online: false }, 'id');

        const supabase = createClientComponentClient()
        const { error } = await supabase.auth.signOut()

        if (!error) {
            navigator.sendBeacon(`${location.origin}/api/auth/is-registered`, JSON.stringify({ isRegistered: false }));
            router.push('/login')
        }

        if (error) {
            console.log(error)
        }
    }

    return (
        <>
            {user ? (
                <div className='absolute w-full right-0 top-[80px] z-40 bg-nightSky md:shadow-[0_0_6px_0_rgba(0,0,0,0.4)] md:bg-softCharcoal md:p-1 md:right-6 md:top-20 md:w-56 xl:shadow-none xl:bg-charcoalGray xl:left-8 xl:top-[406px] xl:mt-4' ref={dropDownMenuRef}>
                    <LoggedInMenu
                        user={user}
                        handleLogout={handleLogout}
                        handleCloseMenu={handleCloseMenu}
                        isForumPage={isForumPage}
                    />
                </div>

            ) : (
                <div className={`absolute w-full left-0 top-[80px] z-40 bg-nightSky`} ref={dropDownMenuRef}>
                    <LoggedOutMenu
                        handleCloseMenu={handleCloseMenu}
                    />
                </div>
            )}
        </>
    )
}

export default MainMenuDropdown
