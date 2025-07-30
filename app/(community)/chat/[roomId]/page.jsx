import { client } from "@/app/lib/db"
import { redirect } from "next/navigation";

// components
import ChatRoomPage from "./ChatRoomPage."

const Page = async () => {
  const accessTokens = await client.get('created-room-token') || await client.get('joined-room-token');
  await client.del('created-room-token');
  await client.del('joined-room-token');

  if (!accessTokens) {
    redirect('/chat');
  }

  return (
    <div>
      <ChatRoomPage />
    </div>
  )
}

export default Page
