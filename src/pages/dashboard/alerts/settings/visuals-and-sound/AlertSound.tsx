/* eslint-disable @typescript-eslint/no-explicit-any */
// import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import Button from "@components/ui/Button";
import { RxCross1 } from "react-icons/rx";
import { FaExclamationCircle } from "react-icons/fa";
import { useRef } from "react";
import Input from "@components/ui/Input";
import { toast } from "react-toastify";
import { LuMusic4 } from "react-icons/lu";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@store/index";
import { changeFormData } from "@store/slices/alertSlice";
import { Tooltip } from "react-tooltip";

const AlertSound = () => {

	const fileInputRef = useRef<HTMLInputElement>(null);

	const { alertSound } = useSelector((state: RootState) => state.alert.data);
	const dispatch = useDispatch();

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			// Check file format
			const allowedFormats = ["audio/mpeg", "audio/ogg"];
			if (!allowedFormats.includes(file.type)) {
				toast.error("Please select a valid MP3 or OGG file.");
				return;
			}

			// Check file size
			const maxSize = 25 * 1024 * 1024;
			if (file.size > maxSize) {
				toast.error("File size exceeds the maximum limit of 25mb.");
				return;
			}

			// File is valid, proceed with file reading
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target?.result) {
					const mediaUrl = e.target.result as string;

					dispatch(
						changeFormData({
							alertSound: {
								...alertSound,
								name: file.name,
								url: mediaUrl,
								type: file.type.split("/")[0],
							},
						})
					);
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
				Alert Sound{" "}
				<FaExclamationCircle
					className="rotate-180"
					size={17}
					id="alertSoundTooltip"
				/>
				<Tooltip
					anchorSelect="#alertSoundTooltip"
					place="bottom"
					className="z-50"
				>
					<span>Supported Formats</span> <br />
					<span>MP3, OGG -</span>&nbsp;
					<span className="font-normal capitalize">Max Size: 25mb</span>
				</Tooltip>
			</label>

			<div className="border-dashed border-2 flex flex-col w-fullv min-h-40 rounded relative">
				<Input
					ref={fileInputRef}
					type="file"
					className="cursor-pointer h-full w-full left-0 top-0 absolute opacity-0"
					accept=".mp3,.ogg"
					role="button"
					onChange={handleFileChange}
				/>

				{alertSound?.url && (
					<div className="flex justify-between items-center pl-2 pb-2 z-10">
						<p>{alertSound?.name}</p>
						<Button
							iconOnly
							onClick={() => {
								dispatch(
									changeFormData({
										alertSound: {
											...alertSound,
											url: "",
											type: "",
											name: "",
										},
									})
								);
							}}
						>
							<RxCross1 />
						</Button>
					</div>
				)}

				{alertSound?.url && (
					<div className="w-full min-h-20 max-h-40 flex-1 flex object-cover bg-cover justify-center items-center">
						{/* <MediaPlayer
							src={mediaData?.url}
							muted
							className="rounded-none m-0 p-0"
						>
							<MediaProvider></MediaProvider>
						</MediaPlayer> */}
						<div className="bg-background-float w-14 h-14 rounded-full flex justify-center items-center">
							<LuMusic4 size={20} />
						</div>
					</div>
				)}
			</div>
			<Button className="mt-3 w-full" onClick={handleUploadButtonClick}>
				Upload File
			</Button>
		</>
	);
};

export default AlertSound;
