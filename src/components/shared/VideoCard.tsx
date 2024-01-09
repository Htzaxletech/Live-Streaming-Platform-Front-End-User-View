// VideoCard.tsx
import game from "../../pages/game-pubg.jpg";
import Tag from "@components/ui/Tag";
import { tv } from "tailwind-variants";

interface User {
	title: string;
}

const VideoCard = ({ user, isLive }: { user: User; isLive: boolean }) => {
	const card = tv({
		slots: {
			cardContainer: "mx-auto duration-300 bg-primary cursor-pointer",
			live: "absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded",
			view: "absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded",
			imageCover: "w-full h-50",
			videoLength:
				"absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded",
			lastUploaded:
				"absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded",
			cardContent: "p-4",
			flexContainer: "flex items-center gap-3",
			profileImage: "w-12 h-12",
			titleContainer: "col-span-1",
			title: "font-semibold",
			username: "text-soft",
			categoryName: "text-soft",
			tagsContainer:
				"flex flex-wrap gap-2 items-center mt-5 h-6 overflow-hidden",
			channelAvator: "w-full h-full rounded-full md:w-30 md:h-30",
			liveScreenCard:
				"relative hover:translate-x-1 hover:-translate-y-1 transition-all duration-200 w-full h-50",
		},
	});

	const {
		cardContainer,
		live,
		view,
		imageCover,
		videoLength,
		lastUploaded,
		cardContent,
		flexContainer,
		profileImage,
		titleContainer,
		title,
		username,
		categoryName,
		tagsContainer,
		channelAvator,
		liveScreenCard,
	} = card();

	return (
		<div>
			<div className={cardContainer()}>
				<div className={liveScreenCard()}>
					<img className={imageCover()} src={game} alt={user.title} />

					{isLive && (
						<>
							<div className={live()}>Live</div>
							<div className={view()}>{200} views</div>
						</>
					)}
					{!isLive && (
						<>
							<div className={videoLength()}>7:03:46</div>
							<div className={lastUploaded()}>{1} day ago</div>
						</>
					)}
				</div>
			</div>

			<div className={cardContent()}>
				<div className={flexContainer()}>
					<div className={profileImage()}>
						<img
							// src={`https://random.imagecdn.app/500/${index}`}
							src={game}
							alt="channel-profile"
							className={channelAvator()}
						/>
					</div>
					<div className={titleContainer()}>
						<div className={title()}>{"title"}</div>
						<div className={username()}>{"channelName"}</div>
						<div className={categoryName()}>{"categoryName"}</div>
					</div>
				</div>
				{isLive && (
					<div className={tagsContainer()}>
						<Tag to={""}>International</Tag>
						<Tag to={""}>International Language</Tag>
						<Tag to={""}>Esports Global</Tag>
						<Tag to={""}>Mingalardon</Tag>
						<Tag className="" to={""}>
							Mandalay
						</Tag>
					</div>
				)}
			</div>
		</div>
	);
};

export default VideoCard;
