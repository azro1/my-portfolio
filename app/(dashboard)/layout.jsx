// components
import Footer from "../components/Footer"
import Sidebar from "../components/Sidebar"
import Refresh from "./Refresh"


export default async function DashboardLayout({ children }) {
  
  return (
    <div className="flex flex-col min-h-screen bg-nightSky">
      <div className="flex flex-1">

        <div className="flex z-40">
          <Sidebar />
        </div>

        <div className="flex-1 flex flex-col z-30">
          {children}
          <Refresh />
        </div>

      </div>

      <div className=" w-full z-50">
        <Footer />
      </div>

    </div>
  )
}
