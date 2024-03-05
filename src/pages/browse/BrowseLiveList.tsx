/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import LiveSkeleton from "@components/shared/LiveSkeleton";
import VideoCard from "@components/shared/VideoCard";
import Heading from "@components/ui/Heading";
import ShowMoreButton from "@components/ui/ShowMoreButton";
import { endpoints } from "@services/endpoints";
import { makeRequest } from "@services/utils";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
// import { useLocation, useParams } from "react-router-dom";
// import { toast } from "react-toastify";

interface LiveProps {
	keyword?: string;
}

const BrowseLiveList: React.FC<LiveProps> = ({ keyword }) => {
	interface LiveDataType {}

	// const { dirCategoryName } = useParams();
	// const { state } = useLocation();
	const { t } = useTranslation();
	const [loading, setLoading] = useState<boolean>(false);
	const [liveData, setLiveData] = useState<LiveDataType[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [pageSize, setPageSize] = useState<number>(10);
	const [showMoreButton, setShowMoreButton] = useState(true);

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
	}, [keyword]);

	const handleShowMore = async (signal: unknown, isClick: boolean) => {
		setLoading(true);
		const page = isClick ? currentPage + 1 : 0;

		try {
			const reqData = { filter: keyword, page, pageSize };

			const { success, message, data } = await makeRequest(
				"get",
				endpoints.browseLive,
				reqData,
				{
					signal,
				}
			);

			console.log("Browser Live", data);

			if (success) {
				if (data?.length > 0) {
					setLiveData((prevState) => [...prevState, ...data]);
				} else {
					setShowMoreButton(false);
				}

				if (isClick) setCurrentPage((prevPage) => prevPage + 1);
			} else {
				// toast.error(message);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
			setShowMoreButton(false);
		}
	};

	return (
		<div className="mt-8">
			<Heading size="sm" className="my-2 text-gray-900 dark:text-gray-100">
				{t("pages.live")}
			</Heading>

			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-3 mt-3 mb-4">
				{liveData.length > 0 &&
					liveData?.map((data, index) => (
						<VideoCard key={index} data={data} />
					))}

				{loading && <LiveSkeleton />}
			</div>

			{showMoreButton && (
				<ShowMoreButton
					title={""}
					onClick={() => handleShowMore(null, true)}
					loading={loading}
				/>
			)}
		</div>
	);
};

export default BrowseLiveList;
