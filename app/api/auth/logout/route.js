import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request) {
    const { hasLeftViaAddressBar } = await request.json();
    const supabase = createRouteHandlerClient({ cookies }) 

    if (hasLeftViaAddressBar) {
       await supabase.auth.signOut();
    }

    return NextResponse.json(null, { status: 200 });
}
