"use server"

import { client } from './lib/db';
import { cookies } from 'next/headers';


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

// flag to indicate whether page should be refreshed after registration
export async function getRegFlag() {
   const rf = await cookies().get('_reg_flg')?.value;
   const regFlg = await client.get(`reg-${rf}`);
   return regFlg;
}

// flag to indicate whether page should be refreshed after registration
export async function deleteRegFlag() {
   const rf = await cookies().get('_reg_flg')?.value;
   await client.del(`reg-${rf}`);
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