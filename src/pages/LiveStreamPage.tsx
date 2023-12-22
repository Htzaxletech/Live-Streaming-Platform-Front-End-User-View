import FollowingPage from "./FollowingPage";
import StreamChatBox from "@components/shared/StreamChatBox";
import { useSelector } from "react-redux";
import { RootState } from "store";

const LiveStreamPage = () => {
  const isChatOpen = useSelector((state: RootState) => state.chat.isChatOpen);

  return (
    <div className="flex min-h-screen">
      {/* Main Content */}
      <div className="flex-1 flex flex-col pt-4 overflow-hidden">
        <div
          className={`w-full transition-all duration-300 ${
            isChatOpen ? "md:w-4/6 lg:w-4/5" : "w-full"
          }`}
        >
          <FollowingPage />
          {/* Add your main content components here */}
        </div>
      </div>

      <StreamChatBox />
    </div>
  );
};

export default LiveStreamPage;
