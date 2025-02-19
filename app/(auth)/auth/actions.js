"use server"

import { cookies } from 'next/headers';

export async function deleteCanAccessAuthOtpPageCookie() {
   await cookies().delete('canAccessOtpPage', { path: '/', sameSite: 'Strict' });
}