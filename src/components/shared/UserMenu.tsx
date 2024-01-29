/* eslint-disable @typescript-eslint/no-unused-vars */
import { GoPerson } from "react-icons/go";
import { useState } from "react";
import { Dropdown } from "@components/ui/Dropdown";

import Button from "@components/ui/Button";
import LanguageSwitch from "./LanguageSwitch";
import ThemeSwitch from "./ThemeSwitch";
import Icon from "./Icon";
import UserProfile from "./UserProfile";

import { MdOutlineAnalytics } from "react-icons/md";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { RiHome5Line } from "react-icons/ri";
import { BiLogOut, BiLogIn } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import { useDispatch, useSelector } from "react-redux";
import { setOpenLogin } from "@store/slices/modalSlice";
import { logout } from "@store/slices/authSlice";
import { RootState } from "@store/index";
import store from "store2";
import { useTranslation } from "react-i18next";

// const UserProfile = lazy(() => import("./UserProfile"));
// const LanguageSwitch = lazy(() => import("./LanguageSwitch"));
// const ThemeSwitch = lazy(() => import("./ThemeSwitch"));
// const Icon = lazy(() => import("./Icon"));
// const Button = lazy(() => import("@components/ui/Button"));

interface DashboardHeaderProps {
	icon: React.ReactElement; // You can pass the icon as a React element
	title: string;
}

interface LanguageHeaderProps {
	openLanguage: boolean;
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({ icon, title }) => {
	return (
		<div className="flex w-full justify-between">
			<div className="flex gap-2 items-center">
				{icon}
				<label htmlFor="dark-theme-switch" className="cursor-pointer">
					{title}
				</label>
			</div>
		</div>
	);
};

const LanguageHeader: React.FC<LanguageHeaderProps> = ({ openLanguage }) => {
	const { t } = useTranslation();

	return (
		<div className="flex w-full justify-between cursor-pointer">
			<div
				className={`flex gap-2 items-center ${
					!openLanguage ? "" : "w-full justify-between"
				}`}
			>
				{!openLanguage ? (
					<TbWorld className="icon" />
				) : (
					<IoIosArrowBack className="icon" />
				)}
				<label
					htmlFor="dark-theme-switch"
					className={`cursor-pointer ${
						openLanguage ? "font-semibold" : ""
					}`}
				>
					{t("navbar.language")}
				</label>
				{openLanguage && <div className="invisible"></div>}
			</div>
			{!openLanguage && <IoIosArrowForward className="icon" />}
		</div>
	);
};

const UserMenu = () => {
	const location = useLocation();
	const isDashboardPage = location.pathname.includes("dashboard");
	const dispatch = useDispatch();
	const [openLanguage, setOpenLanguage] = useState<boolean>(false);
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);
	const { t } = useTranslation();

	const handleLogout = () => {
		dispatch(logout());
		const theme = store.get("theme");
		const i18nextLng = store.get("i18nextLng");
		store.clear();
		store.set("theme", theme);
		store.set("i18nextLng", i18nextLng);
	};

	return (
		<Dropdown.Root modal={false}>
			<Dropdown.Trigger asChild className="text-foreground outline-none">
				<Button iconOnly variant="light">
					<Icon icon={GoPerson} className="stroke-[0.4px]" />
				</Button>
			</Dropdown.Trigger>

			<Dropdown.Portal>
				<Dropdown.Content
					align="end"
					className={`z-50 shadow-lg ${openLanguage ? "p-0" : ""}`}
					onCloseAutoFocus={() => {
						openLanguage && setOpenLanguage(false);
					}}
				>
					{!openLanguage && (
						<>
							{isAuthenticated && (
								<>
									<Dropdown.Group className="flex items-center px-1 py-1">
										<UserProfile />
									</Dropdown.Group>
									<Dropdown.Separator />
								</>
							)}

							<Dropdown.Group>
								{isAuthenticated && (
									<>
										{!isDashboardPage ? (
											<Link to={`/dashboard/${store.get("id")}`}>
												<Dropdown.Item>
													<DashboardHeader
														icon={
															<MdOutlineAnalytics className="icon" />
														}
														title="Creator Dashboard"
													/>
												</Dropdown.Item>
											</Link>
										) : (
											<Link to={"/"}>
												<Dropdown.Item>
													<DashboardHeader
														icon={
															<RiHome5Line className="icon" />
														}
														title="Back to Twitch"
													/>
												</Dropdown.Item>
											</Link>
										)}
										<Dropdown.Separator />
									</>
								)}

								<Dropdown.Item
									onSelect={(e) => {
										e.preventDefault();
										setOpenLanguage(!openLanguage);
									}}
								>
									<LanguageHeader openLanguage={openLanguage} />
								</Dropdown.Item>
								<ThemeSwitch />

								{isAuthenticated ? (
									<>
										<Dropdown.Separator />
										<Dropdown.Item
											onSelect={handleLogout}
											className="cursor-pointer"
										>
											<DashboardHeader
												icon={<BiLogOut className="icon" />}
												title={t("navbar.logout")}
											/>
										</Dropdown.Item>
									</>
								) : (
									<>
										<Dropdown.Separator />
										<Dropdown.Item
											onSelect={() => dispatch(setOpenLogin(true))}
											className="cursor-pointer"
										>
											<DashboardHeader
												icon={<BiLogIn className="icon" />}
												title={t("navbar.login")}
											/>
										</Dropdown.Item>
									</>
								)}
							</Dropdown.Group>
						</>
					)}

					{openLanguage && (
						<div>
							<Dropdown.Group className="p-2">
								<DropdownMenu.Label
									onClick={(e) => {
										e.preventDefault();
										setOpenLanguage(!openLanguage);
									}}
									className="cursor-pointer"
								>
									<LanguageHeader openLanguage={openLanguage} />
								</DropdownMenu.Label>
							</Dropdown.Group>
							<Dropdown.Separator className="mt-0" />
							<Dropdown.Group className="px-2 pb-2">
								<LanguageSwitch />
							</Dropdown.Group>
						</div>
					)}
				</Dropdown.Content>
			</Dropdown.Portal>
		</Dropdown.Root>
	);
};

export default UserMenu;
