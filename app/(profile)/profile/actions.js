"use server"

import { cookies } from 'next/headers';

export async function setHasVisitedOtpPageCookie() {
    cookies().set('hasVisitedOtpPage', 'true', { 
        path: '/', 
        httpOnly: true, 
        sameSite: 'Strict' 
    });
}

export async function deleteHasVisitedOtpPageCookie() {
    cookies().delete('hasVisitedOtpPage', { path: '/', sameSite: 'Strict' });
}