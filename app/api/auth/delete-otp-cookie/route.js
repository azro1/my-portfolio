import { cookies } from "next/headers";

export async function POST(request) {
    const { userHasLeft } = await request.json();

    if (userHasLeft) {
       await cookies().delete('canAccessOtpPage');
    }

    return new Response(null, { status: 200 });
}
