import { lazy } from "react";
import { useTranslation } from "react-i18next";
import { CiStreamOn } from "react-icons/ci";
import { MdOutlineSettings } from "react-icons/md";
import { PiTelevision } from "react-icons/pi";
import store from "store2";

const DashboardSidebarItem = lazy(() => import("./DashboardSidebarItem"));

const DashboardSidebar: React.FC = () => {
	const { t } = useTranslation();

	const items = [
		{
			title: t("pages.cp"),
			icon: <PiTelevision />,
			path: "/dashboard/channel",
		},
		{
			title: t("pages.stm"),
			icon: <CiStreamOn />,
			path: `/dashboard/${store.get("id")}`,
		},
		{
			title: t("pages.setting"),
			icon: <MdOutlineSettings />,
			childrens: [
				{
					title: t("pages.stream"),
					path: "/dashboard/setting/stream",
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
