import Heading from "@components/ui/Heading";
import ShowMoreButton from "@components/ui/ShowMoreButton";
import { makeRequest } from "@services/utils";
import { useEffect, useState } from "react";
import { endpoints as ep } from "@services/endpoints";
import { toast } from "react-toastify";
import VideoCard from "@components/shared/VideoCard";

const VideosPage = () => {
	const [loading, setLoading] = useState<boolean>(false);
	const [videos, setVideos] = useState<[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [pageSize] = useState<number>(10);
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
			const data = {
				page: currentPage,
				pageSize,
			};

			const response = await makeRequest("get", ep.homeCategory, data, {
				signal,
			});

			if (response?.success) {
				const moreData = response?.data;

				if (moreData.length > 0) {
					setVideos((prevState) => [...prevState, ...moreData]);
				} else {
					setShowMoreButton(false);
				}

				setCurrentPage((prevPage) => prevPage + 1);
			} else {
				toast.error(response?.message);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<div className="mt-8">
			<Heading size="sm">Videos</Heading>
			{/* {videos &&
					videos.length > 0 &&
					videos?.map((data, index) => (
						<CategoryCard key={index} data={data} />
					))} */}
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-3 mt-3 mb-4">
				{Array.from({ length: 13 }).map((_, index) => (
					<VideoCard
						key={index}
						user={jsonData.user}
						isLive={jsonData.isLive}
					/>
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

export default VideosPage;
