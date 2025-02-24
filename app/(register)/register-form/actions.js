"use server"

import { cookies } from 'next/headers';

export async function setIsRegisteredCookie() {
    await cookies().set('isRegistered', 'true', { 
        path: '/', 
        maxAge: 60 * 60 * 24 * 365 * 10,
        httpOnly: true, 
        sameSite: 'Strict' 
    });
}