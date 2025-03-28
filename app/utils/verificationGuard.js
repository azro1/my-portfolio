import { NextResponse } from 'next/server'

export async function VerificationGuard(user, request) {

    return NextResponse.next();
}