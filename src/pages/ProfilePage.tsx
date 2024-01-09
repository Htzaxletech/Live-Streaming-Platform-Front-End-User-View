import React from "react";
// import jsonData from "./test.json";
// import VideoCard from "@components/shared/VideoCard";
// import Heading from "@components/ui/Heading";
// import ShowMoreButton from "@components/ui/ShowMoreButton";
import ProfileHeading from "@components/shared/ProfileHeading";

const ProfilePage: React.FC = () => {
	return (
		<div className="mt-4">
			{/* <div className="h-[400px]">
				<img
					src="https://news.codashop.com/my/wp-content/uploads/sites/6/2023/02/MLBB-Moskov-Hero-Guide.jpg"
					alt="moskov"
					className="w-full h-full object-cover"
				/>
			</div> */}
			<div className="w-full h-auto md:h-[400px] border">
				<img
					src="https://news.codashop.com/my/wp-content/uploads/sites/6/2023/02/MLBB-Moskov-Hero-Guide.jpg"
					alt="moskov"
					className="w-full h-full object-contain"
				/>
			</div>
			<ProfileHeading
				streamerName={"Bunny"}
				streamTitle={"stream testing"}
				gameName={"Mobile Legends"}
				gameTags={[]}
				viewers={12}
				time={""}
			/>

			{/* <Heading size="sm">Live Channels</Heading>
			<div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-5 gap-3 mt-3 mb-4">
				{Array.from({ length: 13 }).map((_, index) => (
					<VideoCard
						key={index}
						user={jsonData.user}
						isLive={jsonData.isLive}
					/>
				))}
			</div>
			<ShowMoreButton title={""} /> */}
		</div>
	);
};

export default ProfilePage;
