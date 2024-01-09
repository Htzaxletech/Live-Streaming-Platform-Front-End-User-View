/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useState } from "react";
import Modal from "./Modal";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import Heading from "@components/ui/Heading";
// import QRCode from "react-qr-code";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/index";
import {
	setOpenLogin,
	setOpenTwoFactor,
} from "@store/slices/modalSlice";
import { handleRequestError, makeRequest } from "@services/utils";
import { endpoints as ep } from "@services/endpoints";
import store from "store2";
import { toast } from "react-toastify";
import { login } from "@store/slices/authSlice";

const TwoFactor: React.FC = () => {
	const [code, setCode] = useState<string>("");
	const [loading, setLoading] = useState<boolean>(false);

	const dispatch = useDispatch();
	const { isOpenTwoFactor } = useSelector((state: RootState) => state.modals);

	const handleSubmit = async (e: { preventDefault: () => void; }) => {
		e.preventDefault();
		const username = store.get("username");
		setLoading(true);

		try {
			const response = await makeRequest("post", ep.qrConfirm, {
				username,
				code,
			});

			if(response?.success){
				store.set("accessToken", response?.accessToken);
				store.set("id", response?.data?.dataValues?.ID);
				store.set("userData", response?.data?.dataValues);
				store.remove("firstTime");
				store.remove("password");
				store.remove("email");

				dispatch(login());
				dispatch(setOpenTwoFactor(false));
				toast.success(response?.message);
			}else{
				toast.error(response?.message);
			}
			
			setLoading(false);
		} catch (error) {
			setLoading(false);
			handleRequestError(error);
		}
		
	};

	const handleBack = () => {
		dispatch(setOpenTwoFactor(false));
		dispatch(setOpenLogin(true));
	};

	const handleOnClose = () => {
		dispatch(setOpenTwoFactor(false));
	};

	const image = Cookies.get("qrCode");

	return (
		<div>
			<Modal isOpen={isOpenTwoFactor} onClose={handleOnClose}>
				<form onSubmit={handleSubmit}>
					{store.get("firstTime") ? (
						<div>
							<Heading size="md" className="mb-3">
								Two-Factor Authentication
							</Heading>
							<div className="px-0 pt-6">
								<div className="mb-6">
									<label
										className="block text-sm font-bold mb-1"
										htmlFor="code"
									>
										Step 1: Download an authenticator app
									</label>
									<p className="text-sm">
										Download and install any authenticator app
									</p>
								</div>

								<div className="mb-6">
									<label
										className="block text-sm font-bold mb-1"
										htmlFor="code"
									>
										Step 2: Scan the QR code
									</label>
									<p className="text-sm mb-1">
										Open the authenticator app and scan the image
										below
									</p>
									<div className="flex justify-center mt-5">
										<img src={image} alt="QR Code" />
									</div>
								</div>

								<div className="mb-6">
									<label
										className="block text-sm font-bold mb-1"
										htmlFor="code"
									>
										Step 3: Verify your code
									</label>
									<p className="mb-3">Enter 6 digit code generated</p>
									<Input
										autoFocus
										className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
										id="code"
										type="text"
										value={code}
										onChange={(e) => setCode(e.target.value)}
									/>
								</div>

								<div className="flex gap-2 justify-end">
									<Button
										className=""
										type="button"
										onClick={handleBack}
									>
										Back
									</Button>
									<Button
										className="mb-3"
										color="primary"
										type="submit"
									>
										Submit
									</Button>
								</div>
							</div>
						</div>
					) : (
						<div>
							<div className="mb-6">
								<p className="mb-3 font-semibold">
									Enter 6 digit code from Microsoft Authenticator
								</p>
								<Input
									autoFocus
									className="shadow appearance-none border rounded w-full mb-2 py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
									id="code"
									type="text"
									value={code}
									onChange={(e) => setCode(e.target.value)}
								/>
							</div>

							<div className="flex gap-2 justify-end">
								<Button type="button" onClick={handleBack}>
									Back
								</Button>
								<Button
									className="mb-3"
									color="primary"
									type="submit"
									disabled={loading}
								>
									{loading ? "Loading..." : "Submit"}
								</Button>
							</div>
						</div>
					)}
				</form>
			</Modal>
		</div>
	);
};

export default TwoFactor;
