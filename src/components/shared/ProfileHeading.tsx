import Button from "@components/ui/Button";
import Heading from "@components/ui/Heading";
import ProfileAvatar from "@components/ui/ProfileAvatar";
import Tag from "@components/ui/Tag";
import React from "react";
import { FaRegHeart } from "react-icons/fa6";
import { GoPerson } from "react-icons/go";
import Icon from "./Icon";
import { Link } from "react-router-dom";

interface ProfileHeadingProps {
	streamerName: string;
	streamTitle: string;
	gameTags: unknown[];
	viewers: number;
	time: string;
	profileImage: string;
	handleFollow: () => void;
}

const ProfileHeading: React.FC<ProfileHeadingProps> = ({
	streamerName,
	streamTitle,
	gameTags,
	viewers,
	time,
	profileImage,
	handleFollow,
}) => {
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
							isLive={true}
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
							isLive={true}
							size={50}
						/>
					</div>
				</div>
				<div className="grow ps-2 md:ps-4 lg:ps-5">
					<div className="flex">
						<div className="grow">
							<Heading className="text-foreground mb-1 md:mb-3 lg:mb-4 text-lg md:text-2xl">
								<Link to="/directory">{streamerName}</Link>
							</Heading>
							<div className="">
								<p className="hidden md:flex text-foreground-secondary mb-2">
									{streamTitle}
								</p>
								<div className="flex justify-start items-center">
									<div className="hidden md:flex space-x-2 ">
										{gameTags &&
											gameTags.length > 0 &&
											gameTags.map((tag, index) => (
												<Tag to="" key={index}>
													{tag?.tagName}
												</Tag>
											))}
									</div>
								</div>
							</div>
						</div>
						<div className="flex-none">
							<div className="flex flex-col justify-center items-end space-y-3">
								<Button color="primary" onClick={handleFollow}>
									<FaRegHeart className="me-1" />
									Follow
								</Button>
								<div className="hidden md:flex justify-end items-center">
									<div className="flex justify-start items-center font-bold me-3">
										<Icon
											icon={GoPerson}
											className="text-danger font-bold"
										/>
										<span className="text-danger">{viewers}</span>
									</div>
									<div className="">
										<span>{time}</span>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ProfileHeading;
