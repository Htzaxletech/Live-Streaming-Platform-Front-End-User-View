/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { lazy, useEffect, useState } from "react";
import ProfileHeading from "@components/shared/ProfileHeading";
import { makeRequest } from "@services/utils";
import Tab from "@components/ui/Tab";
import { toast } from "react-toastify";
import { endpoints } from "@services/endpoints";
import { useParams } from "react-router-dom";
import store from "store2";
import ProfileHomePage from "./Home";
import ProfileStreamInfo from "@components/shared/ProfileStreamInfo";
import Videos from "./Videos";

const About = lazy(() => import("./About"));

const ProfilePage: React.FC = () => {
	const [channelData, setChannelData] = useState<[]>([]);
	const [followStatus, setFollowStatus] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);

	const { channelId } = useParams();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		(async () => {
			try {
				const { success, message, data } = await makeRequest(
					"get",
					endpoints.profileData,
					{
						userID: channelId,
					},
					{ signal }
				);

				console.log("Profile Page Response", data);

				if (success) {
					setFollowStatus(data[0]?.follow_status);
					setChannelData(data[0]);
				} else {
					toast.error(message);
				}
			} catch (error) {
				toast.error(error);
			}
		})();

		return () => {
			abortController.abort();
		};
	}, [channelId]);

	const handleFollow = async () => {
		setLoading(true);
		const status: any = !followStatus;
		try {
			const response = await makeRequest("post", endpoints.follow, {
				userID: store.get("id"),
				channelID: channelData?.channelID,
				categoryID: channelData?.mainCategoryID,
				isfollow: status,
			});

			console.log("Live Stream Page Follow Response", response);
			setFollowStatus(status);
			setChannelData(response?.data[0]);
			setLoading(false);
		} catch (error) {
			toast.error(error);
			setLoading(false);
		}
	};

	return (
		<>
			{/* <div className="w-full h-[250px] md:h-[400px] border">
				<img
					// src="https://news.codashop.com/my/wp-content/uploads/sites/6/2023/02/MLBB-Moskov-Hero-Guide.jpg"
					src={channelData?.s3channelbanner}
					alt="moskov"
					className="w-full h-full object-cover"
					loading="lazy"
				/>

				<div className="absolute top-20 left-10">
					<ProfileStreamInfo
						isLive={false}
						message={"Check out this mobile legends: Bang Bang"}
						viewer={"52k"}
					/>
				</div>
			</div> */}

			<div className="w-full h-[250px] md:h-[400px] border relative">
				<div
					className="w-full h-full bg-cover bg-no-repeat"
					style={{
						backgroundImage: `url(${channelData?.s3channelbanner})`,
					}}
				></div>

				<div className="hidden md:inline md:absolute md:top-28 md:left-10">
					<ProfileStreamInfo
						isLive={channelData?.live_status}
						message={"Check out this mobile legends: Bang Bang"}
						viewer={channelData?.followers?.[0]?.follower}
					/>
				</div>
			</div>

			<div className="container mt-4">
				{/* <div className="h-[400px]">
				<img
					src="https://news.codashop.com/my/wp-content/uploads/sites/6/2023/02/MLBB-Moskov-Hero-Guide.jpg"
					alt="moskov"
					className="w-full h-full object-cover"
				/>
			</div> */}

				<ProfileHeading
					streamerName={channelData?.displayName}
					profileImage={channelData?.s3channelprofile}
					handleFollow={handleFollow}
					followStatus={followStatus}
					loading={loading}
					isLive={channelData?.live_status === 1 ? true : false}
					followers={channelData?.followers?.[0]?.follower}
				/>

				<Tab
					tabs={[
						{
							label: "Home",
							content: <ProfileHomePage />,
						},
						{
							label: "About",
							content: <About channelData={channelData} />,
						},
						{
							label: "Videos",
							content: <><Videos /></>,
						},
					]}
					className="mt-3"
				/>
			</div>
		</>
	);
};

export default ProfilePage;
