import Navbar from "../components/navbar/Navbar"

export default function PagesLayout ({ children }) {
  return (
    <>
       <Navbar />
       {children}
    </>
  )
}
