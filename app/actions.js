"use server"

import { cookies } from 'next/headers';

export async function deleteOtpAccessBlockedCookie() {
    await cookies().delete('otpAccessBlocked', { path: '/'});
}