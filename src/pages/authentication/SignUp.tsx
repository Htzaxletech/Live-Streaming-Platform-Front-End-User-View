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

const SignUp: React.FC = () => {
	const [username, setUsername] = useState<string>(
		store.get("username") || ""
	);
	const [password, setPassword] = useState<string>(
		store.get("password") || ""
	);
	const [email, setEmail] = useState<string>(store.get("email") || "");
	const [loading, setLoading] = useState<boolean>(false);

	const dispatch = useDispatch();
	const { isOpenSignUp } = useSelector((state: RootState) => state.modals);

	const handleSignUp = async () => {
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
		store.remove("username");
		store.remove("password");
		store.remove("email");
		dispatch(setOpenSignUp(false));
		dispatch(setOpenLogin(false));
	};

	const handleSwitchToLogin = () => {
		store.remove("username");
		store.remove("password");
		store.remove("email");
		dispatch(setOpenSignUp(false));
		dispatch(setOpenLogin(true));
	};

	return (
		<div>
			<Modal isOpen={isOpenSignUp} onClose={handleOnClose}>
				<div>
					<AuthHeader title="Join Twitch today" />
					<div className="px-0 pt-6 pb-8 mb-4">
						<div className="mb-4">
							<label
								className="block text-sm font-bold mb-2"
								htmlFor="username"
							>
								Username
							</label>
							<Input
								className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
								id="username"
								type="text"
								placeholder="Enter your username"
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
								Password
							</label>
							<Input
								className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
								id="password"
								type="password"
								placeholder="Enter your password"
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
								Email
							</label>
							<Input
								className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
								id="email"
								type="email"
								placeholder="Enter your email"
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
								type="button"
								disabled={loading}
								onClick={handleSignUp}
							>
								{loading ? "Loading..." : "Sign Up"}
							</Button>
						</div>
						<Button
							onClick={handleSwitchToLogin}
							className="w-full bg-transparent text-primary-500 dark:hover:text-slate-100 hover:text-black text-sm"
						>
							Already a Twich user? Log In
						</Button>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default SignUp;
