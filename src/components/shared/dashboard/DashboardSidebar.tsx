import { lazy } from "react";
import { useTranslation } from "react-i18next";
import { CiStreamOn } from "react-icons/ci";
import { MdOutlineSettings } from "react-icons/md";
import { PiTelevision } from "react-icons/pi";
import { TbSpeakerphone } from "react-icons/tb";
import store from "store2";

const DashboardSidebarItem = lazy(() => import("./DashboardSidebarItem"));

const DashboardSidebar: React.FC = () => {
	const { t } = useTranslation();

	const items = [
		{
			title: t("pages.cp"),
			icon: <PiTelevision size={18} />,
			path: "/dashboard/channel",
		},
		{
			title: t("pages.stm"),
			icon: <CiStreamOn size={18} />,
			path: `/dashboard/${store.get("id")}`,
		},
		{
			title: t("pages.alerts"),
			icon: <TbSpeakerphone size={18} />,
			path: `/dashboard/alerts`,
		},
		{
			title: t("pages.setting"),
			icon: <MdOutlineSettings size={18} />,
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
