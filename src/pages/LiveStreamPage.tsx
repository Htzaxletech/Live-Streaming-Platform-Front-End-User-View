/* eslint-disable @typescript-eslint/no-explicit-any */
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

const LiveStreamPage = () => {
	const navigate = useNavigate();
	const { state } = useLocation();
	const isChatOpen = useSelector((state: RootState) => state.chat.isChatOpen);
	const [channelData, setChannelData] = useState<[]>([]);
	const [followStatus, setFollowStatus] = useState<number>(0);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
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
						}
					);

					console.log("Live Stream Page Response", response);
					setFollowStatus(response?.data[0]?.follow_status);
					setChannelData(response?.data[0]);
				} catch (error) {
					toast.error(error);
				}
			}
		})();
	}, [state?.liveStreamData?.channelID]);

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

	console.log("channelData?.streamKey", channelData?.streamKey);
	console.log("state?.liveStreamData", state?.liveStreamData);

	return (
		<div>
			<div className="flex-1 flex flex-col pt-4">
				<div className={`${isChatOpen ? "md:mr-60 lg:mr-72" : "mr-0"}`}>
					<div className="h-50 xl:h-[550px] flex justify-center">
						{channelData?.streamKey && (
							<MediaPlayer
								src={generateStreamUrl(channelData?.streamKey)}
								autoplay
								className="rounded-none"
							>
								<MediaProvider></MediaProvider>
								<DefaultAudioLayout icons={defaultLayoutIcons} />
								<DefaultVideoLayout icons={defaultLayoutIcons} />
							</MediaPlayer>
						)}
					</div>

					<ProfileHeading
						channelID={channelData?.channelID}
						streamerName={channelData?.displayName}
						streamTitle={channelData?.title}
						gameTags={channelData?.tags}
						viewers={channelData?.viewCount}
						time={"20:00:11"}
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
						socialLinks={{
							facebook: "www.facebook.com/username",
							instagram: "www.instagram.com/username",
							youtube: "www.youtube.com/username",
						}}
					/>
				</div>
			</div>

			<StreamChatBox
				streamKey={channelData?.streamKey}
				liveStatus={channelData?.live_status}
			/>
		</div>
	);
};

export default LiveStreamPage;
