/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useState } from "react";
import Modal from "./Modal";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import AuthHeader from "./AuthHeader";
import {
	setOpenLogin,
	setOpenOTP,
	setOpenSignUp,
} from "@store/slices/modalSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/index";
import store from "store2";
import { endpoints as ep } from "@services/endpoints";
import { handleRequestError, makeRequest } from "@services/utils";
import { useTranslation } from "react-i18next";

const SignUp: React.FC = () => {
	const { t } = useTranslation();
	const [username, setUsername] = useState<string>(
		store.get("singup_username") || ""
	);
	const [password, setPassword] = useState<string>(
		store.get("signup_password") || ""
	);
	const [email, setEmail] = useState<string>(store.get("signup_email") || "");
	const [loading, setLoading] = useState<boolean>(false);

	const dispatch = useDispatch();
	const { isOpenSignUp } = useSelector((state: RootState) => state.modals);

	const handleSignUp = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		setLoading(true);
		try {
			await makeRequest("post", ep.verify, {
				email,
			});

			setLoading(false);
			dispatch(setOpenSignUp(false));
			dispatch(setOpenOTP(true));
		} catch (error) {
			setLoading(false);
			handleRequestError(error);
		}
	};

	const handleOnClose = () => {
		store.remove("singup_username");
		store.remove("signup_password");
		store.remove("signup_email");
		dispatch(setOpenSignUp(false));
		dispatch(setOpenLogin(false));
	};

	const handleSwitchToLogin = () => {
		store.remove("singup_username");
		store.remove("signup_password");
		store.remove("signup_email");
		dispatch(setOpenSignUp(false));
		dispatch(setOpenLogin(true));
	};

	return (
		<div>
			<Modal isOpen={isOpenSignUp} onClose={handleOnClose}>
				<div>
					<AuthHeader
						title={t("auth.signup_title", { heading: t("auth.heading") })}
					/>
					<div className="px-0 pt-6 pb-8 mb-4">
						<form onSubmit={handleSignUp}>
							<div className="mb-4">
								<label
									className="block text-sm font-bold mb-2"
									htmlFor="username"
								>
									{t("auth.name")}
								</label>
								<Input
									autoFocus
									className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
									id="username"
									type="text"
									placeholder={t("placeholder.name")}
									value={username}
									onChange={(e) => {
										setUsername(e.target.value);
										store.set("username", e.target.value);
									}}
								/>
							</div>
							<div className="mb-4">
								<label
									className="block text-sm font-bold mb-2"
									htmlFor="password"
								>
									{t("auth.password")}
								</label>
								<Input
									className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
									id="password"
									type="password"
									placeholder={t("placeholder.password")}
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
										store.set("password", e.target.value);
									}}
								/>
							</div>
							<div className="mb-6">
								<label
									className="block text-sm font-bold mb-2"
									htmlFor="email"
								>
									{t("auth.email")}
								</label>
								<Input
									className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
									id="email"
									type="email"
									placeholder={t("placeholder.email")}
									value={email}
									onChange={(e) => {
										setEmail(e.target.value);
										store.set("email", e.target.value);
									}}
								/>
							</div>
							<div className="mb-6">
								<Button
									className="w-full"
									color="primary"
									type="submit"
									disabled={loading}
								>
									{loading ? "Loading..." : t("navbar.signup")}
								</Button>
							</div>
							<Button
								type="button"
								onClick={handleSwitchToLogin}
								className="w-full bg-transparent text-primary-500 dark:hover:text-slate-100 hover:text-black text-sm"
							>
								{t("auth.exist")}
							</Button>
						</form>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default SignUp;
