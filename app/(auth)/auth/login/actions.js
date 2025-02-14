"use server"

import { cookies } from 'next/headers';

export async function deleteCanAccessOtpPageCookie() {
    cookies().delete('canAccessOtpPage', { path: '/', sameSite: 'Strict' });
}