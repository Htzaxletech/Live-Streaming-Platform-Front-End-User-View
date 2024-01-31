import { tv } from "tailwind-variants";
import Logo from "../Logo";
import NavbarSearchBox from "../NavbarSearchBox";
import UserMenu from "../UserMenu";

const classes = tv({
	base: ["border-2 border-black"],
	slots: {
		nav: [
			"h-navbar",
			"flex",
			"px-3 gap-5",
			"fixed top-0 w-full z-40",
			"shadow-[0_1px_2px_rgba(0,0,0,0.16)]",
			"dark:shadow-[0_1px_2px_rgba(0,0,0,0.8)]",
			"bg-background-base dark:bg-background-float",
		],
		navCol: ["flex flex-1 h-full items-center", "gap-5"],
	},
});

const { nav, navCol } = classes();

const DashboardNavbar = () => {
	return (
		<div>
			<nav className={nav()}>
				<div className={navCol()}>
					<div className="w-[48px] justify-center flex">
						<Logo />
					</div>
				</div>
				<div className={navCol({ class: "justify-center" })}>
					<NavbarSearchBox className="hidden sm:flex" />
				</div>
				<div className={navCol({ class: "justify-end gap-2.5" })}>
					<UserMenu />
				</div>
			</nav>
		</div>
	);
};

export default DashboardNavbar;
