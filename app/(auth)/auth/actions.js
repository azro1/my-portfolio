"use server"

import { cookies } from 'next/headers';

export async function deleteCanAccessAuthOtpPageCookie() {
   await cookies().delete('canAccessAuthOtpPage', { path: '/' });
}