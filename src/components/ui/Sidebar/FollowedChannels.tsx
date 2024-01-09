/* eslint-disable no-empty-pattern */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from "react";
import { FaRegHeart } from "react-icons/fa";
import { CollapsedSidebarItem } from "../CollapsedSidebarItem";
import { SidebarItem } from "../Sidebaritem";
import { tv } from "tailwind-variants";
import { LuArrowUpDown } from "react-icons/lu";
import johndoe from "../../../../src/assets/images/johndoe.jpg";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";

interface FollowedChannelsProps {
	// userDataList: UserData[];
}

const userDataList = [
	{
		profilePicture: johndoe,
		name: "John Doe",
		category: "Gaming",
		viewers: 1.2,
	},
	{
		profilePicture: johndoe,
		name: "Jane Doe",
		category: "Just Chatting",
		viewers: 1.7,
	},

	{
		profilePicture: johndoe,
		name: "Jack",
		category: "Games",
		viewers: null,
	},
	// Add more user data as needed
];

const FollowedChannels: React.FC<FollowedChannelsProps> = ({}) => {
	useEffect(() => {
		console.log("mount follow");

		return () => {
			console.log("unmount follow");
		};
	}, []);

	const collapsed = useSelector(
		(state: RootState) => state.sidebar.isSidebarCollapsed
	);

	const contentContainer = tv({
		base: ["mt-[100px]"],
		variants: {
			collapsed: {
				true: [""],
				false: [""],
			},
		},

		defaultVariants: {},
	});

	return (
		<div>
			<div className="flex">
				{!collapsed && (
					<div className="text-foreground/50 flex-nowrap text-md tracking-wide font-semibold absolute left-3 top-16 mx-auto">
						Followed Channels
					</div>
				)}

				{collapsed ? (
					<FaRegHeart size={18} className="absolute right-5 top-16" />
				) : (
					<LuArrowUpDown
						size={18}
						className="absolute right-3 top-16 text-foreground/50 font-bold"
					/>
				)}
			</div>

			<div className={contentContainer()}>
				<div className="mx-auto">
					{userDataList.map((userData) => (
						<div key={userData.name}>
							{collapsed ? (
								<div key={userData.name}>
									{/* Assuming you have a CollapsedSidebarItem component */}
									<CollapsedSidebarItem
										profilePicture={userData.profilePicture}
										name=""
										category=""
										viewers={null}
									/>
								</div>
							) : (
								<div
									className="w-full h-full hover:bg-foreground/10"
									key={userData.name}
								>
									{/* Assuming you have a SidebarItem component */}
									<SidebarItem
										profilePicture={userData.profilePicture}
										name={userData.name}
										category={userData.category}
										viewers={userData.viewers}
									/>
								</div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default FollowedChannels;
