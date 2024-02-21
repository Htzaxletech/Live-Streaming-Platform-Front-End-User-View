/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable @typescript-eslint/no-explicit-any */
// @ts-nocheck
import { useSelector } from "react-redux";
import { RootState } from "store";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
	DefaultAudioLayout,
	defaultLayoutIcons,
	DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import Button from "@components/ui/Button";
import Modal from "@pages/authentication/Modal";
import Heading from "@components/ui/Heading";
import StreamChatBox from "@components/shared/StreamChatBox";
import { MdOutlineEdit } from "react-icons/md";
import { Label } from "@radix-ui/react-dropdown-menu";
import { SetStateAction, lazy, useCallback, useEffect, useState } from "react";
import { ReactTags, Tag } from "react-tag-autocomplete";
import { makeMultipleRequests, makeRequest } from "@services/utils";
import { endpoints as ep } from "@services/endpoints";
import { toast } from "react-toastify";
import store from "store2";
import { generateStreamUrl } from "@utils/helpers";
import { useLocation } from "react-router-dom";
import "@styles/tags.css";
import { useTranslation } from "react-i18next";
import { socket } from "@socket/index";
import { HiOutlineStatusOffline } from "react-icons/hi";
import Offline from "@components/shared/Offline";
import axios from "axios";
import ReactPlayer from "react-player";

// const Button = lazy(() => import("@components/ui/Button"));
// const Modal = lazy(() => import("@pages/authentication/Modal"));
// const Heading = lazy(() => import("@components/ui/Heading"));
// const StreamChatBox = lazy(() => import("@components/shared/StreamChatBox"));

