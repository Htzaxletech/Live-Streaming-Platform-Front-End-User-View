import Button from "@components/ui/Button";
import { endpoints } from "@services/endpoints";
import { makeRequest } from "@services/utils";
import { RootState } from "@store/index";
import { convertImageUrlToBase64 } from "@utils/helpers";
import { useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import store from "store2";

interface ResponseData {
	success: boolean;
	message: string;
}

const PreviewHeader = () => {
	const [loading, setLoading] = useState(false);

	const alertData = useSelector((state: RootState) => state.alert.data);

	const handleSave = async () => {
		setLoading(true);

		const b64AlertImage = await convertImageUrlToBase64(
			alertData.alertImage.url || ""
		);
		const splittedImageURL = b64AlertImage.split(",")[1];

		const b64AlertSound = await convertImageUrlToBase64(
			alertData.alertSound.url || ""
		);
		const splittedSoundURL = b64AlertSound.split(",")[1];


		try {
			const reqData = {
				userID: store.get("id"),
				variantID: alertData.variantID,
				alert_conditionID: alertData.alertCondition,
				variantName: alertData.variantName,
				duration: alertData.duration,
				animationInID: 1,
				animationOutID: 2,
				inSecond: alertData.inAnimationTime,
				outSecond: alertData.outAnimationTime,
				layoutID: alertData.layout,
				message: alertData.message,
				textColor: alertData.textColor,
				accentColor: alertData.accentColor,
				alertImage: splittedImageURL,
				alertImageName: alertData.alertImage.name,
				scale: alertData.alertImage.scale,
				alertSound: splittedSoundURL,
				alertSoundName: alertData.alertSound.name,
				is_new: 0,
				item_variantID: alertData.itemVariantsID,
			};

			console.log("reqData", reqData);
			return false;

			const response: ResponseData | null = await makeRequest(
				"post",
				endpoints.saveVariant,
				reqData
			);

			if (response !== null){
				const { success, message } = response;

				if (success) {
					toast.success(message);
				} else {
					toast.error(message);
				}
			}
				
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<div className="sticky top-[50px] shadow z-20 bg-background-body flex justify-between items-center px-4 py-2">
			<div>
				<Button>Back to Alerts Home</Button>
			</div>
			<div>
				<h6 className="font-semibold">Alert Box 2</h6>
			</div>
			<div className="flex items-center gap-2">
				<Button color="default" size="lg">
					Discard Changes
				</Button>
				<Button
					color="primary"
					size="lg"
					onClick={handleSave}
					disabled={loading}
				>
					Save Changes
				</Button>
			</div>
		</div>
	);
};

export default PreviewHeader;
