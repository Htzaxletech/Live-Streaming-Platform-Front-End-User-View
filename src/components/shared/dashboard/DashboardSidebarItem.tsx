import React, { useState, useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import "./DashboardSidebarItem.css";

interface DashboardSidebarItemProps {
	title?: string;
	icon?: JSX.Element;
	path?: string;
	childrens?: { title: string; path: string }[];
}

const DashboardSidebarItem: React.FC<{ item: DashboardSidebarItemProps }> = ({
	item,
}) => {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const isSidebarCollapsed = useSelector(
		(state: RootState) => state.sidebar.isSidebarCollapsed
	);

	const isActive = location.pathname === item.path;

	useEffect(() => {
		// Check if any child is active and set open accordingly
		const hasActiveChild = item.childrens?.some((child) => {
			const childPath = child.path || "";
			return location.pathname === childPath;
		});

		if (hasActiveChild) {
			setOpen(true);
		}
	}, [location.pathname, item.childrens]);

	const handlePath = (path: unknown) => {
		if(typeof path === "string") navigate(path);
	};

	if (item.childrens) {
		return (
			<>
				<div
					className={`${
						open ? "sidebar-item open" : "sidebar-item"
					} hover:bg-gray-200 dark:hover:bg-zinc-700 cursor-pointer`}
					onClick={!isSidebarCollapsed ? () => setOpen(!open) : () => {}}
				>
					<div className="sidebar-title">
						<span className="flex items-center gap-2">
							<span className="w-5">{item.icon && item.icon}</span>
							<span className={isSidebarCollapsed ? "hidden" : ""}>
								{item.title}
							</span>
						</span>
						<span className={isSidebarCollapsed ? "hidden" : ""}>
							{!open ? <IoIosArrowDown /> : <IoIosArrowUp />}
						</span>
					</div>
				</div>
				{!isSidebarCollapsed && open && (
					<div>
						{item.childrens.map((child, index) => (
							<DashboardSidebarItem key={index} item={child} />
						))}
					</div>
				)}
			</>
		);
	} else {
		return (
			<div
				className={`sidebar-item cursor-pointer hover:bg-gray-200 dark:hover:bg-zinc-700 ${
					isActive === true ? "bg-primary text-white hover:bg-primary dark:hover:bg-primary" : ""
				} `}
				onClick={
					!isSidebarCollapsed ? () => handlePath(item.path) : () => {}
				}
			>
				<span className="flex items-center gap-2">
					<span className="w-5">{item.icon && item.icon}</span>
					<span className={isSidebarCollapsed ? "hidden" : ""}>
						{item.title}
					</span>
				</span>
			</div>
		);
	}
};

export default DashboardSidebarItem;
