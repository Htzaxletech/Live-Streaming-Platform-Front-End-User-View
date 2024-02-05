/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck
import React, { useState } from "react";
import Modal from "./Modal";
import Input from "@components/ui/Input";
import Button from "@components/ui/Button";
import Heading from "@components/ui/Heading";
// import QRCode from "react-qr-code";
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
import { useTranslation } from "react-i18next";

const TwoFactor: React.FC = () => {
	const { t } = useTranslation();
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
				secret_code: store.get("secretCode"),
			});

			if(response?.success){
				store.set("accessToken", response?.accessToken);
				store.set("id", response?.data?.dataValues?.ID);
				store.set("userData", response?.data?.dataValues);
				store.remove("firstTime");
				store.remove("password");
				store.remove("email");

				console.log("lastToken", response?.accessToken);

				dispatch(login(response?.accessToken));
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

	const image = store.get("qrCode");

	return (
		<div>
			<Modal isOpen={isOpenTwoFactor} onClose={handleOnClose}>
				<form onSubmit={handleSubmit}>
					{store.get("firstTime") ? (
						<div>
							<Heading size="md" className="mb-3">
								{t("auth.2fa")}
							</Heading>
							<div className="px-0 pt-6">
								<div className="mb-6">
									<label
										className="block text-sm font-bold mb-1"
										htmlFor="code"
									>
										{t("auth.step1_label")}
									</label>
									<p className="text-sm">{t("auth.step1_p")}</p>
								</div>

								<div className="mb-6">
									<label
										className="block text-sm font-bold mb-1"
										htmlFor="code"
									>
										{t("auth.step2_label")}
									</label>
									<p className="text-sm mb-1">{t("auth.step2_p")}</p>
									<div className="flex justify-center mt-5">
										<img src={image} alt="QR Code" />
									</div>
								</div>

								<div className="mb-6">
									<label
										className="block text-sm font-bold mb-1"
										htmlFor="code"
									>
										{t("auth.step3_label")}
									</label>
									<p className="mb-3">{t("auth.step3_p")}</p>
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
										{t("auth.back")}
									</Button>
									<Button
										className="mb-3"
										color="primary"
										type="submit"
									>
										{t("auth.submit")}
									</Button>
								</div>
							</div>
						</div>
					) : (
						<div>
							<div className="mb-6">
								<p className="mb-3 font-semibold">
									{t("auth.confirm_otp")}
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
									{t("auth.back")}
								</Button>
								<Button
									className="mb-3"
									color="primary"
									type="submit"
									disabled={loading}
								>
									{loading ? "Loading..." : t("auth.submit")}
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
