"use server"

import { cookies } from 'next/headers';

export async function deleteCookie() {
    console.log('server action: cookie delete from dropdown sidebar menu')
    cookies().delete('isRegComplete');
}