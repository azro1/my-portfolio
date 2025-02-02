"use server"

import { cookies } from 'next/headers';

export async function setCookie() {
    cookies().set('isRegComplete', 'true', { 
        path: '/', 
        maxAge: 60 * 60 * 24 * 365 * 10,
        httpOnly: true, 
        sameSite: 'Strict' 
    });
}