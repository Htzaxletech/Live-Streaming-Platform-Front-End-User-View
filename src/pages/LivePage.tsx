import React, { useEffect, useState } from "react";
import jsonData from "./test.json";
import VideoCard from "@components/shared/VideoCard";
import Heading from "@components/ui/Heading";
import ShowMoreButton from "@components/ui/ShowMoreButton";
import { makeRequest } from "@services/utils";
import { endpoints as ep } from "@services/endpoints";
import { toast } from "react-toastify";

const LivePage: React.FC = () => {

	const [loading, setLoading] = useState<boolean>(false);
	const [videoData, setVideoData] = useState<[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [pageSize] = useState<number>(1);
	const [showMoreButton, setShowMoreButton] = useState(true);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		(async () => {
			handleShowMore(signal);
		})();

		return () => {
			abortController.abort();
		};
	}, []);

	const handleShowMore = async (signal: unknown) => {
		setLoading(true);

		try {
			const reqData = {
				page: currentPage,
				pageSize,
			};

			const { success, message, data } = await makeRequest(
				"get",
				ep.homeLive,
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

				setCurrentPage((prevPage) => prevPage + 1);
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
		<div className="mt-8">
			<Heading size="sm">Live Channels</Heading>
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-3 mt-3 mb-4">
				{videoData &&
					videoData.length > 0 &&
					videoData?.map((data, index) => (
						<VideoCard key={index} data={data} />
					))}
			</div>

			{showMoreButton && (
				<ShowMoreButton
					title={""}
					onClick={() => handleShowMore(null)}
					loading={loading}
				/>
			)}
		</div>
	);
};

export default LivePage;
