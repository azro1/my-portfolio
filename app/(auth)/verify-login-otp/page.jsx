import { client } from "@/app/lib/db"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import VerifyLoginOtp from "./VerifyLoginOtp";

const Page = async () => {
    const encryptedEmail = cookies().get('_otp_tkn')?.value;
    const otpAccessToken = await client.get(`token-${encryptedEmail}`);

    const email = await client.get('email');
    await client.del('email');

    if (!otpAccessToken) {
        redirect('/login')
    }

    return (
        <div>
            <VerifyLoginOtp
                email={email}
            />
        </div>
    )
}

export default Page