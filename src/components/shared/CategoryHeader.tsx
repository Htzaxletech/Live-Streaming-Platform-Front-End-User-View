/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import gaming from "@assets/images/gaming.svg";
import Tag from "@components/ui/Tag";
import { endpoints } from "@services/endpoints";
import { makeRequest } from "@services/utils";
import { useEffect, useState } from "react";
import Skeleton from "react-loading-skeleton";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const CategoryHeader: React.FC = () => {
	const { categoryID } = useParams();
	const [loading, setLoading] = useState<boolean>(true);
	const [categoryData, setCategoryData] = useState<[]>([]);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		(async () => {
			try {
				const { success, message, data } = await makeRequest(
					"get",
					endpoints.categoryDetail,
					{
						catID: categoryID,
					},
					{
						signal,
					}
				);

				if (success) {
					setCategoryData(data?.[0]);
				}
				setLoading(false);
			} catch (error) {
				toast.error(error);
				setLoading(false);
			}
		})();

		return () => {
			abortController.abort();
		};
	}, [categoryID]);

	return (
		<div className="w-full lg:w-2/4">
			<div className="grid grid-cols-12 lg:grid-cols-5 lg:gap-4">
				{/* Image Thumbnail Grid (20%) */}
				<div className="col-span-12 lg:col-span-1">
					{!loading ? (
						<img
							src={categoryData?.s3categoryImage}
							alt={categoryData?.categoryName}
							className="w-full h-full mb-4"
							loading="lazy"
						/>
					) : (
						<Skeleton height="100%" width="100%" />
					)}
				</div>

				{/* Title and Content Grid (80%) */}
				<div className="col-span-12 lg:col-span-4 grid lg:grid-cols-1">
					<div className="flex flex-col lg:p-4 rounded-md gap-1">
						<h1 className="text-xl font-bold mb-2">
							{categoryData?.categoryName}
						</h1>
						{categoryData?.secondCat && (
							<div className="flex items-center gap-3 mb-3">
								{categoryData?.secondCat.map((item, index) => (
									<Tag
										key={index}
										to={"/directory"}
										state={{ directory: { ...item, active: 0 } }}
									>
										{item.categoryName}
									</Tag>
								))}
							</div>
						)}

						<p>{categoryData?.description}</p>

						{loading && <Skeleton count={3} />}
					</div>
				</div>
			</div>
		</div>
	);
};

export default CategoryHeader;
