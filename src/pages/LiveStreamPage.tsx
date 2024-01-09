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

const LiveStreamPage = () => {
  const isChatOpen = useSelector((state: RootState) => state.chat.isChatOpen);

  // const streamURL =
    // "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4";
    // "https://www.youtube.com/watch?v=pXpckHDDNYo";
    // "https://www.twitch.tv/esl_dota2";
    // "https://www.twitch.tv/grt_pipegsw";
    // const thumb =
    //   "http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/images/VolkswagenGTIReview.jpg";

  // const qualityOptions = ['auto', '240p', '360p', '480p', '720p', '1080p'];

  return (
		<div>
			<div className="flex-1 flex flex-col pt-4">
				<div className={` ${isChatOpen ? "md:mr-60 lg:mr-72" : "mr-0"}`}>
					<div className="h-50 xl:h-[550px] flex justify-center">
						<MediaPlayer
							// src={"http://192.168.1.35:8888/live/0r6fyRXaj/index.m3u8"}
							src="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
							// src="https://www.youtube.com/watch?v=W_ma66AY6Ec"
							autoplay
							className="rounded-none"
						>
							<MediaProvider></MediaProvider>
							<DefaultAudioLayout icons={defaultLayoutIcons} />
							<DefaultVideoLayout icons={defaultLayoutIcons} />
						</MediaPlayer>
					</div>

					<ProfileHeading
						streamerName="GeminiTay"
						streamTitle="Stardew Sunday! We are back in spring year 2 :)"
						gameName="Stardew Valley"
						gameTags={["funny", "kid", "English"]}
						viewers={10}
						time={"20:00:11"}
					/>
					<ProfileDescription
						streamerName="GeminiTay"
						followerCount={"211K"}
						description={
							"Canadian gaming Youtuber and Twitch Streamer. I play Minecraft with a focus on building and creating art in the game."
						}
						socialLinks={{
							facebook: "www.facebook.com/username",
							instagram: "www.instagram.com/username",
							youtube: "www.youtube.com/username",
						}}
					/>
				</div>
			</div>
			<StreamChatBox />
		</div>
  );
};

export default LiveStreamPage;
