import React, { useEffect, useState } from "react";
import VideoCard from "@components/shared/VideoCard";
import Heading from "@components/ui/Heading";
import ShowMoreButton from "@components/ui/ShowMoreButton";
import { makeRequest } from "@services/utils";
import { toast } from "react-toastify";

interface LivePageProps {
	url: string;
	userID?: string | number
	title?: string
}

interface VideoDataType {
	id: number;
	url: string;
}

const LivePage: React.FC<LivePageProps> = ({ url, userID, title }) => {
	const [loading, setLoading] = useState<boolean>(false);
	const [videoData, setVideoData] = useState<VideoDataType[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [pageSize, setPageSize] = useState<number>(10);
	const [showMoreButton, setShowMoreButton] = useState<boolean>(true);

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
	}, [url]);

	const handleShowMore = async (signal: unknown, isClick: boolean) => {
		setLoading(true);

		const page = isClick ? currentPage + 1 : 0;

		try {
			const reqData = userID
				? { userID, page, pageSize }
				: { page, pageSize };

			const { success, message, data } = await makeRequest(
				"get",
				url,
				reqData,
				{
					signal,
				}
			);

			if (success) {
				const moreData = data;
				console.log("Live Page response", data);

				if (moreData.length > 0) {
					setVideoData((prevState) => [...prevState, ...moreData]);
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
					{title && <Heading size="sm">{title}</Heading>}
					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-3 mt-3 mb-4">
						{videoData?.map((data, index) => (
							<VideoCard key={index} data={data} />
						))}
					</div>

					{showMoreButton && (
						<ShowMoreButton
							title={""}
							onClick={() => handleShowMore(null, true)}
							loading={loading}
						/>
					)}
				</div>
			)}
		</>
	);
};

export default LivePage;
