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

const StreamManager = () => {
	const isChatOpen = useSelector((state: RootState) => state.chat.isChatOpen);

	return (
		<div>
			<div className="flex-1 flex flex-col pt-4">
				<div className={` ${isChatOpen ? "md:mr-60 lg:mr-72" : "mr-0"}`}>
					<div className="bg-black w-full md:h-2/4 lg:h-5/6 flex justify-center text-white">
						<MediaPlayer
							src="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
							autoplay
							className="h-full rounded-none"
						>
							<MediaProvider></MediaProvider>
							<DefaultAudioLayout icons={defaultLayoutIcons} />
							<DefaultVideoLayout icons={defaultLayoutIcons} />
						</MediaPlayer>
					</div>

					
				</div>
			</div>
			<StreamChatBox />
		</div>
	);
};

export default StreamManager;
