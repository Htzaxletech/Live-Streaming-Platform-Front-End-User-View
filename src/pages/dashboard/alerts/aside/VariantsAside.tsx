/* eslint-disable @typescript-eslint/no-explicit-any */
import TogglePanel from "@components/ui/TogglePanel";
import { FaRegHeart, FaRegStar } from "react-icons/fa";
import { IoDiamondSharp } from "react-icons/io5";
import Variants from "../variants/Index";
import { endpoints } from "@services/endpoints";
import { makeMultipleRequests } from "@services/utils";
import { useEffect } from "react";
import { toast } from "react-toastify";
import store from "store2";
import { RootState } from "@store/index";
import { useDispatch, useSelector } from "react-redux";
import { changeVariants } from "@store/slices/alertSlice";

const VariantsAside = () => {
	interface Variant {
		variantTitle: string;
	}
	
	interface ResponseData {
		success: boolean;
		message: string;
		data: Variant[];
	}

	const dispatch = useDispatch();

	const variants = useSelector((state: RootState) => state.alert.variants);
	const { isShowFollow, isShowSubscribe, isShowDonate } = useSelector(
		(state: RootState) => state.alert.variants
	);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		(async () => {
			try {
				const requests = [
					{
						method: "get",
						url: endpoints.getFollows,
						data: {
							userID: store.get("id"),
						},
						config: { signal },
					},
					{
						method: "get",
						url: endpoints.getSubscriptions,
						data: {
							userID: store.get("id"),
						},
						config: { signal },
					},
					{
						method: "get",
						url: endpoints.getDonations,
						data: {
							userID: store.get("id"),
						},
						config: { signal },
					},
				];

				const responseData: ResponseData[] | null =
					await makeMultipleRequests(requests);

				if (responseData) {
					responseData.forEach((response, index) => {
						if (response.success) {
							const { data } = response;

							switch (index) {
								case 0:
									dispatch(changeVariants({ follow: data }));
									break;
								case 1:
									dispatch(changeVariants({ subscription: data }));
									break;
								case 2:
									dispatch(changeVariants({ donation: data }));
									break;
								default:
									break;
							}
						}
					});
				}
			} catch (error) {
				toast.error(error as any);
			}
		})();

		return () => {
			abortController.abort();
		};
	}, []);

	return (
		<div className="overflow-y-auto flex h-screen z-10">
			<div className="w-80 flex-grow-0 bg-background-base">
				<TogglePanel
					icon={<FaRegHeart size={16} />}
					heading={"Follows"}
					defaultOpen={isShowFollow}
					className="bg-background-float"
				>
					<Variants hideNewVariant initialData={variants.follow} />
				</TogglePanel>

				<TogglePanel
					heading="Subscriptions"
					icon={<FaRegStar size={16} />}
					defaultOpen={isShowSubscribe}
					className="bg-background-float"
				>
					<Variants initialData={variants.subscription} />
				</TogglePanel>

				<TogglePanel
					heading="Donations"
					icon={<IoDiamondSharp size={16} />}
					defaultOpen={isShowDonate}
					className="bg-background-float"
				>
					<Variants initialData={variants.donation} />
				</TogglePanel>
			</div>
		</div>
	);
};

export default VariantsAside;
