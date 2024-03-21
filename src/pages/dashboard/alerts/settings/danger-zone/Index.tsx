/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { changeFormData, changeVariants } from "@store/slices/alertSlice";
import { makeRequest } from "@services/utils";
import { RootState } from "@store/index";
import { endpoints } from "@services/endpoints";
import store from "store2";
import { toast } from "react-toastify";
import { useState } from "react";
import { Oval } from "react-loader-spinner";

interface Variant {
	variantTitle: string;
}
interface ResponseData {
	success: boolean;
	message: string;
	data: Variant[];
}

const DangerZone = () => {
	const dispatch = useDispatch();
	const [loading, setLoading] = useState<boolean>(false);
	const { variantID, itemVariantsID } = useSelector(
		(state: RootState) => state.alert.data
	);

	const initState = useSelector(
		(state: RootState) => state.alert.initialAlertState
	);

	const handleDeleteVariant = async () => {
		if (itemVariantsID) {
			setLoading(true);

			try {
				const reqData = {
					item_variantID: itemVariantsID,
				};

				const response: ResponseData | null = await makeRequest(
					"delete",
					endpoints.deleteVariant,
					reqData
				);

				if (response !== null) {
					const { success, message } = response;

					if (success) {
						toast.success(message);
						dispatch(changeFormData(initState));
					} else {
						toast.error(message);
					}
					await getVariant();
				}
				setLoading(false);
			} catch (error: any) {
				toast.error(error);
				setLoading(false);
			}
		} else {
			toast.error("Please select the item variant you wish to delete");
		}
	};

	const getVariant = async () => {
		try {
			const reqData = {
				userID: store.get("id"),
			};

			const variantEndpoints: { [key: number]: string } = {
				1: endpoints.getFollows,
				2: endpoints.getDonations,
				3: endpoints.getSubscriptions,
			};

			const response: ResponseData | null = await makeRequest(
				"get",
				variantEndpoints[variantID],
				reqData
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
		<div className="p-4">
			<div className="flex w-full flex-col gap-2">
				<p className="text-xs font-semibold">
					These actions can not be undone
				</p>
				<Button
					color="danger"
					size="lg"
					className="w-full"
					onClick={handleDeleteVariant}
					disabled={loading || !itemVariantsID}
				>
					Delete Variant
					{loading && (
						<Oval
							visible={loading}
							height="22"
							width="22"
							color="#ffffff"
							secondaryColor="#ffffff"
							ariaLabel="oval-loading"
							wrapperClass="ml-2"
						/>
					)}
				</Button>
			</div>
		</div>
	);
};

export default DangerZone;
