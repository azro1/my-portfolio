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
export async function setUploadAvatarFlag() {
   const auf = await cookies().get('_au_flg')?.value;
   await client.set(`auf-${auf}`, 'true');
}

export async function getUploadAvatarFlag() {
   const auf = await cookies().get('_au_flg')?.value;
   const avtrUplFlg = await client.get(`auf-${auf}`);
   return avtrUplFlg;
}

export async function getRegFlag() {
   const rf = await cookies().get('_reg_flg')?.value;
   const regFlg = await client.get(`reg-${rf}`);
   return regFlg;
}

export async function deleteRegFlag() {
   const rf = await cookies().get('_reg_flg')?.value;
   await client.del(`reg-${rf}`);
}