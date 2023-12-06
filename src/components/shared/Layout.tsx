import { PropsWithChildren } from "react"

import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="text-sm">
      <Navbar />
      <main className="p-5">{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
