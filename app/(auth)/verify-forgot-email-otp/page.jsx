import { client } from "@/app/lib/db"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import VerifyForgotEmailOtp from "./VerifyForgotEmailOtp";

const Page = async () => {
    const encryptedEmail = cookies().get('_otp_tkn')?.value;
    const otpAccessToken = await client.get(`token-${encryptedEmail}`);

    if (!otpAccessToken) {
        redirect('/login')
    }

    return (
        <div>
           <VerifyForgotEmailOtp />
        </div>
    )
}

export default Page