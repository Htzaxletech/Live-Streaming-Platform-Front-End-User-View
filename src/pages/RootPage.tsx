import { Outlet } from "react-router-dom"

import Layout from "@components/shared/Layout"
import { ToastContainer } from "react-toastify";
import { RootState } from "@store/index";
import { useSelector } from "react-redux";

const RootPage = () => {
  const { currentTheme } = useSelector((state: RootState) => state.theme);	

  return (
		<Layout>
			<ToastContainer theme={currentTheme} />
			<Outlet />
		</Layout>
  );
}

export default RootPage
