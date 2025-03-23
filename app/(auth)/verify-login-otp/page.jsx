import { client } from "@/app/lib/db"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import VerifyLoginOtp from "./VerifyLoginOtp";

const Page = async () => {
    const encryptedEmail = cookies().get('_otp_tkn')?.value;
    const otpAccessToken = await client.get(`token-${encryptedEmail}`);

    if (!otpAccessToken) {
        redirect('/login')
    }

    return (
        <div>
           <VerifyLoginOtp />
        </div>
    )
}

export default Page