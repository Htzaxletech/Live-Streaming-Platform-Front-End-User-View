/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import Heading from "@components/ui/Heading";
import ShowMoreButton from "@components/ui/ShowMoreButton";
import { endpoints as ep } from "@services/endpoints";
import { makeRequest } from "@services/utils";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import Tag from "@components/ui/Tag";
import { Link, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface VideoDataType {
	secondCat: [];
	displayName: string;
	followers: [];
}

const SearchByVODTag: React.FC = () => {
	const { t } = useTranslation();
	const [loading, setLoading] = useState<boolean>(false);
	const [videoData, setVideoData] = useState<VideoDataType[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [pageSize, setPageSize] = useState<number>(10);
	const [showMoreButton, setShowMoreButton] = useState(true);

	const { searchKeyword } = useParams();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		(async () => {
			handleShowMore(signal, false);
		})();

		return () => {
			setVideoData([]);
			setCurrentPage(0);
			setPageSize(10);
			setShowMoreButton(true);
			abortController.abort();
		};
	}, [searchKeyword]);

	const handleShowMore = async (signal: unknown, isClick: boolean) => {
		setLoading(true);
		const page = isClick ? currentPage + 1 : 0;

		try {
			const reqData = { keyword: searchKeyword, page, pageSize };

			const { success, message, data } = await makeRequest(
				"get",
				ep.searchByVODTag,
				reqData,
				{
					signal,
				}
			);

			if (success) {
				if (data?.length > 0) {
					setVideoData((prevState) => [...prevState, ...data]);
				} else {
					setShowMoreButton(false);
				}

				if (isClick) setCurrentPage((prevPage) => prevPage + 1);
			} else {
				toast.error(message);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setShowMoreButton(false);
		}
	};

	return (
		<>
			{videoData && videoData.length > 0 && (
				<div className="mt-8">
					<Heading size="sm" className="mb-6">
						{t("pages.vt")}
					</Heading>

					{videoData?.map((data, index) => (
						<div
							key={index}
							className="flex flex-col sm:flex-row mb-10 sm:gap-4"
						>
							<div className="w-full sm:w-80 h-32 bg-primary mb-4 sm:mb-0">
								<div className="relative border h-full">
									<img
										className="w-full h-full object-cover"
										// src={
										// 	"https://cdn.oneesports.gg/cdn-data/2023/11/MLBB_AvatarofTime_Angela_charactermodel-1024x576.jpg"
										// }
										src={data?.s3path}
										alt={"video"}
										loading="lazy"
									/>

									<div className="absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded">
										{data?.duration || "00:00:00"}
									</div>
									{/* <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded">
										{4} hours ago
									</div> */}
								</div>
							</div>
							<div className="w-full sm:flex sm:flex-col">
								<Heading className="text-xl">
									<Link to={`/profile/${data?.userID}`}>
										{data?.displayName}
									</Link>
								</Heading>
								<div className="mt-3 flex gap-1">
									{data?.secondCat?.map((i: any, index: number) => {
										return (
											<Tag
												key={index}
												to={"/directory"}
												state={{
													directory: {
														...i,
														categoryName: i.tagName,
														active: 1,
													},
												}}
											>
												{i.tagName}
											</Tag>
										);
									})}
								</div>
							</div>
						</div>
					))}

					{showMoreButton && (
						<ShowMoreButton
							title={t("pages.vt")}
							onClick={() => handleShowMore(null, true)}
							loading={loading}
						/>
					)}
				</div>
			)}
		</>
	);
};

export default SearchByVODTag;
