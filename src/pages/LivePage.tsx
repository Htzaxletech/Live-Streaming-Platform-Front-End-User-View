import React from "react";
import jsonData from "./test.json";
import VideoCard from "@components/shared/VideoCard";

const LivePage: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-3">
      {Array.from({ length: 13 }).map((_, index) => (
        <VideoCard
          key={index}
          index={index}
          user={jsonData.user}
          isLive={jsonData.isLive}
        />
      ))}
    </div>
  );
};

export default LivePage;
