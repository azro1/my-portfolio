"use server"

import { cookies } from 'next/headers';

export async function deleteCanAccessProfileOtpPageCookie() {
    await cookies().delete('canAccessProfileOtpPage', { path: '/'});
}