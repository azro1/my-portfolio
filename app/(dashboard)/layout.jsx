import { cookies } from "next/headers"

// components
import Footer from "../components/Footer"
import Sidebar from "../components/Sidebar"
import RefreshOnLoad from "./RefreshOnLoad"

export default async function DashboardLayout({ children }) {
  const registrationCookie = cookies().get('_is_registered')?.value;

  return (
    <div className="flex flex-col min-h-screen bg-softGray">
      <div className="flex flex-1">

        <div className="flex z-20">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col z-10">
          {children}
          <RefreshOnLoad
            registrationCookie={registrationCookie}
          />
        </div>

      </div>

      <div className="w-full z-0 xl:z-30">
        <Footer
          showAuthFooter={false}
        />
      </div>

    </div>
  )
}
