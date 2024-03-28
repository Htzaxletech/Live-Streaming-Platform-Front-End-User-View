/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@components/ui/Button";
import { endpoints } from "@services/endpoints";
import { makeRequest } from "@services/utils";
import { RootState } from "@store/index";
import { changeFormData, changeVariants } from "@store/slices/alertSlice";
import { convertImageUrlToBase64, isBase64URL } from "@utils/helpers";
import { useState } from "react";
import { Oval } from "react-loader-spinner";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import store from "store2";

interface ResponseData {
	success: boolean;
	message: string;
	data: any;
}

const PreviewHeader = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState(false);
	const alertData = useSelector((state: RootState) => state.alert.data);
	const discardData = useSelector((state: RootState) => state.alert.discardData);

	const handleSaveChanges = async () => {
		setLoading(true);

		let splittedImageURL;
		let splittedSoundURL;

		if (isBase64URL(alertData.alertImage.url)) {
			splittedImageURL = alertData.alertImage.url.split(",")[1];
		} else {
			const b64AlertImage = await convertImageUrlToBase64(
				alertData.alertImage.url || ""
			);
			splittedImageURL = b64AlertImage.split(",")[1];
		}

		if (isBase64URL(alertData.alertSound.url)) {
			splittedSoundURL = alertData.alertSound.url.split(",")[1];
		} else {
			const b64AlertSound = await convertImageUrlToBase64(
				alertData.alertSound.url || ""
			);
			splittedSoundURL = b64AlertSound.split(",")[1];
		}

		try {
			const reqData = {
				userID: store.get("id"),
				variantID: alertData?.variantID,
				alert_conditionID: alertData?.alertConditionID,
				variantName: alertData?.variantName,
				duration: alertData?.duration,
				inAnimation: alertData?.inAnimation,
				outAnimation: alertData?.outAnimation,
				animationInType: alertData?.inAnimationType,
				animationOutType: alertData?.outAnimationType,
				inSecond: alertData?.inAnimationTime,
				outSecond: alertData?.outAnimationTime,
				layoutID: parseInt(alertData?.layout),
				message: alertData?.message,
				textColor: alertData?.textColor,
				accentColor: alertData?.accentColor,
				alertImage: splittedImageURL,
				alertImageName: alertData?.alertImage.name,
				alertImageType: alertData?.alertImage.type,
				scale: alertData?.alertImage.scale,
				alertSound: splittedSoundURL,
				alertSoundName: alertData?.alertSound.name,
				alertSoundType: alertData?.alertSound.type,
				is_new: 0,
				item_variantID: alertData?.itemVariantsID,
				streamKey: store.get("channelData")?.streamKey,
				width: alertData?.width,
				height: alertData?.height,
				voice_alert_status: alertData?.isCheckedSayTextAlert ? 1 : 0,
			};

			console.log("reqData", reqData);
			// console.log("alertData?.inAnimationType", alertData?.inAnimationType);
			// return false;
			
			const response: ResponseData | null = await makeRequest(
				"post",
				endpoints.saveVariant,
				reqData
			);

			if (response !== null) {
				const { success, message } = response;

				if (success) {
					toast.success(message);
					await getVariant();
				} else {
					toast.error(message);
				}
			}

			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const handleDiscardChanges = () => {
		dispatch(changeFormData(discardData))
	}

	const getVariant = async () => {
		try {
			const variantID = alertData.variantID;

			const variantEndpoints: { [key: number]: string } = {
				1: endpoints.getFollows,
				2: endpoints.getDonations,
				3: endpoints.getSubscriptions,
			};

			const response: ResponseData | null = await makeRequest(
				"get",
				variantEndpoints[alertData.variantID],
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
		} catch (error: any) {
			toast.error(error);
		}
	};

	return (
		<div className="shadow z-20 bg-background-body flex justify-between items-center px-4 py-2">
			<div>
				<Button>Back to Alerts Home</Button>
			</div>
			<div>
				<h6 className="font-semibold uppercase">Alerts Box {alertData?.indexNumber}</h6>
			</div>
			<div className="flex items-center gap-2">
				<Button
					color="default"
					size="lg"
					onClick={handleDiscardChanges}
					disabled={loading || !alertData?.itemVariantsID}
				>
					Discard Changes
				</Button>
				<Button
					color="primary"
					size="lg"
					onClick={handleSaveChanges}
					disabled={loading || !alertData?.itemVariantsID}
				>
					Save Changes
					{loading && (
						<Oval
							visible={loading}
							height="20"
							width="20"
							color="#ffffff"
							secondaryColor="#00c798"
							ariaLabel="oval-loading"
							wrapperClass="ml-2"
						/>
					)}
				</Button>
			</div>
		</div>
	);
};

export default PreviewHeader;
