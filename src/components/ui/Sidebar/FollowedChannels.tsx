/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import React, { useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import { CollapsedSidebarItem } from "../CollapsedSidebarItem";
import { SidebarItem } from "../Sidebaritem";
import { tv } from "tailwind-variants";
import { LuArrowUpDown } from "react-icons/lu";
import johndoe from "../../../../src/assets/images/johndoe.jpg";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { handleRequestError, makeRequest } from "@services/utils";
import { endpoints as ep } from "@services/endpoints";
import store from "store2";
import { toast } from "react-toastify";


const FollowedChannels: React.FC = () => {
	const [userData, setUserData] = useState<unknown>([]);
	const [loading, setLoading] = useState<boolean>(false);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		const fetchData = async () => {
			try {
				const response = await makeRequest(
					"get",
					ep.followChannels,
					{
						userID: 1,
					},
					{
						signal
					}
				); // Pass the signal to the request

				if (response?.success) {
					setUserData(response?.data);
				} else {
					toast.error(response?.message);
				}
				setLoading(false);
			} catch (error) {
				setLoading(false);
				// Check if the error is due to the request being aborted
				if (error?.name === "AbortError") {
					console.log("Request aborted");
				}
			}
		};

		fetchData();

		return () => {
			// Abort the ongoing request when the component unmounts
			abortController.abort();
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
					{userData &&
						userData.map((i, index) => (
							<div key={index}>
								{collapsed ? (
									<div>
										{/* Assuming you have a CollapsedSidebarItem component */}
										<CollapsedSidebarItem
											profilePicture={i?.profileImage || johndoe}
											name=""
											category=""
											viewers={null}
											title={i?.title}
											liveID={i?.liveID}
										/>
									</div>
								) : (
									<div className="w-full h-full hover:bg-foreground/10">
										{/* Assuming you have a SidebarItem component */}
										<SidebarItem
											profilePicture={i?.profileImage || johndoe}
											name={i.displayName}
											category={i.categoryName}
											viewers={i.viewCount}
											title={i?.title}
											liveID={i?.liveID}
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
