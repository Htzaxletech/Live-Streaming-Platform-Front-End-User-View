import { PropsWithChildren } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Sidebar } from "../ui/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "store";

const Layout = ({ children }: PropsWithChildren) => {
  const isSidebarCollapsed = useSelector(
    (state: RootState) => state.sidebar.isSidebarCollapsed
  );

  return (
    <div className="text-sm min-h-screen">
      <Navbar />
      <Sidebar status="user" />
      {/* <main
        className={`py-14 pb-20 px-4 ${
          !isSidebarCollapsed ? "ml-[60px] md:ml-64" : "ml-[60px]"
        }`}
      > */}
      <main
        className={`py-8 ${
          !isSidebarCollapsed ? "ml-[60px] md:ml-60" : "ml-[60px]"
        }`}
      >
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
