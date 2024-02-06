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
// import angela from "@assets/images/angela.jpg";
import Tag from "@components/ui/Tag";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";

interface LiveDataType {
	ID: number;
	displayName: string;
	viewCount: number;
	followers: [];
	tags: [];
}

const SearchByLive: React.FC = () => {
	const { t } = useTranslation();
	const [loading, setLoading] = useState<boolean>(false);
	const [liveData, setLiveData] = useState<LiveDataType[]>([]);
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
			setLiveData([]);
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
				ep.searchByLive,
				reqData,
				{
					signal,
				}
			);

			if (success) {
				if (data?.length > 0) {
					setLiveData((prevState) => [...prevState, ...data]);
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
			{liveData && liveData.length > 0 && (
				<div className="mt-8">
					<Heading size="sm" className="mb-6">
						{t("pages.live")}
					</Heading>

					{liveData?.map((data, index) => (
						<div
							key={index}
							className="flex flex-col sm:flex-row mb-10 sm:gap-4"
						>
							<div className="w-full sm:w-80 h-auto mb-4 sm:mb-0">
								<div className="relative border h-36 text-center bg-background-base">
									<img
										className="w-full h-full object-cover"
										// src={
										// 	"https://cdn.oneesports.gg/cdn-data/2023/11/MLBB_AvatarofTime_Angela_charactermodel-1024x576.jpg"
										// }
										src={data?.s3path}
										alt={"streaming image"}
										loading="lazy"
									/>

									<div className="absolute text-xs top-2 left-2 bg-red-500 text-white px-1 py-[2px] rounded">
										{t("pages.live")}
									</div>
									<div className="absolute text-xs bottom-2 left-2 bg-black bg-opacity-70 text-white px-1 py-[2px] rounded">
										{data?.viewCount} views
									</div>
								</div>
							</div>
							<div className="w-full sm:flex sm:flex-col">
								<Heading className="text-xl">
									{data?.displayName}
								</Heading>
								<p className="text-sm mt-1">
									{data?.followers[0]?.follower} Followers
								</p>
								<div className="mt-3 flex gap-1 flex-wrap">
									{data?.tags?.map((i, index) => {
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
							title={t("pages.live")}
							onClick={() => handleShowMore(null, true)}
							loading={loading}
						/>
					)}
				</div>
			)}
		</>
	);
};

export default SearchByLive;
