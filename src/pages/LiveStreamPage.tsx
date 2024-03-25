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

					setFollowStatus(response?.data[0]?.follow_status);
					setStartTime(response?.data[0]?.live_start);
					setChannelData(response?.data[0]);

					const data = response?.data[0];

					const socialResponse = await makeRequest(
						"get",
						endpoints.getSocial,
						{
							channelID: state?.liveStreamData?.channelID,
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
		const interval = setInterval(fetchViewerCount, 10000);
		const interval2 = setInterval(fetchLiveData, 10000);

		return () => {
			clearInterval(interval);
			clearInterval(interval2);
		};
	}, [state?.liveStreamData?.channelID]);

	const fetchViewerCount = async () => {
		if (state?.liveStreamData?.channelID) {
			try {
				const reqData = {
					channelID: state?.liveStreamData?.channelID,
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
		}
	};

	const fetchLiveData = async () => {
		if (state?.liveStreamData?.channelID) {
			try {
				const response = await makeRequest("get", endpoints.channelData, {
					channelID: state?.liveStreamData?.channelID,
					userID: store.get("id"),
				});

				setFollowStatus(response?.data[0]?.follow_status);
				setStartTime(response?.data[0]?.live_start);
				setChannelData(response?.data[0]);
			} catch (error) {
				toast.error(error);
			}
		}
	};

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

			setFollowStatus(status);
			setChannelData(response?.data[0]);
			setLoading(false);

			handleFollowSocket();
		} catch (error) {
			toast.error(error);
			setLoading(false);
		}
	};

	const handleFollowSocket = () => {
		const reqData = {
			streamKey: channelData?.streamKey,
			item_variantID: "75",
			bits: "",
			variantID: 1,
		};

		socket.emit("follow", reqData);
	};

	return (
		<div>
			<div className="flex-1 flex flex-col pt-4">
				<div className={`${isChatOpen ? "md:mr-72 lg:mr-80" : "mr-0"}`}>
					<div className="flex justify-center">
						{channelData?.live_status && channelData?.streamKey ? (
							<div className="w-full bg-black flex justify-center items-center">
								<div>
									<MediaPlayer
										src={generateStreamUrl(channelData?.streamKey)}
										autoplay
										muted
										className="h-44 lg:h-52 xl:h-[550px] border-none"
										onHlsError={() => {
											setChannelData({});
										}}
									>
										<MediaProvider></MediaProvider>
										<DefaultAudioLayout icons={defaultLayoutIcons} />
										<DefaultVideoLayout icons={defaultLayoutIcons} />
									</MediaPlayer>
								</div>
							</div>
						) : (
							<div className="flex w-full h-52 md:h-96 xl:h-[550px]">
								<Offline />
							</div>
						)}
					</div>

					<ProfileHeading
						channelID={channelData?.userID}
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
