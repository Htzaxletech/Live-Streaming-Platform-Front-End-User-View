/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-unused-vars */
// @ts-nocheck
import React, { lazy, useEffect, useState } from "react";
import { FaRegHeart } from "react-icons/fa";
import CollapsedSidebarItem from "../CollapsedSidebarItem";
// import { SidebarItem } from "../Sidebaritem";
import johndoe from "../../../../src/assets/images/johndoe.jpg";
import { tv } from "tailwind-variants";
import { LuArrowUpDown } from "react-icons/lu";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { handleRequestError, makeRequest } from "@services/utils";
import { endpoints as ep } from "@services/endpoints";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { convertToLowerCase } from "@utils/helpers";
import store from "store2";
import { useTranslation } from "react-i18next";

const SidebarItem = lazy(() => import("../Sidebaritem"));

const FollowedChannels: React.FC = () => {
	// const [userData, setUserData] = useState<unknown>([
	// 	{
	// 		profileImage: "test.jpg",
	// 		title: "halo",
	// 		ChannelID: 3,
	// 		displayName: "Adam",
	// 		categoryName: "Basketball",
	// 		viewCount: 0,
	// 		liveID: 0,
	// 		streamKey: "5asdf23",
	// 	},
	// 	{
	// 		profileImage: "www-1213940.jpeg",
	// 		title: "This is streaming",
	// 		ChannelID: 2,
	// 		displayName: "Min",
	// 		categoryName: "Basketball",
	// 		viewCount: 0,
	// 		liveID: 162,
	// 		streamKey: "adb34dg",
	// 	},
	// ]);
	const [userData, setUserData] = useState<unknown>([]);
	const [loading, setLoading] = useState<boolean>(false);

	const navigate = useNavigate();
	const { t } = useTranslation();

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		const fetchData = async () => {
			try {
				const response = await makeRequest(
					"get",
					ep.followChannels,
					{
						userID: store.get("id"),
					},
					{
						signal,
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

		const fetchDataInterval = setInterval(fetchData, 30000); // Call fetchData every 30 seconds

		fetchData();

		return () => {
			// Abort the ongoing request when the component unmounts
			clearInterval(fetchDataInterval);
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

	const handleOnClick = (data) => {
		if (data?.live_status) {
			navigate(`/${convertToLowerCase(data?.displayName)}`, {
				state: {
					liveStreamData: data,
				},
			});
		} else {
			navigate(`/profile/${data?.userID}`);
		}
	};

	return (
		<div className="pb-[50px]">
			<div className="flex">
				{!collapsed && (
					<div className="text-foreground/50 flex-nowrap text-md tracking-wide font-semibold absolute left-3 top-16 mx-auto">
						{t("sidebar.followed")}
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
						userData.length > 0 &&
						userData.map((i, index) => (
							<div key={index} onClick={() => handleOnClick(i)}>
								{collapsed ? (
									<div>
										{/* Assuming you have a CollapsedSidebarItem component */}
										<CollapsedSidebarItem
											profilePicture={i?.s3path || johndoe}
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
											profilePicture={i?.s3path || johndoe}
											name={i.displayName}
											category={i.categoryName}
											viewers={i.viewCount}
											title={i?.title}
											liveStatus={i?.live_status}
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
