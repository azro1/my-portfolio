import { client } from "@/app/lib/db"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import VerifySignupOtp from "./VerifySignupOtp";

const Page = async () => {
    const encryptedEmail = cookies().get('_otp_tkn')?.value;
    const otpAccessToken = await client.get(`token-${encryptedEmail}`);
    await client.del(`token-${encryptedEmail}`);

    const email = await client.get('email');
    await client.del('email');

    if (!otpAccessToken) {
        redirect('/login')
    }

    return (
        <div>
            <VerifySignupOtp
                email={email}
            />
        </div>
    )
}

export default Page
