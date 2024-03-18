/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { Switch } from "@components/ui/Switch";
import { endpoints } from "@services/endpoints";
import { makeRequest } from "@services/utils";
import { RootState } from "@store/index";
import { changeFormData, changeVariants } from "@store/slices/alertSlice";
import { convertImageUrlToBase64 } from "@utils/helpers";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import store from "store2";
import ringtone from "@assets/ringtone.mp3";
import { Oval } from "react-loader-spinner";

interface VariantsProps {
	initialData?: any[];
	hideNewVariant?: boolean;
	variantID: number;
}

interface ResponseData {
	success: boolean;
	message: string;
	data: any;
}

const Variants: React.FC<VariantsProps> = ({
	initialData,
	hideNewVariant,
	variantID,
}) => {
	const [loading, setLoading] = useState<boolean>(false);
	const alertData = useSelector((state: RootState) => state.alert.data);
	const dispatch = useDispatch();

	const initFollowData = {
		userID: store.get("id"),
		alert_conditionID: 1,
		duration: 1,
		animationInType: "slide-up",
		animationOutType: "slide-up",
		inSecond: "duration-1000",
		outSecond: "duration-1000",
		inAnimation: "slide-in-from-bottom",
		outAnimation: "slide-out-to-top",
		layoutID: 3,
		message: "{username} just followed",
		textColor: "#ffffff",
		accentColor: "#00c798",
		scale: 50,
		is_new: 1,
		username: store.get("userData")?.username,
		streamKey: store.get("channelData")?.streamKey,
		variantName: "",
		item_variantID: "",
		is_used: 1,
	};

	const handleAddEntry = async () => {
		setLoading(true);

		const b64AlertImage = await convertImageUrlToBase64(
			"https://static-cdn.jtvnw.net/default-alert-asset/v1/video/Follow.webm"
		);
		const splittedImageURL = b64AlertImage.split(",")[1];

		const b64AlertSound = await convertImageUrlToBase64(ringtone);
		const splittedSoundURL = b64AlertSound.split(",")[1];

		let reqData = {
			...initFollowData,
			variantID: variantID,
			alertImage: splittedImageURL,
			alertImageName: "Follow.webm",
			alertImageType: "video",
			alertSound: splittedSoundURL,
			alertSoundName: "ringtone.mp3",
		};

		switch (variantID) {
			case 2:
				reqData = {
					...reqData,
					variantName: "New Donations",
					message: "{username} just Cheered {amount} Bits!",
				};
				break;
			case 3:
				reqData = {
					...reqData,
					variantName: "New Subscriber",
					message: "{username} just subscribed!",
				};
				break;
			default:
				reqData = {
					...reqData,
					variantName: "New Follower",
					message: "{username} just followed!",
				};
				break;
		}

		console.log("reqData", reqData);
		const response: ResponseData | null = await makeRequest(
			"post",
			endpoints.saveVariant,
			reqData
		);

		if (response !== null) {
			const { success, message } = response;

			if (success) {
				await getVariants();
			} else {
				toast.error(message);
			}
		}

		setLoading(false);
	};

	const getVariants = async () => {
		try {
			const variantEndpoints: { [key: number]: string } = {
				1: endpoints.getFollows,
				2: endpoints.getDonations,
				3: endpoints.getSubscriptions,
			};

			const response: ResponseData | null = await makeRequest(
				"get",
				variantEndpoints[variantID],
				{
					userID: store.get("id"),
				}
			);

			if (response !== null) {
				const { success, message, data } = response;

				if (success) {
					dispatch(
						changeVariants({
							...(variantID === 1 && { follow: data }),
							...(variantID === 2 && { donation: data }),
							...(variantID === 3 && { subscription: data }),
						})
					);
				} else {
					toast.error(message);
				}
			}
		} catch (error) {
			toast.error(error as any);
		}
	};

	const handleItemVariant = (entry: any) => {
		dispatch(
			changeFormData({
				...alertData,
				itemVariantsID: entry.item_variantID,
			})
		);

		const abortController = new AbortController();
		const signal = abortController.signal;

		(async () => {
			try {
				const reqData = { item_variantID: entry.item_variantID };

				const response: ResponseData | null = await makeRequest(
					"get",
					endpoints.getItemVariant,
					reqData,
					{
						signal,
					}
				);

				if (response !== null) {
					const { success, message, data } = response;

					if (success) {
						const resp = data[0];

						console.log("itemVariantData", resp);

						if (resp) {
							dispatch(
								changeFormData({
									...alertData,
									variantID: resp?.variantID,
									itemVariantsID: resp?.item_variantID,
									variantName: resp?.variantName,
									layout: resp?.layoutID.toString(),
									inAnimationTime: resp?.inSecond,
									outAnimationTime: resp?.outSecond,
									duration: resp?.duration,
									textColor: resp?.textColor,
									accentColor: resp?.accentColor,
									inAnimationType: resp?.animationInType,
									outAnimationType: resp?.animationOutType,
									message: resp?.message,
									alertImage: {
										url: resp?.s3alertImage,
										type: resp?.alertImageType,
										name: resp?.alertImageName,
										scale: resp?.scale,
									},
									alertSound: {
										url: resp?.s3alertSound,
										type: resp?.alertImageType,
										name: resp?.alertSoundName,
									},
									isCheckedSayTextAlert: resp?.voice_alert_status,
									username: resp?.username,
									inAnimation: resp?.inAnimation,
									outAnimation: resp?.outAnimation,
								})
							);
						}
					} else {
						toast.error(message);
					}
				}

			} catch (error: any) {
				toast.error(error);
			}
		})();

		return () => {
			abortController.abort();
		};
	};

	return (
		<div className="pb-2 bg-inherit">
			<div className="bg-background-float">
				<p className="uppercase text-xs mb-2 mx-5 py-1">
					Variants are listed in priority order
				</p>
			</div>
			<div className="flex flex-col mx-2">
				{!hideNewVariant && (
					<Button
						size="lg"
						className="w-full flex gap-2 bg-transparent justify-start mb-3"
						onClick={handleAddEntry}
						disabled={loading}
					>
						<FaPlus />
						New Variant
						{loading && (
							<Oval
								visible={loading}
								height="20"
								width="20"
								ariaLabel="oval-loading"
								wrapperClass="text-primary ml-1"
							/>
						)}
					</Button>
				)}

				{initialData?.map((entry, index) => (
					<div
						key={`variant${index}`}
						className={`flex items-center justify-between gap-3 rounded p-3 cursor-pointer ${
							entry.item_variantID === alertData?.itemVariantsID
								? "bg-primary"
								: "hover:bg-gray-200 dark:hover:bg-zinc-700"
						}`}
						onClick={() => !loading && handleItemVariant(entry)}
					>
						<div className="flex items-center gap-3">
							<Input
								className="max-w-10 rounded-none"
								size="sm"
								readOnly
								value={index + 1}
							/>
							{/* <div className="w-10 h-10 flex justify-center items-center border">
								<p>{index + 1}</p>
							</div> */}
							<div className="text-xs">
								<p>
									<b>{entry.variantName}</b>
								</p>
								<p>{entry.conditionName}</p>
							</div>
						</div>
						<div>
							<Switch
								id={`dark-theme-switch-${entry.variantID}`}
								// onClick={toggleTheme}
								checked={entry.is_used}
							/>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Variants;
