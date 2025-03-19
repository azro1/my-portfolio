import { client } from "@/app/lib/db"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import UploadAvatar from "./UploadAvatar";

const Page = async () => {

    const auf = cookies().get('_au_flg')?.value;
    const avtrUplFlg = await client.get(`auf-${auf}`);


    if (avtrUplFlg) {
        redirect('/register-form')
    }

    return (
        <div>
           <UploadAvatar />
        </div>
    )
}

export default Page