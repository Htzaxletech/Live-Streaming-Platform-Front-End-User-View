import { FC } from "react";
import { tv } from "tailwind-variants";
import { LuArrowLeftFromLine, LuArrowRightFromLine } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "@store/slices/sidebarSlice";
import { RootState } from "store";
import { lazy } from "react";
import Button from "../Button";
import DashboardSidebar from "@components/shared/dashboard/DashboardSidebar";

const FollowedChannels = lazy(() => import("./FollowedChannels"));

interface SidebarProps {
	status: string;
	// You can add any other props as needed
}

const sidebar = tv({
	base: [
		"w-60 h-screen bg-background-base overflow-y-auto fixed top-[50px] left-0 z-40",
	],
	variants: {
		collapsed: {
			true: ["w-[60px]", "overflow-hidden"],
			false: ["w-60"],
		},
	},
	defaultVariants: {},
});

const sidebarItems = [
	{ title: "Home", link: "/" },
	{
		title: "Categories",
		link: "/categories",
		submenus: [
			{ title: "Category 1", link: "/categories/1" },
			{ title: "Category 2", link: "/categories/2" },
		],
	},
	{ title: "About", link: "/about" },
];

const Sidebar: FC<SidebarProps> = ({ status }) => {
	const collapsed = useSelector(
		(state: RootState) => state.sidebar.isSidebarCollapsed
	);

	const dispatch = useDispatch();

	return (
		<div className="flex justify-between items-center">
			<div className={sidebar({ collapsed })}>
				<div className="flex">
					{!collapsed && (
						<>
							{status === "user" ? (
								<div className="text-foreground flex-nowrap text-lg font-semibold absolute left-3 top-4 mx-auto">
									For You
								</div>
							) : (
								<div className="text-foreground flex-nowrap font-semibold absolute left-3 top-4 mx-auto">
									CREATOR DASHBOARD
								</div>
							)}
						</>
					)}
					<Button
						className="absolute right-1 top-3 bg-transparent hover:bg-background-item/20 text-foreground rounded-sm p-3"
						onClick={() => dispatch(toggleSidebar())}
					>
						{collapsed ? (
							<LuArrowRightFromLine size={20} className="" />
						) : (
							<LuArrowLeftFromLine size={20} className="" />
						)}
					</Button>
				</div>
				{status === "user" && <FollowedChannels />}
				{status === "dashboard" && (
					<DashboardSidebar items={sidebarItems} />
				)}
			</div>
		</div>
	);
};

export default Sidebar;
