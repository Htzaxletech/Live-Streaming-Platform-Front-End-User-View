/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@components/ui/Button";
import { useDispatch, useSelector } from "react-redux";
import { changeVariants } from "@store/slices/alertSlice";
import { makeRequest } from "@services/utils";
import { RootState } from "@store/index";
import { endpoints } from "@services/endpoints";
import store from "store2";
import { toast } from "react-toastify";

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
	const { variantID } = useSelector(
		(state: RootState) => state.alert.data
	);

	const variants = useSelector((state: RootState) => state.alert.variants);

	const handleDeleteVariant = async () => {
		dispatch(changeVariants({ ...variants, follow: [], isShowFollow: true }));

		const data = {
			...(variantID === 1 && { follow: [], isShowFollow: true }),
			...(variantID === 2 && { donation: [], isShowDonate: true }),
			...(variantID === 3 && { subscription: [], isShowSubscribe: true }),
		};

		dispatch(
			changeVariants(data)
		);

		// console.log("data", data);
		// await getVariant();
	}

	const getVariant = async () => {
		try {
			const reqData = {
				userID: 1 || store.get("id"),
			};

			const endpoint: string =
				variantID === 1
					? endpoints.getFollows
					: variantID === 2
					? endpoints.getDonations
					: endpoints.getSubscriptions;

			const response: ResponseData | null = await makeRequest(
				"get",
				endpoint,
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
	}

	return (
		<div className="p-4">
			<div className="flex w-full flex-col gap-2">
				<p className="text-xs font-semibold">These actions can not be undone</p>
				<Button color="danger" size="lg" className="w-full" onClick={handleDeleteVariant}>
					Delete Variant
				</Button>
			</div>
		</div>
	);
};

export default DangerZone;
