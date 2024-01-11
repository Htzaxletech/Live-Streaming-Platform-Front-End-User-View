/* eslint-disable @typescript-eslint/no-unused-vars */
import StreamChatBox from "@components/shared/StreamChatBox";
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
import { MdOutlineEdit } from "react-icons/md";
import Modal from "@pages/authentication/Modal";
// import Input from "@components/ui/Input";
import Heading from "@components/ui/Heading";
import { Label } from "@radix-ui/react-dropdown-menu";
import { SetStateAction, useCallback, useEffect, useState } from "react";
import { ReactTags, Tag } from "react-tag-autocomplete";
import { makeMultipleRequests, makeRequest } from "@services/utils";
import { endpoints as ep } from "@services/endpoints";
import { toast } from "react-toastify";
import "@styles/tags.css";

const StreamManager = () => {
	const isChatOpen = useSelector((state: RootState) => state.chat.isChatOpen);
	const [isOpenStreamInfo, setIsOpenStreamInfo] = useState<boolean>(false);
	const [loading] = useState<boolean>(false);

	const [title, setTitle] = useState<string>("");

	const [selectedTag, setSelectedTag] = useState<Tag[]>([]);
	const [suggestionsTag, setSuggesstionsTag] = useState<Tag[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<Tag[]>([]);
	const [suggestionsCategory, setSuggesstionsCategory] = useState<Tag[]>([]);

	useEffect(() => {
		const abortController = new AbortController();
		const signal = abortController.signal;

		(async () => {
			try {
				// Multiple requests
				const requests = [
					{ method: "get", url: ep.tags, signal },
					{
						method: "get",
						url: ep.secondCategory,
						signal,
					},
				];

				const responses = await makeMultipleRequests(requests);

				const tags = responses[0];
				const category = responses[1];

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
			} catch (error) {
				// Check if the error is due to the request being aborted
				if (error?.name === "AbortError") {
					console.log("Request aborted");
				}
			}
		})();

		return () => {
			abortController.abort();
		};
	}, []);

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

	const onAddCategory = useCallback(
		(newCategory: Tag) => {
			setSelectedCategory([...selectedCategory, newCategory]);
		},
		[selectedCategory]
	);

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

	const handleSubmit = (e: { preventDefault: () => void }) => {
		e.preventDefault();
		console.log(title);
		console.log(selectedCategory);
		console.log(selectedTag);
	};

	return (
		<div>
			<div className="flex-1 flex flex-col pt-4">
				<div className={` ${isChatOpen ? "md:mr-60 lg:mr-72" : "mr-0"}`}>
					<div className="h-50 xl:h-[550px] flex justify-center">
						<MediaPlayer
							src="https://demo.unified-streaming.com/k8s/features/stable/video/tears-of-steel/tears-of-steel.ism/.m3u8"
							autoplay
							className="h-full rounded-none"
						>
							<MediaProvider></MediaProvider>
							<DefaultAudioLayout icons={defaultLayoutIcons} />
							<DefaultVideoLayout icons={defaultLayoutIcons} />
						</MediaPlayer>
					</div>

					<div className="container">
						<div className="py-5 rounded-md mt-2 flex flex-col md:flex-row gap-6 w-full">
							<div className="w-full lg:w-1/6">
								<img
									src="https://www.adorama.com/alc/wp-content/uploads/2018/11/landscape-photography-tips-yosemite-valley-feature.jpg"
									alt="Profile Picture"
									className="w-full h-auto md:h-[150px] object-cover border border-black"
									loading="lazy"
								/>
							</div>
							<div className="w-full lg:w-4/6">
								<div className="mt-2">Stream Title</div>
							</div>
						</div>
						<div>
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
			<StreamChatBox />

			<Modal isOpen={isOpenStreamInfo} onClose={handleStreamInfo}>
				<div>
					<Heading size="md">Edit Stream Info</Heading>
					<div className="px-0 pt-6 mb-4">
						<form onSubmit={handleSubmit}>
							<div className="mt-2 flex flex-col md:flex-row gap-2 w-full">
								<Label className="md:w-[180px] left-0 w-full">
									Title
								</Label>
								<div className="w-full">
									<textarea
										id="title"
										className="flex-shrink resize-none w-full outline-none bg-background-base text-foreground-secondary border border-border rounded-md hover:ring-[1px] hover:ring-border focus-within:!ring-[2px] focus-within:!ring-primary px-[9px] py-2"
										rows={3}
										placeholder="My stream title"
										value={title}
										onChange={handleChangeTitle}
									/>
								</div>
							</div>

							<div className="mt-4 flex flex-col md:flex-row gap-2 w-full">
								<Label className="md:w-[180px] left-0 w-full">
									Category
								</Label>
								<div className="w-full">
									{/* <Input
										className="flex-shrink w-full"
										startContent={<CiSearch />}
										placeholder="Search for category"
									/> */}

									<ReactTags
										labelText="Search for category"
										selected={selectedCategory}
										suggestions={suggestionsCategory}
										onAdd={onAddCategory}
										onDelete={onDeleteCategory}
										noOptionsText="No matching"
									/>
								</div>
							</div>

							<div className="mt-4 flex flex-col md:flex-row gap-2 w-full">
								<Label className="md:w-[180px] left-0 w-full">
									Tags
								</Label>
								<div className="w-full">
									{/* <Input
										className="flex-shrink w-full"
										startContent={<CiSearch />}
										placeholder="Search for tags"
									/> */}

									<ReactTags
										labelText="Search for tag"
										selected={selectedTag}
										suggestions={suggestionsTag}
										onAdd={onAdd}
										onDelete={onDelete}
										noOptionsText="No matching"
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
									Cancel
								</Button>
								<Button
									className="min-w-[80px] py-4"
									color="primary"
									type="submit"
									disabled={loading}
								>
									{loading ? "Loading..." : "Done"}
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
