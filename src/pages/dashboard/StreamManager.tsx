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
import { useState } from "react";
import Modal from "@pages/authentication/Modal";
import Input from "@components/ui/Input";
import Heading from "@components/ui/Heading";
import { Label } from "@radix-ui/react-dropdown-menu";
import { CiSearch } from "react-icons/ci";

const StreamManager = () => {
	const isChatOpen = useSelector((state: RootState) => state.chat.isChatOpen);
	const [isOpenStreamInfo, setIsOpenStreamInfo] = useState<boolean>(false);
	const [loading, setLoading] = useState<boolean>(false);

	const handleStreamInfo = () => {
		setIsOpenStreamInfo(!isOpenStreamInfo);
	}

	return (
		<div>
			<div className="flex-1 flex flex-col pt-4">
				<div className={` ${isChatOpen ? "md:mr-60 lg:mr-72" : "mr-0"}`}>
					<div className="bg-black w-full md:h-2/4 lg:h-5/6 flex justify-center text-white">
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
						<form onSubmit={() => {}}>
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
									/>
								</div>
							</div>

							<div className="mt-4 flex flex-col md:flex-row gap-2 w-full">
								<Label className="md:w-[180px] left-0 w-full">
									Category
								</Label>
								<div className="w-full">
									<Input
										className="flex-shrink w-full"
										startContent={<CiSearch />}
										placeholder="Search for category"
									/>
								</div>
							</div>

							<div className="mt-4 flex flex-col md:flex-row gap-2 w-full">
								<Label className="md:w-[180px] left-0 w-full">
									Tags
								</Label>
								<div className="w-full">
									<Input
										className="flex-shrink w-full"
										startContent={<CiSearch />}
										placeholder="Search for tags"
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
