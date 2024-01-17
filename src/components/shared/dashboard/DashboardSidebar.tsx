import { lazy } from "react";
import { CiStreamOn } from "react-icons/ci";
import { MdOutlineSettings } from "react-icons/md";
import store from "store2";

const DashboardSidebarItem = lazy(() => import("./DashboardSidebarItem"));

const DashboardSidebar: React.FC = () => {
	const items = [
		{
			title: "Stream Manager",
			icon: <CiStreamOn />,
			path: `/dashboard/${store.get("id")}`,
		},
		{
			title: "Setting",
			icon: <MdOutlineSettings />,
			childrens: [
				{
					title: "Stream",
					path: "/dashboard/setting/stream",
				},
				{
					title: "Channel",
					path: "/dashboard/setting/channel",
				},
			],
		},
	];

	return (
		<div className="mt-14">
			<nav className="px-2">
				{items.map((item, index) => (
					<DashboardSidebarItem key={index} item={item} />
				))}
			</nav>
		</div>
	);
};

export default DashboardSidebar;
