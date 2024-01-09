// src/components/Sidebar.tsx
// import React, { useState } from "react";
import DashboardSidebarItem from "./DashboardSidebarItem";
import { CiStreamOn } from "react-icons/ci";
import { MdOutlineSettings } from "react-icons/md";

interface DashboardSidebarProps {
	items: {
		title: string;
		link: string;
		submenus?: {
			title: string;
			link: string;
		}[];
	}[];
	// Other properties
}

const DashboardSidebar: React.FC<DashboardSidebarProps> = () => {
	const items = [
		{
			title: "Stream Manager",
			icon: <CiStreamOn />,
			path: "/dashboard/1",
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
