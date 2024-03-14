/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import React, { useEffect, useState } from "react";
import VideoCard from "@components/shared/VideoCard";
import Heading from "@components/ui/Heading";
import { makeMultipleRequests } from "@services/utils";
import { toast } from "react-toastify";
import { endpoints } from "@services/endpoints";
import store from "store2";
import CategoryCard from "@components/shared/CategoryCard";
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import CategorySkeleton from "@components/shared/CategorySkeleton";
import LiveSkeleton from "@components/shared/LiveSkeleton";

interface VideoDataType {}
interface CategoryDataType {}

const HomePage: React.FC = () => {
	const { t } = useTranslation();
	const [videoData, setVideoData] = useState<VideoDataType[]>([]);
	const [categoryData, setCategoryData] = useState<CategoryDataType[]>([]);
	const [loading, setLoading] = useState<boolean>(true);
	const { channelId } = useParams();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		(async () => {
			try {
				const requests = [
					{
						method: "get",
						url: endpoints.profileRecentVOD,
						data: {
							userID: channelId,
							page: 0,
							pageSize: 5,
						},
						config: { signal },
					},
					{
						method: "get",
						url: endpoints.profileRecentCategory,
						data: {
							userID: channelId,
							page: 0,
							pageSize: 5,
						},
						config: { signal },
					},
				];

				const responses = await makeMultipleRequests(requests);

				if (responses !== null) {
					const recentVOD = responses?.[0];
					const recentCategory = responses?.[1];

					if (recentVOD?.success) {
						setVideoData(recentVOD?.data);
					}
					if (recentCategory?.success) {
						setCategoryData(recentCategory?.data);
					}
				}
				setLoading(false);

			} catch (error) {
				toast.error(error);
				setLoading(false);
			}
		})();

		return () => {
			setVideoData([]);
			setCategoryData([]);
			abortController.abort();
		};
	}, [channelId]);

	return (
		<>
			<div className="mt-8">
				<Heading size="sm">{t("pages.rb")}</Heading>
				<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-3 mt-3 mb-4">
					{videoData.length > 0 &&
						videoData?.map((data, index) => (
							<VideoCard key={index} data={data} />
						))}

					{loading && <LiveSkeleton />}
				</div>
			</div>

			<div className="mt-8">
				<Heading size="sm">{t("pages.rc")}</Heading>
				<div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 xl:grid-cols-8 2xl:grid-cols-8 gap-2 mt-3 mb-8">
					{categoryData.length > 0 &&
						categoryData?.map((data, index) => (
							<CategoryCard key={index} data={data} />
						))}

					{loading && <CategorySkeleton />}
				</div>
			</div>
		</>
	);
};

export default HomePage;
