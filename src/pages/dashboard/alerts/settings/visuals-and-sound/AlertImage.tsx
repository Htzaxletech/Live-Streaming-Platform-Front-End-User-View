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
import { useRef } from "react";
import Input from "@components/ui/Input";
import { RootState } from "@store/index";
import { useDispatch, useSelector } from "react-redux";
import { changeFormData } from "@store/slices/alertSlice";
import { Tooltip } from "react-tooltip";
import { toast } from "react-toastify";

const AlertImage = () => {
	const fileInputRef = useRef<HTMLInputElement>(null);

	const { alertImage } = useSelector((state: RootState) => state.alert.data);
	const dispatch = useDispatch();

	// const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
	// 	const file = event.target.files?.[0];
	// 	if (file) {
	// 		const reader = new FileReader();
	// 		reader.onload = (e) => {
	// 			if (e.target?.result) {
	// 				const mediaUrl = e.target.result as string;
	// 				dispatch(
	// 					changeFormData({
	// 						alertImage: {
	// 							...alertImage,
	// 							name: file.name,
	// 							url: mediaUrl,
	// 							type: file.type.split("/")[0],
	// 						},
	// 					})
	// 				);
	// 			}
	// 		};
	// 		reader.readAsDataURL(file);
	// 	}
	// };

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			// Check file format
			const allowedFormatsImage = ["image/png", "image/jpeg", "image/webp"];
			const allowedFormatsVideo = ["video/gif", "video/webm", "video/mp4"];

			let allowedFormats;
			let maxSize;

			if (allowedFormatsImage.includes(file.type)) {
				allowedFormats = allowedFormatsImage;
				maxSize = 25 * 1024 * 1024; // 25mb for images
			} else if (allowedFormatsVideo.includes(file.type)) {
				allowedFormats = allowedFormatsVideo;
				maxSize = 100 * 1024 * 1024; // 100mb for videos
			} else {
				toast.error("Please select a valid file format.");
				return;
			}

			if (!allowedFormats.includes(file.type)) {
				toast.error(
					`Please select a valid file format (${allowedFormats.join(
						", "
					)}).`
				);
				return;
			}

			// Check file size
			if (file.size > maxSize) {
				toast.error(
					`File size exceeds the maximum limit of ${
						maxSize / (1024 * 1024)
					}mb.`
				);
				return;
			}

			// File is valid, proceed with file reading
			const reader = new FileReader();
			reader.onload = (e) => {
				if (e.target?.result) {
					const mediaUrl = e.target.result as string;

					dispatch(
						changeFormData({
							alertImage: {
								...alertImage,
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
				Alert Image
				<FaExclamationCircle
					className="rotate-180"
					size={17}
					id="alertImageTooltip"
				/>
				<Tooltip
					anchorSelect="#alertImageTooltip"
					place="bottom"
					className="z-50"
				>
					<span>Supported Formats</span> <br />
					<span>PNG, JPEG, WEBP -</span>&nbsp;
					<span className="font-normal capitalize">Max Size: 25mb</span>
					<br />
					<span>GIF, WEBM, MP4 -</span>&nbsp;
					<span className="font-normal capitalize">Max Size: 100mb</span>
				</Tooltip>
			</label>

			<div className="border-dashed border-2 flex flex-col w-full min-h-40 rounded relative">
				<Input
					ref={fileInputRef}
					type="file"
					className="cursor-pointer h-full w-full left-0 top-0 absolute opacity-0"
					accept=".mp4,.webm,.gif,.png,.jpeg,.jpg,.webp"
					role="button"
					onChange={handleFileChange}
				/>

				{alertImage?.url && (
					<div className="flex justify-between items-center pl-2 pb-2 z-10">
						<p>{alertImage?.name}</p>
						<Button
							iconOnly
							onClick={() => {
								dispatch(
									changeFormData({
										alertImage: {
											url: "",
											type: "",
											name: "",
											scale: 50,
										},
									})
								);
							}}
						>
							<RxCross1 />
						</Button>
					</div>
				)}

				<div className="w-full min-h-20 max-h-40 flex">
					{alertImage?.type === "video" && (
						<div>
							<MediaPlayer
								src={alertImage?.url}
								autoplay
								muted
								className="rounded-none m-0 p-0"
							>
								<MediaProvider></MediaProvider>
								<DefaultVideoLayout icons={defaultLayoutIcons} />
							</MediaPlayer>
						</div>
					)}

					{alertImage?.type === "image" && (
						<img
							src={alertImage?.url}
							alt="Alert image"
							className="w-full object-contain"
						/>
					)}
				</div>
			</div>
			<Button className="mt-3 w-full" onClick={handleUploadButtonClick}>
				Upload File
			</Button>

			<div className="flex gap-2 items-center mt-3">
				<label>Scale</label>
				<input
					type="range"
					min={0}
					max={100}
					step={1}
					className="appearance-none w-full h-1 rounded-full outline-none cursor-pointer"
					style={{
						backgroundImage:
							"linear-gradient(to right, #00c798, #00c798)",
					}}
					value={alertImage?.scale}
					onChange={(e) => {
						const scale = e.target.value;
						dispatch(
							changeFormData({
								alertImage: {
									...alertImage,
									scale: scale || 0,
								},
							})
						);
					}}
				/>
				<label className="w-12">{alertImage?.scale}%</label>
			</div>
		</>
	);
};

export default AlertImage;
