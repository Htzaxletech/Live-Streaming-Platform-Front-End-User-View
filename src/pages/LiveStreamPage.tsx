import StreamChatBox from "@components/shared/StreamChatBox";
import { useSelector } from "react-redux";
import { RootState } from "store";
// import ReactPlayer from "react-player";
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
	const isChatOpen = useSelector((state: RootState) => state.chat.isChatOpen);
	const { state } = useLocation();
	const [channelData, setChannelData] = useState([]);

	useEffect(() => {
		(async () => {
			if (!state?.liveStreamData) {
				// navigate("/");
			} else {
				try {
					const response = await makeRequest(
						"get",
						endpoints.channelData,
						{
							channelID: state?.liveStreamData.channelID,
						}
					);

					console.log("Live Stream Page Response", response);

					setChannelData(response?.data[0]);
				} catch (error) {
					toast.error(error);
				}
			}
		})();
	}, [state?.liveStreamData.channelID]);

	const handleFollow = async () => {
		try {
			const response = await makeRequest("post", endpoints.follow, {
				userID: store.get("id"),
				channelID: channelData?.channelID,
				categoryID: channelData?.mainCategoryID,
				isfollow: 0,
			});

			console.log("Live Stream Page Follow Response", response);

			setChannelData(response?.data[0]);
		} catch (error) {
			toast.error(error);
		}
	}

	return (
		<div>
			<div className="flex-1 flex flex-col pt-4">
				<div className={`${isChatOpen ? "md:mr-60 lg:mr-72" : "mr-0"}`}>
					<div className="h-50 xl:h-[550px] flex justify-center">
						<MediaPlayer
							src={generateStreamUrl(channelData?.streamKey)}
							// src={"http://192.168.1.31:8888/live/0r6fyRXaj/index.m3u8"}
							autoplay
							className="rounded-none"
						>
							<MediaProvider></MediaProvider>
							<DefaultAudioLayout icons={defaultLayoutIcons} />
							<DefaultVideoLayout icons={defaultLayoutIcons} />
						</MediaPlayer>
					</div>

					<ProfileHeading
						streamerName={channelData?.displayName}
						streamTitle={channelData?.title}
						gameTags={channelData?.tags}
						viewers={channelData?.viewCount}
						time={"20:00:11"}
						profileImage={channelData?.profileImage}
						handleFollow={handleFollow}
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
			<StreamChatBox liveID={channelData?.liveID} streamKey={channelData?.streamKey} />
		</div>
	);
};

export default LiveStreamPage;
