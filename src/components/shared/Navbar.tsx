import React, { lazy } from "react";
import { tv } from "tailwind-variants";
// import Logo from "./Logo";
// import NavbarSearchBox from "./NavbarSearchBox";
import UserMenu from "./UserMenu";
// import Button from "@components/ui/Button";
import NavbarMenu from "./NavbarMenu";
import { setOpenLogin, setOpenSignUp } from "@store/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/index";
import { useEffect } from "react";
import store from "store2";
import { useTranslation } from "react-i18next";

const Login = lazy(() => import("@pages/authentication/Login"));
const SignUp = lazy(() => import("@pages/authentication/SignUp"));
const OTP = lazy(() => import("@pages/authentication/OneTimePwd"));
const TwoFactor = lazy(() => import("@pages/authentication/TwoFactor"));
const NavbarSearchBox = lazy(() => import("./NavbarSearchBox"));
// const UserMenu = lazy(() => import("./UserMenu"));
const Button = lazy(() => import("@components/ui/Button"));
// const NavbarMenu = lazy(() => import("./NavbarMenu"));
const Logo = lazy(() => import("./Logo"));

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

const Navbar: React.FC = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const { isOpenLogin, isOpenSignUp, isOpenOTP, isOpenTwoFactor } =
		useSelector((state: RootState) => state.modals);
	const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

	useEffect(() => {
		if (
			store.get("signup_username") &&
			store.get("signup_password") &&
			store.get("signup_email")
		) {
			dispatch(setOpenSignUp(true));
		}

		return () => {
			dispatch(setOpenSignUp(false));
		};
	}, [dispatch]);

	return (
		<div>
			{isOpenLogin && <Login />}
			{isOpenSignUp && <SignUp />}
			{isOpenOTP && <OTP />}
			{isOpenTwoFactor && <TwoFactor />}

			<nav className={nav()}>
				<div className={navCol()}>
					<div className="w-[48px] justify-center flex">
						<Logo />
					</div>
					<NavbarMenu />
				</div>
				<div className={navCol({ class: "justify-center" })}>
					<NavbarSearchBox className="hidden sm:flex" />
				</div>
				<div className={navCol({ class: "justify-end gap-2.5" })}>
					{!isAuthenticated && (
						<>
							<Button onClick={() => dispatch(setOpenLogin(true))}>
								{t("navbar.login")}
							</Button>
							<Button
								color="primary"
								onClick={() => dispatch(setOpenSignUp(true))}
							>
								{t("navbar.signup")}
							</Button>
						</>
					)}

					<UserMenu />
				</div>
			</nav>
		</div>
	);
};

export default Navbar;
