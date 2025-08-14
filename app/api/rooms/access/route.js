import { client } from "@/app/lib/db";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
    const { hasCreatedRoom, hasJoinedRoom } = await request.json();

    if (hasCreatedRoom) {
        await client.set('created-room-token', uuidv4());
    }

    if (hasJoinedRoom) {
        await client.set('joined-room-token', uuidv4());
    }

    return new Response(null, { status: 200 });
}
