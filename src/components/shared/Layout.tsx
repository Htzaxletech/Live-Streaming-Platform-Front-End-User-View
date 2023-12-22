import { PropsWithChildren } from "react"
import Navbar from "./Navbar"
import Footer from "./Footer"
import {Sidebar} from "../ui/Sidebar" 
const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="text-sm min-h-screen">
      <Navbar />
      <Sidebar />
      <main className="py-14 pb-20 px-4">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout