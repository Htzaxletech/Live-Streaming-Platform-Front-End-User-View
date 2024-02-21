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
	const [username, setUsername] = useState<string>(
		store.get("singup_username") || ""
	);
	const [password, setPassword] = useState<string>(
		store.get("signup_password") || ""
	);
	const [email, setEmail] = useState<string>(store.get("signup_email") || "");
	const [loading, setLoading] = useState<boolean>(false);
	const [validations, setValidations] = useState({
		capital: false,
		small: false,
		number: false,
		length: false,
	});

	const [isValid, setIsValid] = useState(false);

	const dispatch = useDispatch();
	const { t } = useTranslation();
	const { isOpenSignUp } = useSelector((state: RootState) => state.modals);

	const handleSignUp = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		if (isValid) {
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

	const validatePassword = (value: string) => {
		const capitalRegex = /[A-Z]/;
		const smallRegex = /[a-z]/;
		const numberRegex = /[0-9]/;

		const isValid =
			capitalRegex.test(value) &&
			smallRegex.test(value) &&
			numberRegex.test(value) &&
			value.length >= 8;

		setValidations({
			capital: capitalRegex.test(value),
			small: smallRegex.test(value),
			number: numberRegex.test(value),
			length: value.length >= 8,
		});

		setIsValid(isValid);
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
									required
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
									required
									className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
									id="password"
									type="password"
									placeholder={t("placeholder.password")}
									value={password}
									onChange={(e) => {
										setPassword(e.target.value);
										validatePassword(e.target.value);
										store.set("password", e.target.value);
									}}
								/>
								<ul className="mt-2 text-sm text-gray-500">
									<li>
										{validations.capital ? "✅" : "❌"}
										{validations.capital
											? t("validations.capital.true")
											: t("validations.capital.false")}
									</li>
									<li>
										{validations.small ? "✅" : "❌"}
										{validations.small
											? t("validations.small.true")
											: t("validations.small.false")}
									</li>
									<li>
										{validations.number ? "✅" : "❌"}
										{validations.number
											? t("validations.number.true")
											: t("validations.number.false")}
									</li>
									<li>
										{validations.length ? "✅" : "❌"}
										{validations.length
											? t("validations.length.true")
											: t("validations.length.false")}
									</li>
								</ul>
							</div>
							<div className="mb-6">
								<label
									className="block text-sm font-bold mb-2"
									htmlFor="email"
								>
									{t("auth.email")}
								</label>
								<Input
									required
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
									disabled={loading || !isValid}
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
