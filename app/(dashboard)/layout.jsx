import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"

// components
import Navbar from "../components/navbar/Navbar"

export default async function PagesLayout ({ children }) {
  const supabase = createServerComponentClient({ cookies })
  const { data } = await supabase.auth.getSession()
  // Optional chaining (?.) to safely access the user property. This ensures that if data.session is null or undefined, the expression will short-circuit, and user will be set to undefined. By making this change, you avoid trying to read properties from null, and the application should handle the logout scenario more gracefully
  const user = data.session?.user;
  
  return (
    <>
      <Navbar user={user} /> 
      {children}
    </>
  )
}
