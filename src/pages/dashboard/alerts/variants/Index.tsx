/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { Switch } from "@components/ui/Switch";
import { endpoints } from "@services/endpoints";
import { makeRequest } from "@services/utils";
import { RootState } from "@store/index";
import { changeFormData } from "@store/slices/alertSlice";
import React, { useState } from "react";
import { FaPlus } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface VariantsProps {
	initialData?: any[];
	hideNewVariant?: boolean;
}

interface ResponseData {
	success: boolean;
	message: string;
	data: any;
}

const Variants: React.FC<VariantsProps> = ({ initialData, hideNewVariant }) => {
	const dump = {
		id: Math.random().toString(36).substr(2, 9), // Generate a unique ID
		title: "New Follower",
		description: "Any new follow to your channel",
	};

	// const [data, setData] = useState<any[]>(initialData || []);
	const [loading, setLoading] = useState<boolean>(false);
	const alertData = useSelector((state: RootState) => state.alert.data);
	const dispatch = useDispatch();
	
	const handleAddEntry = () => {
		// const newDataEntry = {
		// 	...dump,
		// };
		// setData([...data, newDataEntry]);
	};

	const handleClick = (entry: any) => {
		dispatch(
			changeFormData({
				...alertData,
				itemVariantsID: entry.item_variantID,
			})
		);

		const abortController = new AbortController();
		const signal = abortController.signal;

		(async () => {
			setLoading(true);

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

						console.log("resp", resp);

						if(resp){
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
								})
							);
						}
					} else {
						toast.error(message);
					}
				}
			
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		})();

		return () => {
			abortController.abort();
		};
	};

	return (
		<div className="mb-2">
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
					>
						<FaPlus />
						New Variant
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
						onClick={() => !loading && handleClick(entry)}
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