const StreamManager = () => {
	const { state } = useLocation();
	const { t } = useTranslation();
	const isChatOpen = useSelector((state: RootState) => state.chat.isChatOpen);

	const [isOpenStreamInfo, setIsOpenStreamInfo] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);
	const [title, setTitle] = useState<string>("");
	const [selectedTag, setSelectedTag] = useState<Tag[]>([]);
	const [suggestionsTag, setSuggesstionsTag] = useState<Tag[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<Tag[]>([]);
	const [suggestionsCategory, setSuggesstionsCategory] = useState<Tag[]>([]);
	const [viewCount, setViewCount] = useState<number>(0);

	const [channelData, setChannelData] = useState({});
	const [isStartLive, setIsStartLive] = useState(0);
	const [streamKey, setStreamKey] = useState<string>("");

	interface FormState {
		title: string;
		categoryImage: string;
	}

	// const [initFormState, setInitialFormState] = useState<FormState>({
	// 	title: "",
	// 	categoryImage:
	// 		"https://play-lh.googleusercontent.com/uqq6a-fHayQxsNQkxB9ZZXag8N7Du5mOEKcScr9yltHqx3RKgCdr9VJHKGO2vY_GUe0",
	// });

	const [initFormState, setInitialFormState] = useState<FormState>({
		title: channelData?.title || "",
		categoryImage: channelData?.s3categoryImage || "",
	});

	useEffect(() => {
		socket.on("added_live_emitter", (value) => {
			setStreamKey(value?.streamKey);
			if (value) {
				setChannelData(value);
				setIsStartLive(value.live_status);
			}
		});

		const abortController = new AbortController();
		const signal = abortController.signal;

		(async () => {
			try {
				// Multiple requests
				const requests = [
					{ method: "get", url: ep.tags, config: { signal } },
					{
						method: "get",
						url: ep.secondCategoryList,
						config: { signal },
					},
					// {
					// 	method: "get",
					// 	url: ep.liveByUserID,
					// 	data: {
					// 		userID: store.get("id"),
					// 	},
					// 	config: { signal },
					// },
				];

				const responses = await makeMultipleRequests(requests);

				if (responses !== null) {
					const tags = responses[0];
					const category = responses[1];
					// const channel = responses[2];

					if (tags?.success) {
						const data = tags?.data;
						const transformedArray = data.map(
							(item: { ID: number; tagName: string }) => ({
								...item,
								value: item.ID,
								label: item.tagName,
							})
						);
						setSuggesstionsTag(transformedArray);
					} else {
						toast.error(tags?.message);
					}

					if (category?.success) {
						const data = category?.data;
						const transformedArray = data.map(
							(item: { ID: number; categoryName: string }) => ({
								...item,
								value: item.ID,
								label: item.categoryName,
							})
						);
						setSuggesstionsCategory(transformedArray);
					} else {
						toast.error(category?.message);
					}

					// if (channel?.success) {
					// 	const data = channel?.data[0];

					// 	setChannelData(data);
					// 	setStreamKey(data?.streamKey);
					// 	setIsStartLive(data.live_status);
					// }
				}
			} catch (error) {
				// Check if the error is due to the request being aborted
				if (error?.name === "AbortError") {
					console.log("Request aborted");
				}
			}
		})();

		// fetchData();

		// const interval = setInterval(fetchData, 15000);

		return () => {
			// clearInterval(interval); // Clear interval when the component unmounts
			abortController.abort();
		};
	}, []);

	// const fetchData = async () => {
	// 	try {
	// 		const data = {
	// 			userID: store.get("id"),
	// 		};

	// 		const response = await makeRequest("get", ep.liveByUserID, data);

	// 		if (response?.success) {
	// 			const data = response?.data[0];

	// 			setChannelData(data);
	// 			setStreamKey(data?.streamKey);
	// 			setIsStartLive(data.live_status);
	// 		} else {
	// 			toast.error(response?.message);
	// 		}
	// 		setLoading(false);
	// 	} catch (error) {
	// 		setLoading(false);
	// 	}
	// };

	const onAdd = useCallback(
		(newTag: Tag) => {
			setSelectedTag([...selectedTag, newTag]);
		},
		[selectedTag]
	);

	const onDelete = useCallback(
		(tagIndex: number) => {
			setSelectedTag(selectedTag.filter((_, i) => i !== tagIndex));
		},
		[selectedTag]
	);

	const onAddCategory = useCallback((newCategory: Tag) => {
		setSelectedCategory([newCategory]);
	}, []);

	const onDeleteCategory = useCallback(
		(CategoryIndex: number) => {
			setSelectedCategory(
				selectedCategory.filter((_, i) => i !== CategoryIndex)
			);
		},
		[selectedCategory]
	);

	const handleStreamInfo = () => {
		setIsOpenStreamInfo(!isOpenStreamInfo);
		setTitle("");
		setSelectedCategory([]);
		setSelectedTag([]);
	};

	const handleChangeTitle = (e: {
		target: { value: SetStateAction<string> };
	}) => {
		setTitle(e.target.value);
	};

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault();
		setLoading(true);

		try {
			const valuesArray = selectedTag.map((tag) => tag.value);

			const data = {
				categoryID:
					selectedCategory.length > 0 ? selectedCategory[0].ID : "",
				userID: store.get("id"),
				title,
				tags: valuesArray,
			};

			const response = await makeRequest("post", ep.updateStreamInfo, data);

			if (response?.success) {
				const isSelectedExist = suggestionsCategory.find(
					(category) => category.ID === selectedCategory[0].ID
				);

				setChannelData((prevData) => ({
					...prevData,
					title,
					s3categoryImage: isSelectedExist
						? isSelectedExist.s3categoryImage
						: prevData.s3categoryImage,
				}));

				// setInitialFormState({
				// 	...initFormState,
				// 	title: title,
				// 	categoryImage: isSelectedExist?.s3categoryImage || "",
				// });

				handleStreamInfo();
				toast.success(response?.message);
			} else {
				toast.error(response?.message);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	const handleLive = async () => {
		setLoading(true);

		try {
			const data = {
				isStart: isStartLive ? 0 : 1,
				streamKey: store.get("channelData")?.streamKey,
			};

			const response = await makeRequest("post", ep.startLive, data);

			if (response?.success) {
				// toast.success(response?.message);
				setIsStartLive(!isStartLive);
			} else {
				toast.error(response?.message);
			}
			setLoading(false);
		} catch (error) {
			setLoading(false);
		}
	};

	return (
		<div>
			<div className="flex-1 flex flex-col pt-4">
				<div className={`${isChatOpen ? "md:mr-72 lg:mr-80" : "mr-0"}`}>
					<div className="h-50 xl:h-[550px] flex justify-center">
						{/* <ReactPlayer
							url={generateStreamUrl(streamKey)}
							controls
							playing={streamKey ? true : false}
							config={{
								file: {
									hlsOptions: {
										lowLatencyMode: true,
										backBufferLength: 0,
									},
								},
							}}
						/> */}
						{streamKey ? (
							<MediaPlayer
								src={generateStreamUrl(streamKey)}
								autoplay
								muted
								className="h-full rounded-none"
								onHlsError={() => setStreamKey("")}
								streamType="ll-live"
								load="eager"
								aspectRatio="16/9"
							>
								<MediaProvider></MediaProvider>
								<DefaultAudioLayout icons={defaultLayoutIcons} />
								<DefaultVideoLayout icons={defaultLayoutIcons} />
							</MediaPlayer>
						) : (
							<Offline />
						)}
					</div>

					<div className="container">
						{channelData &&
							channelData?.title &&
							channelData?.categoryID &&
							channelData?.tags?.length > 0 && (
								<div className="mt-4 rounded-md flex flex-col md:flex-row gap-6 w-full">
									<div className="w-full lg:w-[200px]">
										<img
											src={channelData?.s3categoryImage}
											alt="Category Image"
											className="w-[150px] h-[100px] md:h-[150px] object-cover border border-black"
											loading="lazy"
										/>
									</div>
									<div className="w-full flex lg:flex-row items center justify-between">
										<div className="mt-2">{channelData?.title}</div>

										<div>
											<Button
												color={isStartLive ? "danger" : "primary"}
												disabled={loading}
												onClick={handleLive}
											>
												{isStartLive
													? t("pages.end_live")
													: t("pages.start_live")}
											</Button>
										</div>
									</div>
								</div>
							)}

						<div className="mt-3">
							<Button
								color="primary"
								size="lg"
								onClick={handleStreamInfo}
							>
								<MdOutlineEdit className="text-xl" />
							</Button>
						</div>
					</div>
				</div>
			</div>

			<StreamChatBox
				streamKey={store.get("channelData")?.streamKey}
				liveID={channelData?.liveID}
				liveStatus={channelData?.live_status}
				setViewCount={setViewCount}
			/>

			<Modal isOpen={isOpenStreamInfo} onClose={handleStreamInfo}>
				<div>
					<Heading size="md">{t("pages.esi")}</Heading>
					<div className="px-0 pt-6 mb-4">
						<form onSubmit={handleSubmit}>
							<div className="mt-2 flex flex-col md:flex-row gap-2 w-full">
								<Label className="md:w-[180px] left-0 w-full">
									{t("pages.st")}
								</Label>
								<div className="w-full">
									<textarea
										id="title"
										className="flex-shrink resize-none w-full outline-none bg-background-base text-foreground-secondary border border-border rounded-md hover:ring-[1px] hover:ring-border focus-within:!ring-[2px] focus-within:!ring-primary px-[9px] py-2"
										rows={3}
										placeholder={t("placeholder.mst")}
										value={title}
										onChange={handleChangeTitle}
									/>
								</div>
							</div>

							<div className="mt-4 flex flex-col md:flex-row gap-2 w-full">
								<Label className="md:w-[180px] left-0 w-full">
									{t("pages.c")}
								</Label>
								<div className="w-full">
									<ReactTags
										labelText="Search for category"
										selected={selectedCategory}
										suggestions={suggestionsCategory}
										onAdd={onAddCategory}
										onDelete={onDeleteCategory}
										noOptionsText="No matching"
										placeholderText={t("placeholder.anc")}
										collapseOnSelect
									/>
								</div>
							</div>

							<div className="mt-4 flex flex-col md:flex-row gap-2 w-full">
								<Label className="md:w-[180px] left-0 w-full">
									{t("pages.t")}
								</Label>
								<div className="w-full">
									<ReactTags
										labelText="Search for tag"
										selected={selectedTag}
										suggestions={suggestionsTag}
										onAdd={onAdd}
										onDelete={onDelete}
										noOptionsText="No matching"
										placeholderText={t("placeholder.ant")}
									/>
								</div>
							</div>

							<div className="mt-10 flex justify-end items-end w-full gap-2">
								<Button
									className="min-w-[80px] py-4"
									color="default"
									type="button"
									onClick={handleStreamInfo}
								>
									{t("pages.cancel")}
								</Button>
								<Button
									className="min-w-[80px] py-4"
									color="primary"
									type="submit"
									disabled={loading}
								>
									{loading ? "Loading..." : t("pages.done")}
								</Button>
							</div>
						</form>
					</div>
				</div>
			</Modal>
		</div>
	);
};

export default StreamManager;
