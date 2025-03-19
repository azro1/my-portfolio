import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

// components
import RegisterForm from "./RegisterForm";

const Page = async () => {;

    return (
        <div>
           <RegisterForm />
        </div>
    )
}

export default Page