import DashboardLayout from "@components/shared/dashboard/DashboardLayout";
import { RootState } from "@store/index";
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";

const DashboardRootPage = () => {
	const { currentTheme } = useSelector((state: RootState) => state.theme);	

	return (
		<DashboardLayout>
			<ToastContainer theme={currentTheme} />
			<Outlet />
		</DashboardLayout>
	);
};

export default DashboardRootPage;
