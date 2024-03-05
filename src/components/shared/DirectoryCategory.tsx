/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import React, { useCallback } from "react";
import { CategoryLink } from "@components/ui/CategoryLink";
import { useEffect, useState } from "react";
import { makeRequest } from "@services/utils";
import { endpoints } from "@services/endpoints";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { convertToLowerCase } from "@utils/helpers";
import Skeleton from "react-loading-skeleton";

const DirectoryCategory: React.FC = () => {
	interface CategoryDataType {}

	const [loading, setLoading] = useState<boolean>(true);
	const [categories, setCategories] = useState<CategoryDataType[]>([]);
	const navigate = useNavigate();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		(async () => {
			try {
				const reqData = {};

				const { success, message, data } = await makeRequest(
					"get",
					endpoints.mainCategory,
					reqData,
					{
						signal,
					}
				);

				if (success && data?.length > 0) {
					setCategories(data);
				} else {
					toast.error(message);
				}
				setLoading(false);
			} catch (error) {
				setLoading(false);
			}
		})();

		return () => {
			abortController.abort();
		};
	}, []);

	const handleClick = useCallback((data: any) => {
		const categoryNameLowerCase = convertToLowerCase(data?.categoryName);
		if (categoryNameLowerCase) {
			navigate(`/directory/${categoryNameLowerCase}`, {
				state: {
					categoryState: data,
				},
			});
		}
	}, []);

	// const images = [
	// 	// "https://cdn-icons-png.flaticon.com/512/5930/5930147.png",
	// 	"https://upload.wikimedia.org/wikipedia/en/thumb/7/7a/Manchester_United_FC_crest.svg/1200px-Manchester_United_FC_crest.svg.png",
	// 	"https://www.freeiconspng.com/thumbs/sports-icon-png/sports-football-icon-4.png",
	// 	"https://cdn-icons-png.freepik.com/256/857/857455.png",
	// 	"https://images-wixmp-ed30a86b8c4ca887773594c2.wixmp.com/i/8678cecb-9a26-4eba-91ba-a768c9e7ebf0/d9h5066-770e2946-495d-41c7-8f1c-ea0fba98c945.png",
	// 	"https://icons.iconarchive.com/icons/3xhumed/call-of-duty-modern-warfare-3/512/CoD-Modern-Warfare-3-1a-icon.png",
	// 	"https://axletechs3bucket.s3.ap-southeast-1.amazonaws.com/Live_Streaming/Storage/10cd7e.png",
	// ];

	return (
		<div className="grid grid-flow-col auto-cols-max py-3 gap-2 overflow-auto">
			{categories?.length > 0 &&
				categories?.map((i, index) => {
					return (
						<div key={index} onClick={() => handleClick(i)}>
							<CategoryLink
								to=""
								color="default"
								size="md"
								icon={
									<img
										src={i.s3path}
										alt="icon"
										className="h-full w-full"
									/>
								}
								// icon={<img src={images[index]} alt="icon" className="h-full w-full" />}
							>
								{i.categoryName}
							</CategoryLink>
						</div>
					);
				})}

			{loading && (
				<div className="flex gap-2">
					<Skeleton width={250} height={50} />
					<Skeleton width={250} height={50} />
					<Skeleton width={250} height={50} />
					<Skeleton width={250} height={50} />
					<Skeleton width={250} height={50} />
				</div>
			)}
		</div>
	);
};

export default DirectoryCategory;
