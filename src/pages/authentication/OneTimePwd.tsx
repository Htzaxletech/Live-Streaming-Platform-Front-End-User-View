/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import React, { useState } from "react";
import Modal from "./Modal";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import AuthHeader from "./AuthHeader";
import { useDispatch, useSelector } from "react-redux";
import { setOpenOTP, setOpenSignUp } from "@store/slices/modalSlice";
import { RootState } from "@store/index";
import { handleRequestError, makeRequest } from "@services/utils";
import { endpoints as ep } from "@services/endpoints";
import store from "store2";
// import ErrorMessage from "@components/shared/ErrorMessage";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { FaArrowLeft } from "react-icons/fa";

const OneTimePwd: React.FC = () => {
	const { t } = useTranslation();
	const dispatch = useDispatch();
	const [otp, setOtp] = useState<string>("");
	// const [errorMessage, setErrorMessage] = useState<string>("");

	const [loading, setLoading] = useState<boolean>(false);
	const [loading2, setLoading2] = useState<boolean>(false);

	const { isOpenOTP } = useSelector((state: RootState) => state.modals);

	const handleOTPVerify = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		setLoading(true);

		const username = store.get("username");
		const password = store.get("password");
		const email = store.get("email");

		try {
			const registerResp = await makeRequest("post", ep.register, {
				username,
				password,
				email,
				emailotp: otp,
			});

			if (registerResp?.success) {
				store.remove("username");
				store.remove("password");
				store.remove("email");
				
				toast.success(registerResp?.message);
				dispatch(setOpenOTP(false));
			} else {
				toast.error(registerResp?.errors[0])
				// setErrorMessage(registerResp?.errors[0]);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			handleRequestError(error);
		}
	};

	const handleOnClose = () => {
		dispatch(setOpenOTP(false));
	};

	const handleBack = () => {
		dispatch(setOpenOTP(false));
		dispatch(setOpenSignUp(true));
	};

	const handleOtpResend = async () => {
		setLoading2(true);
		const username = store.get("username");
		const password = store.get("password");
		const email = store.get("email");

		try {
			await makeRequest("post", ep.verify, {
				username,
				password,
				email,
			});

			setLoading2(false);
		} catch (error) {
			setLoading2(false);
			handleRequestError(error);
		}
	};

	return (
		<div>
			<Modal isOpen={isOpenOTP} onClose={handleOnClose}>
				<div>
					<Button color="default" onClick={handleBack}>
						<FaArrowLeft />
					</Button>
					<AuthHeader
						title={t("auth.signup_title", { heading: t("auth.heading") })}
					/>
					<div className="px-0 pt-6 pb-4">
						<form onSubmit={handleOTPVerify}>
							{/* {errorMessage && (
								<ErrorMessage
									message={errorMessage}
									isClosable={true}
									onClear={() => setErrorMessage("")}
								/>
							)} */}
							<div className="mb-4">
								<label
									className="block text-sm font-bold mb-2"
									htmlFor="otp"
								>
									{t("auth.otp")}
								</label>
								<Input
									autoFocus
									className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
									id="otp"
									type="text"
									value={otp}
									onChange={(e) => setOtp(e.target.value)}
								/>
							</div>

							<Button
								className="w-full mb-3"
								color="primary"
								type="submit"
								disabled={loading}
							>
								{loading ? "Loading..." : t("auth.verify")}
							</Button>
							<Button
								className="w-full"
								type="button"
								onClick={handleOtpResend}
								disabled={loading2}
							>
								{loading2 ? "Loading..." : t("auth.resend")}
							</Button>
						</form>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default OneTimePwd;
