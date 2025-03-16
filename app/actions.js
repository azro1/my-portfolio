"use server"

import { client } from './lib/db';
import { cookies } from 'next/headers';

export async function deleteOtpAccessBlockedCookie() {
    await cookies().delete('otpAccessBlocked', { path: '/'});
}

export async function deleteIsRegisteredCookie() {
    await cookies().delete('isRegistered', { path: '/'});
}

// set reg avatar upload flag in redis
export async function setUploadAvatarToken() {
   const auf = await cookies().get('_au_flg')?.value;
   await client.set(`auf-${auf}`, 'true');
}

export async function getUploadAvatarToken() {
   const auf = await cookies().get('_au_flg')?.value;
   const avtrUplFlg = await client.get(`auf-${auf}`, 'true');
   return avtrUplFlg;
}

