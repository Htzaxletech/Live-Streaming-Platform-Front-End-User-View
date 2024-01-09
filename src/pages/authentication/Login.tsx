/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useState } from "react";
import Modal from "./Modal";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import AuthHeader from "./AuthHeader";
import { handleRequestError, makeRequest } from "@services/utils";
import { endpoints as ep } from "@services/endpoints";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
	setOpenLogin,
	setOpenSignUp,
	setOpenTwoFactor,
} from "@store/slices/modalSlice";
import store from "store2";
import { toast } from "react-toastify";
import { login } from "@store/slices/authSlice";

const Login: React.FC = () => {
	const [username, setUsername] = useState<string>("");
	const [password, setPassword] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const dispatch = useDispatch();
	const { isOpenLogin } = useSelector((state: RootState) => state.modals);	

	const handleLogin = async (e) => {
		e.preventDefault();
		setLoading(true);

		try {
			const loginResult = await makeRequest("post", ep.login, {
				username,
				password,
			});

			if (loginResult?.success) {
				store.set("accessToken", loginResult?.accessToken);
				store.set("username", loginResult?.data?.username);
				
				if (loginResult?.data?.twofactors === 1) {
					store.set("firstTime", loginResult?.data?.first_time);
					Cookies.set("qrCode", loginResult.qr_codes);
					dispatch(setOpenLogin(false));
					dispatch(setOpenTwoFactor(true));
				} else {
					toast.success(loginResult?.message);
					store.set("userData", loginResult?.data);
					dispatch(login());
					dispatch(setOpenLogin(false));
				}
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			handleRequestError(error);
		}
	};

	const handleOnClose = () => {
		dispatch(setOpenLogin(false));
		dispatch(setOpenSignUp(false));
	};

	const handleSwitchToSignUp = () => {
		dispatch(setOpenLogin(false));
		dispatch(setOpenSignUp(true));
	};

	return (
		<div>
			<Modal isOpen={isOpenLogin} onClose={handleOnClose}>
				<div>
					<AuthHeader title="Login to Twitch" />
					<div className="px-0 pt-6 pb-8 mb-4">
						<form onSubmit={handleLogin}>
							<div className="mb-4">
								<label
									className="block text-sm font-bold mb-2"
									htmlFor="username"
								>
									Username
								</label>
								<Input
									autoFocus
									className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
									id="username"
									type="text"
									placeholder="Enter your username"
									value={username}
									onChange={(e) => setUsername(e.target.value)}
								/>
							</div>
							<div className="mb-6">
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
									onChange={(e) => setPassword(e.target.value)}
								/>
							</div>
							<div className="mb-6">
								<Button
									className="w-full"
									color="primary"
									type="submit"
									disabled={loading}
								>
									{loading ? "Loading..." : "Login"}
								</Button>
							</div>
							<Button
								type="button"
								onClick={handleSwitchToSignUp}
								className="w-full bg-transparent text-primary-500 dark:hover:text-slate-100 hover:text-black text-sm"
							>
								Don't have an account? Sign Up
							</Button>
						</form>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default Login;
