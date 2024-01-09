import { GoPerson } from "react-icons/go";
import { useState } from "react";
import Button from "@components/ui/Button";
import { Dropdown } from "@components/ui/Dropdown";

import LanguageSwitch from "./LanguageSwitch";
import ThemeSwitch from "./ThemeSwitch";
import Icon from "./Icon";

import { MdOutlineAnalytics } from "react-icons/md";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { RiHome5Line } from "react-icons/ri";
import { BiLogOut } from "react-icons/bi";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { TbWorld } from "react-icons/tb";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import UserProfile from "./UserProfile";
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
					Language
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

	const [openLanguage, setOpenLanguage] = useState<boolean>(false);

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
							<Dropdown.Group className="flex items-center px-1 py-1">
								<UserProfile />
							</Dropdown.Group>
							<Dropdown.Group>
								<Dropdown.Separator />
								{!isDashboardPage ? (
									<Link to={"/dashboard/1"}>
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
												icon={<RiHome5Line className="icon" />}
												title="Back to Twitch"
											/>
										</Dropdown.Item>
									</Link>
								)}
								<Dropdown.Separator />
								<Dropdown.Item
									onSelect={(e) => {
										e.preventDefault();
										setOpenLanguage(!openLanguage);
									}}
								>
									<LanguageHeader openLanguage={openLanguage} />
								</Dropdown.Item>
								<ThemeSwitch />
								<Dropdown.Separator />
								<Dropdown.Item>
									<DashboardHeader
										icon={<BiLogOut className="icon" />}
										title="Log Out"
									/>
								</Dropdown.Item>
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
