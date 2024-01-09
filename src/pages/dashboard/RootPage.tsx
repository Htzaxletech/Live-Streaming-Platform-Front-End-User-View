import DashboardLayout from "@components/shared/dashboard/DashboardLayout";
import { Outlet } from "react-router-dom";

const DashboardRootPage = () => {
	return (
		<DashboardLayout>
			<Outlet />
		</DashboardLayout>
	);
};

export default DashboardRootPage;
