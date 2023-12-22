import { PropsWithChildren } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import {Sidebar} from "../ui/Sidebar" 
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="text-sm">
      <Navbar />
      <Sidebar/>
      <main className="p-5">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout