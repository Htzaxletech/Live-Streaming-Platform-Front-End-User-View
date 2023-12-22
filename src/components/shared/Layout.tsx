import { PropsWithChildren } from "react"

import Navbar from "./Navbar"
import Footer from "./Footer"

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className="text-sm min-h-screen">
      <Navbar />
      <main className="py-14 pb-20 px-4">{children}</main>
      <Footer />
    </div>
  );
}

export default Layout
