import React, { lazy } from "react";
import { Dropdown } from "@components/ui/Dropdown";
// import NavbarLink from "./NavbarLink";
// import Button from "@components/ui/Button";
import { HiDotsVertical } from "react-icons/hi";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

const NavbarLink = lazy(() => import("./NavbarLink"));
const Button = lazy(() => import("@components/ui/Button"));

const NavbarMenu: React.FC = () => {
  const { t } = useTranslation();

  return (
		<>
			<NavbarLink className="hidden md:flex" to={"/following"}>
				{t("navbar.link1")}
			</NavbarLink>
			<NavbarLink className="hidden md:flex" to={"/directory"}>
				{t("navbar.link2")}
			</NavbarLink>

			<Dropdown.Root modal={false}>
				<Dropdown.Trigger asChild>
					<a
						data-tooltip-id="my-tooltip"
						data-tooltip-content="More"
						className="z-50"
					>
						<Button className="bg-transparent p-0">
							<HiDotsVertical className="text-xl" />
						</Button>
					</a>
				</Dropdown.Trigger>
				<Dropdown.Portal>
					<Dropdown.Content
						align="start"
						className="z-50 sm:h-24 md:h-auto overflow-auto"
					>
						<Dropdown.Group>
							<Link to={"/following"}>
								<Dropdown.Item className="md:hidden">
									{t("navbar.link1")}
								</Dropdown.Item>
							</Link>
							<Link to={"/directory"}>
								<Dropdown.Item className="md:hidden">
									{t("navbar.link2")}
								</Dropdown.Item>
							</Link>
							<Link to={"/channel/1"}>
								<Dropdown.Item>Socket</Dropdown.Item>
							</Link>
							<Link to={"/testing"}>
								<Dropdown.Item>Testing</Dropdown.Item>
							</Link>
						</Dropdown.Group>
					</Dropdown.Content>
				</Dropdown.Portal>
			</Dropdown.Root>
		</>
  );
};

export default NavbarMenu;