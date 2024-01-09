import React from "react";
import jsonData from "./test.json";
import VideoCard from "@components/shared/VideoCard";
import Heading from "@components/ui/Heading";
import ShowMoreButton from "@components/ui/ShowMoreButton";

const LivePage: React.FC = () => {
	return (
		<div className="mt-8">
			<Heading size="sm">Live Channels</Heading>
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-3 mt-3 mb-4">
				{Array.from({ length: 13 }).map((_, index) => (
					<VideoCard
						key={index}
						user={jsonData.user}
						isLive={jsonData.isLive}
					/>
				))}
			</div>
			<ShowMoreButton title={""} />
		</div>
	);
};

export default LivePage;
