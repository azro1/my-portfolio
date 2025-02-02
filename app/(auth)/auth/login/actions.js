"use server"

import { cookies } from 'next/headers';

export async function deleteCookie() {
    cookies().delete('canAccessOtpPage', { path: '/', sameSite: 'Strict' });
}