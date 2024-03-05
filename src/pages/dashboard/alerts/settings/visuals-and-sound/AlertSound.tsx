/* eslint-disable @typescript-eslint/no-explicit-any */
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import {
	defaultLayoutIcons,
	DefaultVideoLayout,
} from "@vidstack/react/player/layouts/default";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import Button from "@components/ui/Button";
import { RxCross1 } from "react-icons/rx";
import { FaExclamationCircle } from "react-icons/fa";
import { useRef, useState } from "react";
import Input from "@components/ui/Input";

const AlertSound = () => {
	const [mediaData, setMediaData] = useState<{
		url: string;
		type: string;
		name: string;
	}>({
		url: "",
		type: "",
		name: "",
	});

	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target?.result) {
					const mediaUrl = e.target.result as string;
					setMediaData({
						name: file.name,
						url: mediaUrl,
						type: file.type.split("/")[0],
					});
				}
			};
			reader.readAsDataURL(file);
		}
	};

	const handleUploadButtonClick = () => {
		if (fileInputRef.current) {
			fileInputRef.current.click();
		}
	};

	return (
		<>
			<label className="uppercase font-semibold flex items-center gap-2 mt-2 mb-3">
				Alert Sound <FaExclamationCircle className="rotate-180" size={17} />
			</label>

			<div className="border-dashed border-2 flex flex-col w-fullv min-h-40 rounded relative">
				<Input
					ref={fileInputRef}
					type="file"
					className="cursor-pointer h-full w-full left-0 top-0 absolute opacity-0"
					accept=".mp4,.webm,.gif,.png,.jpeg,.jpg,.webp"
					role="button"
					onChange={handleFileChange}
				/>

				{mediaData?.url && (
					<div className="flex justify-between items-center pl-2 pb-2 z-10">
						<p>{mediaData?.name}</p>
						<Button
							iconOnly
							onClick={() => {
								setMediaData({ url: "", type: "", name: "" });
							}}
						>
							<RxCross1 />
						</Button>
					</div>
				)}

				<div className="w-full min-h-20 max-h-40 flex-1 flex object-cover bg-cover">
					{mediaData?.type === "video" && (
						<MediaPlayer
							src={mediaData?.url}
							autoplay
							muted
							className="rounded-none m-0 p-0"
						>
							<MediaProvider></MediaProvider>
							<DefaultVideoLayout icons={defaultLayoutIcons} />
						</MediaPlayer>
					)}

					{mediaData?.type === "image" && (
						<img
							src={mediaData?.url}
							alt="Alert image"
							className="w-full"
						/>
					)}
				</div>
			</div>
			<Button className="mt-3 w-full" onClick={handleUploadButtonClick}>
				Upload File
			</Button>
		</>
	);
};

export default AlertSound;
