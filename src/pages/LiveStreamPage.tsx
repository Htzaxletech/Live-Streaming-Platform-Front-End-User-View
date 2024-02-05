/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import StreamChatBox from "@components/shared/StreamChatBox";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
	DefaultAudioLayout,
	defaultLayoutIcons,
	DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import ProfileDescription from "@components/shared/ProfileDescription";
import ProfileHeading from "@components/shared/ProfileHeading";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { makeRequest } from "@services/utils";
import { endpoints } from "@services/endpoints";
import { toast } from "react-toastify";
import { generateStreamUrl } from "@utils/helpers";
import store from "store2";
import useStreamingDuration from "@hooks/useStreamingDuration";
import Offline from "@components/shared/Offline";
import { socket } from "@socket/index";

const LiveStreamPage = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const isChatOpen = useSelector((state: RootState) => state.chat.isChatOpen);
	const [channelData, setChannelData] = useState<[]>([]);
	const [socialData, setSocialData] = useState<[]>([]);
	const [followStatus, setFollowStatus] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);
	const [viewCount, setViewCount] = useState<number>(0);
	const [startTime, setStartTime] = useState<any>("");
	// const startTime = "2024-01-29T16:00:00";
	const duration = useStreamingDuration(startTime);

	useEffect(() => {
		// socket.on("added_live_emitter", (value) => {
		// 	console.log("live_emitter", value);
		// });

		const abortController = new AbortController();
		const signal = abortController.signal;

		(async () => {
			if (!state?.liveStreamData) {
				navigate("/");
			} else {
				try {
					const response = await makeRequest(
						"get",
						endpoints.channelData,
						{
							channelID: state?.liveStreamData?.channelID,
							userID: store.get("id"),
						},
						{ signal }
					);

					console.log("Live Stream Page Response", response);
					setFollowStatus(response?.data[0]?.follow_status);
					setStartTime(response?.data[0]?.live_start);
					setChannelData(response?.data[0]);

					const socialResponse = await makeRequest(
						"get",
						endpoints.getSocial,
						{
							channelID: state?.liveStreamData?.channelID
						},
						{ signal }
					);

					setSocialData(socialResponse?.data);
				} catch (error) {
					toast.error(error);
				}
			}
		})();

		return () => {
			abortController.abort();
		};
	}, [state?.liveStreamData?.channelID]);

	useEffect(() => {
		if (channelData.channelID) {
			fetchViewerCount();
			fetchLiveData();
		}

		const interval = setInterval(fetchViewerCount, 10000);
		const interval2 = setInterval(fetchLiveData, 10000);

		return () => {
			clearInterval(interval);
			clearInterval(interval2);
		};
	}, [channelData.channelID]);

	const fetchViewerCount = async () => {
		try {
			const reqData = {
				channelID: channelData?.channelID,
			};

			const response = await makeRequest(
				"get",
				endpoints.getViewCount,
				reqData
			);

			if (response?.success) {
				const data = response?.data;
				setViewCount(data);
			} else {
				toast.error(response?.message);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const fetchLiveData = async () => {
		try {
			const response = await makeRequest("get", endpoints.channelData, {
				channelID: channelData?.channelID,
				userID: store.get("id"),
			});

			setFollowStatus(response?.data[0]?.follow_status);
			setStartTime(response?.data[0]?.live_start);
			setChannelData(response?.data[0]);
		} catch (error) {
			toast.error(error);
		}
	}

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
		<div>
			<div className="flex-1 flex flex-col pt-4">
				<div className={`${isChatOpen ? "md:mr-60 lg:mr-72" : "mr-0"}`}>
					<div className="h-50 xl:h-[550px] flex justify-center">
						{channelData?.live_status && channelData?.streamKey ? (
							<MediaPlayer
								src={generateStreamUrl(channelData?.streamKey)}
								autoplay
								className="rounded-none"
							>
								<MediaProvider></MediaProvider>
								<DefaultAudioLayout icons={defaultLayoutIcons} />
								<DefaultVideoLayout icons={defaultLayoutIcons} />
							</MediaPlayer>
						) : (
							<Offline />
						)}
					</div>

					<ProfileHeading
						channelID={channelData?.channelID}
						streamerName={channelData?.displayName}
						streamTitle={channelData?.title}
						gameTags={channelData?.tags}
						viewers={viewCount}
						time={duration}
						profileImage={channelData?.s3path}
						handleFollow={handleFollow}
						followStatus={followStatus}
						loading={loading}
						isLive={channelData?.live_status === 1 ? true : false}
					/>

					<ProfileDescription
						streamerName={channelData?.displayName}
						followerCount={channelData?.followers?.[0].follower}
						description={channelData?.description}
						// socialLinks={{
						// 	facebook: "www.facebook.com/username",
						// 	instagram: "www.instagram.com/username",
						// 	youtube: "www.youtube.com/username",
						// }}
						socialLinks={socialData}
					/>
				</div>
			</div>

			<StreamChatBox
				streamKey={channelData?.streamKey}
				liveStatus={channelData?.live_status}
				channelID={channelData?.channelID}
				setViewCount={setViewCount}
			/>
		</div>
	);
};

export default LiveStreamPage;
