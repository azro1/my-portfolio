"use server"

import { client } from './lib/db';
import { cookies } from 'next/headers';

// set user email 
export async function setEmail(email) {
   await client.set('email', email);
}

// flag to track registration avatar upload
export async function setUploadAvatarFlag() {
   const auf = await cookies().get('_au_flg')?.value;
   await client.set(`auf-${auf}`, 'true');
}

// flag to track registration avatar upload
export async function getUploadAvatarFlag() {
   const auf = await cookies().get('_au_flg')?.value;
   const avtrUplFlg = await client.get(`auf-${auf}`);
   return avtrUplFlg;
}


// flag to indicate whether page should be refreshed after profile verification
export async function getProFlag() {
   const pf = await cookies().get('_pro_flg')?.value;
   const proFlg = await client.get(`pro-${pf}`);
   return proFlg;
}

// flag to indicate whether page should be refreshed after profile verification
export async function deleteProFlag() {
   const pf = await cookies().get('_pro_flg')?.value;
   await client.del(`pro-${pf}`);
}