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
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col pt-4 overflow-hidden">
        <div
          className={`transition-all duration-300 h-screen ${
            isChatOpen ? "md:mr-80" : "mr-0"
          }`}
        >
          <div className="bg-black w-full h-2/4 lg:h-5/6 flex justify-center text-white">
            {/* <ReactPlayer
              // light={thumb}
              url={streamURL}
              width="100%"
              height="100%"
              controls={true}
              playing={true}
              // config={{
              //   file: {
              //     hlsOptions: {
              //       liveSyncDuration: 10,
              //       startLevel: "240p"
              //     },
              //   },
              // }}
            /> */}
            <MediaPlayer
              // src={"http://192.168.1.35:8888/live/0r6fyRXaj/index.m3u8"}
              src="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
              // src="https://www.youtube.com/watch?v=W_ma66AY6Ec"
              autoplay
              className="h-full rounded-none"
            >
              <MediaProvider>
              </MediaProvider>
              <DefaultAudioLayout icons={defaultLayoutIcons} />
              <DefaultVideoLayout icons={defaultLayoutIcons} />
            </MediaPlayer>
          </div>

          <h1>Testing Video</h1>
          {/* Add your main content components here */}
        </div>
      </div>

      <StreamChatBox />
    </div>
  );
};

export default LiveStreamPage;
