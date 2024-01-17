import { PropsWithChildren, lazy } from "react";
// import Navbar from "./Navbar";
// import Footer from "./Footer";
import { Sidebar } from "../ui/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "store";

const Footer = lazy(() => import("./Footer"));
const Navbar = lazy(() => import("./Navbar"));

const Layout = ({ children }: PropsWithChildren) => {
	const isSidebarCollapsed = useSelector(
		(state: RootState) => state.sidebar.isSidebarCollapsed
	);
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

	return (
		<div className="text-sm min-h-screen">
			<Navbar />
			<Sidebar status="user" />
			<main
				className={`py-8 ${
					!isSidebarCollapsed ? "ml-[60px] md:ml-60" : "ml-[60px]"
				}`}
			>
				{children}
			</main>
			{!isAuthenticated && <Footer />}
		</div>
	);
};

export default Layout;
