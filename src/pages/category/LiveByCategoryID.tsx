/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import React, { useEffect, useState } from "react";
import VideoCard from "@components/shared/VideoCard";
import Heading from "@components/ui/Heading";
import { makeRequest } from "@services/utils";
import { toast } from "react-toastify";
import { endpoints } from "@services/endpoints";
import store from "store2";
import ShowMoreButton from "@components/ui/ShowMoreButton";
import { useParams } from "react-router-dom";

interface VideoDataType {}

const LiveByCategoryID: React.FC = () => {
	const [videoData, setVideoData] = useState<VideoDataType[]>([]);
	const [loading, setLoading] = useState<boolean>(false);
	const [currentPage, setCurrentPage] = useState<number>(0);
	const [pageSize, setPageSize] = useState<number>(10);
	const [showMoreButton, setShowMoreButton] = useState<boolean>(true);
	const { categoryID } = useParams();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		(async () => {
			handleShowMore(signal, false);
		})();

		return () => {
			setVideoData([]);
			setPageSize(10);
			setCurrentPage(0);
			abortController.abort();
		};
	}, []);

	const handleShowMore = async (signal: unknown, isClick: boolean) => {
		setLoading(true);

		const page = isClick ? currentPage + 1 : 0;

		try {
			const reqData = { catID: categoryID, page, pageSize };

			const { success, message, data } = await makeRequest(
				"get",
				endpoints.browseLiveByCategoryID,
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
					<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-3 mt-3 mb-4">
						{videoData?.map((data, index) => (
							<VideoCard key={index} data={data} />
						))}
					</div>
				</div>
			)}

			{showMoreButton && (
				<ShowMoreButton
					title={""}
					onClick={() => handleShowMore(null, true)}
					loading={loading}
				/>
			)}
		</>
	);
};

export default LiveByCategoryID;
