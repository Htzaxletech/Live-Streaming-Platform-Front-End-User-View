/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import React from "react";
import game from "../../pages/game-pubg.jpg";
import Tag from "@components/ui/Tag";
import { convertToLowerCase } from "@utils/helpers";
import { useNavigate } from "react-router-dom";
import { tv } from "tailwind-variants";
import { useTranslation } from "react-i18next";

interface DataProps {
	ID: number;
	mainCategoryID: number;
	categoryName?: string;
	image: string;
	secondCat?: [];
}

interface VideoCardProps {
	data?: DataProps;
}

const VideoCard: React.FC<VideoCardProps> = ({ data }) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const card = tv({
		slots: {
			cardContainer: "mx-auto duration-300 bg-primary cursor-pointer",
			live: "absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded",
			view: "absolute bottom-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded",
			imageCover: "w-full h-32",
			videoLength:
				"absolute top-2 left-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded",
			lastUploaded:
				"absolute bottom-2 right-2 bg-black bg-opacity-70 text-white px-2 py-1 rounded",
			cardContent: "p-4",
			flexContainer: "flex items-center gap-3",
			profileImage: "w-12 h-12 text-center",
			titleContainer: "col-span-1",
			title: "font-semibold",
			username: "text-soft",
			categoryName: "text-soft",
			tagsContainer:
				"flex flex-wrap gap-2 items-center mt-5 h-6 overflow-hidden",
			channelAvator: "w-full h-full rounded-full md:w-30 md:h-30",
			liveScreenCard:
				"relative hover:translate-x-1 hover:-translate-y-1 transition-all duration-200 w-full h-32 text-center",
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

	const handleOnClick = () => {
		console.log("data", data);
		navigate(`/${convertToLowerCase(data?.channelName)}`, {
			state: {
				liveStreamData: data,
			},
		});
	};

	// const handleLink = (param: unknown) => {
	// 	// dispatch(setCategoryData(param));
	// 	navigate(`/directory/category/${param?.categoryName}`);
	// };

	return (
		<div>
			<div className={cardContainer()} onClick={handleOnClick}>
				<div className={liveScreenCard()}>
					<img
						className={imageCover()}
						src={data?.s3path || game}
						alt={"Live thumbnail"}
						loading="lazy"
					/>

					{data?.live_status === 1 && (
						<>
							<div className={live()}>{t("pages.live")}</div>
							<div className={view()}>{data?.viewCount} views</div>
						</>
					)}
					{data?.live_status === 0 && (
						<>
							<div className={videoLength()}>
								{data?.duration || "00:00:00"}
							</div>
							{/* <div className={lastUploaded()}>{1} day ago</div> */}
						</>
					)}
				</div>
			</div>

			<div className={cardContent()}>
				<div className={flexContainer()}>
					<div className={profileImage()}>
						<img
							// src={`https://random.imagecdn.app/500/${index}`}
							src={data?.s3channel || game}
							alt="channel-profile"
							className={channelAvator()}
							loading="lazy"
						/>
					</div>
					<div className={titleContainer()}>
						<div className={title()}>{data?.title}</div>
						<div className={username()}>{data?.channelName}</div>
						<div className={categoryName()}>{data?.categoryName}</div>
					</div>
				</div>
				{data?.live_status === 1 && (
					<div className={tagsContainer()}>
						{data?.tags?.length > 0 &&
							data?.tags?.map((i, index) => (
								<Tag
									key={index}
									to={"/directory"}
									state={{
										directory: {
											...i,
											categoryName: i.tagName,
											active: 1,
										},
									}}
								>
									{i.tagName}
								</Tag>
							))}
					</div>
				)}
			</div>
		</div>
	);
};

export default VideoCard;
