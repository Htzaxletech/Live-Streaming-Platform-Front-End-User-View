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
import { MdOutlineToken } from "react-icons/md";
import { CiBatteryCharging } from "react-icons/ci";
import { Dropdown } from "@components/ui/Dropdown";
import { RxCross2 } from "react-icons/rx";

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
	const isAuthenticated = useSelector(
		(state: RootState) => state.auth.isAuthenticated
	);

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
					{!isAuthenticated ? (
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
					) : (
						<>
							<Dropdown.Root modal={false}>
								<Dropdown.Trigger
									asChild
									className="text-foreground outline-none"
								>
									<Button iconOnly variant="light">
										<MdOutlineToken size={20} />
									</Button>
								</Dropdown.Trigger>

								<Dropdown.Portal>
									<Dropdown.Content
										align="end"
										className={`z-50 shadow-lg border overflow-hidden min-h-96 min-w-[16rem] p-0 max-w-[90vw] w-[26rem]`}
										// onCloseAutoFocus={() => {
										// 	openLanguage && setOpenLanguage(false);
										// }}
									>
										<Dropdown.Group className="">
											<div className="flex min-h-10 gap-1 items-center p-2">
												<div className="flex flex-col w-10 justify-center"></div>
												<div className="flex w-full flex-col justify-center items-center">
													<h5 className="text-sm font-semibold">
														Purchase Bits
													</h5>
													<span>
														You have <strong>0 Bits</strong>
													</span>
												</div>
												<div className="flex flex-col w-10 justify-center">
													<Button iconOnly variant="light">
														<RxCross2 size={17} />
													</Button>
												</div>
											</div>
										</Dropdown.Group>
										<Dropdown.Separator className="m-0" />

										<div
											style={{
												maxHeight: "calc(100vh - 10rem)",
												position: "relative",
												height: "100%",
												overflow: "auto",
											}}
										>
											<Dropdown.Group className="p-4">
												<div className="flex items-center mb-4">
													<MdOutlineToken
														size={20}
														className="mr-2"
													/>
													<p className="text-base font-semibold">
														Use Bits to support streamers
													</p>
												</div>
												When you use Bits in a channel, Twitch
												rewards the streamer and you create an
												exciting moment.
											</Dropdown.Group>
											<Dropdown.Separator className="m-0" />

											<Dropdown.Group className="px-4 py-2">
												<p className="text-xs">
													Prices are shown in <strong>USD</strong>
												</p>
											</Dropdown.Group>
											<Dropdown.Separator className="m-0" />

											<Dropdown.Group className="p-4">
												<div>
													{Array(100)
														.fill(null)
														.map((_, index) => (
															<div key={index}>{index + 1}</div>
														))}
												</div>
											</Dropdown.Group>
										</div>

										<Dropdown.Separator className="m-0" />
									</Dropdown.Content>
								</Dropdown.Portal>
							</Dropdown.Root>

							<Button
								color="default"
								className="flex gap-1 px-3 items-center"
							>
								<CiBatteryCharging size={20} />
								<span className="hidden sm:inline">Go Premium</span>
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
