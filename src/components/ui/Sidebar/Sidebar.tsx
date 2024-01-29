import { FC } from "react";
import { tv } from "tailwind-variants";
import { LuArrowLeftFromLine, LuArrowRightFromLine } from "react-icons/lu";
import { useSelector, useDispatch } from "react-redux";
import { toggleSidebar } from "@store/slices/sidebarSlice";
import { RootState } from "store";
import { lazy } from "react";
import { useTranslation } from "react-i18next";

const DashboardSidebar = lazy(
	() => import("@components/shared/dashboard/DashboardSidebar")
);
const Button = lazy(() => import("../Button"));
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

const Sidebar: FC<SidebarProps> = ({ status }) => {
	const { t } = useTranslation();
	const collapsed = useSelector(
		(state: RootState) => state.sidebar.isSidebarCollapsed
	);
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
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
									{t("sidebar.4u")}
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
				{status === "user" && isAuthenticated && <FollowedChannels />}
				{status === "dashboard" && (
					<DashboardSidebar />
				)}
			</div>
		</div>
	);
};

export default Sidebar;
