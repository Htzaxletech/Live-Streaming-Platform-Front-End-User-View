/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import Button from "@components/ui/Button";
import Heading from "@components/ui/Heading";
import ProfileAvatar from "@components/ui/ProfileAvatar";
import Tag from "@components/ui/Tag";
import React, { useState } from "react";
import { FaRegHeart, FaHeart, FaHeartBroken } from "react-icons/fa";
import { GoPerson } from "react-icons/go";
import Icon from "./Icon";
import { useLocation, useNavigate } from "react-router-dom";

interface ProfileHeadingProps {
	streamerName: string;
	streamTitle?: string;
	gameTags?: unknown[];
	viewers?: number;
	time?: string;
	profileImage: string;
	handleFollow: () => void;
	followStatus?: number;
	loading?: boolean;
	isLive?: boolean;
	followers?: number;
	channelID?: number;
}

const ProfileHeading: React.FC<ProfileHeadingProps> = ({
	streamerName,
	streamTitle,
	gameTags,
	viewers,
	time,
	profileImage,
	handleFollow,
	followStatus,
	loading,
	isLive,
	followers,
	channelID,
}) => {
	const [isHoveredFollow, setIsHoveredFollow] = useState(false);
	const [isHoveredUnfollow, setIsHoveredUnFollow] = useState(false);
	const navigate = useNavigate();
	const location = useLocation();

	const handleClickStreamerName = () => {
		if (!location.pathname.includes("profile")) {
			navigate(`/profile/${channelID}`);
		}
	};

	return (
		<div className="container">
			<div className="flex p-3 pt-5 space-x-4">
				<div className="flex-shrink-0 ">
					{/* for large size */}
					<div className="hidden md:flex justify-center items-center  ">
						<ProfileAvatar
							imageUrl={
								profileImage ||
								"https://th.bing.com/th/id/R.8b167af653c2399dd93b952a48740620?rik=%2fIwzk0n3LnH7dA&pid=ImgRaw&r=0"
							}
							altText="User Avatar"
							isLive={isLive}
							size={85}
						/>
					</div>
					{/*  for small size */}
					<div className="flex md:hidden justify-center items-center  ">
						<ProfileAvatar
							imageUrl={
								profileImage ||
								"https://th.bing.com/th/id/R.8b167af653c2399dd93b952a48740620?rik=%2fIwzk0n3LnH7dA&pid=ImgRaw&r=0"
							}
							altText="User Avatar"
							isLive={isLive}
							size={50}
						/>
					</div>
				</div>
				<div className="grow ps-2 md:ps-4 lg:ps-5">
					<div className="flex">
						<div className="grow">
							<Heading
								className="text-foreground mb-1 text-lg md:text-2xl cursor-pointer"
								onClick={handleClickStreamerName}
							>
								{/* <Link to="/directory">{streamerName}</Link> */}
								{streamerName}
							</Heading>
							<div className="">
								{streamTitle && (
									<p className="hidden md:flex text-foreground-secondary mb-2">
										{streamTitle}
									</p>
								)}
								{followers && (
									<p className="hidden md:flex text-foreground-secondary mb-2">
										<span className="mr-1">{followers}</span>followers
									</p>
								)}

								{gameTags && gameTags.length > 0 && (
									<div className="flex justify-start items-center">
										<div className="hidden md:flex space-x-2 ">
											{gameTags &&
												gameTags.length > 0 &&
												gameTags.map((tag, index) => (
													<Tag
														key={index}
														to={"/directory"}
														state={{
															directory: {
																...tag,
																categoryName: tag.tagName,
																active: 1,
															},
														}}
													>
														{tag?.tagName}
													</Tag>
												))}
										</div>
									</div>
								)}
							</div>
						</div>
						<div className="flex-none">
							<div className="flex flex-col justify-center items-end space-y-3">
								{!followStatus ? (
									<Button
										color="primary"
										onClick={handleFollow}
										onMouseEnter={() => setIsHoveredFollow(true)}
										onMouseLeave={() => setIsHoveredFollow(false)}
										disabled={loading}
									>
										{isHoveredFollow ? (
											<FaHeart className="me-1" />
										) : (
											<FaRegHeart className="me-1" />
										)}
										Follow
									</Button>
								) : (
									<a
										data-tooltip-id="my-tooltip"
										data-tooltip-content="Unfollow"
										className="z-50"
									>
										<Button
											onClick={handleFollow}
											onMouseEnter={() => setIsHoveredUnFollow(true)}
											onMouseLeave={() =>
												setIsHoveredUnFollow(false)
											}
											disabled={loading}
										>
											{isHoveredUnfollow ? (
												<FaHeartBroken />
											) : (
												<FaHeart />
											)}
										</Button>
									</a>
								)}

								{isLive && !location.pathname.includes("profile") && (
									<div className="hidden md:flex justify-end items-center">
										<div className="flex justify-start items-center font-bold me-3">
											<Icon
												icon={GoPerson}
												className="text-danger font-bold"
											/>
											<span className="text-danger">{viewers}</span>
										</div>
										<div className="w-20 text-center">
											<span>{time}</span>
										</div>
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileHeading;
