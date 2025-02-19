"use server"

import { cookies } from 'next/headers';

export async function deleteCanAccessProfileOtpPageCookie() {
    await cookies().delete('canAccessOtpPage', { path: '/'});
}

export async function deleteOtpAccessBlockedCookie() {
    await cookies().delete('otpAccessBlocked', { path: '/'});
}