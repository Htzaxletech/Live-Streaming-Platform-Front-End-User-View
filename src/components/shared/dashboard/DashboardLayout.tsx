import { PropsWithChildren } from "react";
import { Sidebar } from "../../ui/Sidebar";
import { useSelector } from "react-redux";
import { RootState } from "store";
import DashboardNavbar from "./DashboardNavbar";

const DashboardLayout = ({ children }: PropsWithChildren) => {
	const isSidebarCollapsed = useSelector(
		(state: RootState) => state.sidebar.isSidebarCollapsed
	);

	return (
		<div className="text-sm">
			<DashboardNavbar />
			<Sidebar status="dashboard" />
			<main
				className={`py-8 ${
					!isSidebarCollapsed ? "ml-[60px] md:ml-60" : "ml-[60px]"
				}`}
			>
				{children}
			</main>
		</div>
	);
};

export default DashboardLayout;
