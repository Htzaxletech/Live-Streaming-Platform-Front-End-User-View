/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@components/ui/Button";
import editorSvg from "@assets/images/editor.svg";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { useState } from "react";
import { useSpeech } from "react-text-to-speech";
import { socket } from "@socket/index";
import store from "store2";

interface LayoutItem {
	type: string;
	method: string;
}

const layoutList: LayoutItem[] = [
	{ type: "1", method: "flex-row" },
	{ type: "2", method: "flex-row-reverse" },
	{ type: "3", method: "flex-col" },
	{ type: "4", method: "flex-col-reverse" },
	{ type: "5", method: "overlay" },
];

const PreviewContent = () => {
	let audio: HTMLAudioElement;
	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	const [animateClass, setAnimateClass] = useState<string[]>([]);
	const {
		width,
		height,
		layout,
		message,
		username,
		inAnimation,
		inAnimationTime,
		outAnimation,
		outAnimationTime,
		duration,
		textColor,
		accentColor,
		isCheckedSayTextAlert,
		alertImage,
		alertSound,
		variantID,
		itemVariantsID,
		bits,
	} = useSelector((state: RootState) => state.alert.data);

	const method =
		layout && layoutList.find((item) => item.type === layout)?.method;

	const updatedMessage =
		variantID !== 2
			? replaceUsername(message, username, accentColor)
			: replaceAmountAndUsername(
					message,
					bits.toString(),
					username,
					accentColor
					// eslint-disable-next-line no-mixed-spaces-and-tabs
			  );

	const { start } = useSpeech({
		text: message
			.replace("{username}", username)
			.replace("{amount}", bits?.toString()),
		volume: 1,
	});

	const handlePreviewAlert = () => {
		if (isAnimating) return;
		playNotificationSound(alertSound?.url);

		const inMatch = inAnimationTime.match(/duration-(\d+)/);
		const outMatch = inAnimationTime.match(/duration-(\d+)/);

		const durationMs = parseInt(duration) * 1000;

		if (!inMatch || !outMatch) return;

		const inDuration = parseInt(inMatch[1]);
		const outDuration = parseInt(outMatch[1]);

		if (inAnimation !== "none") {
			setIsAnimating(true);
			const classesToAdd = ["animate-in", inAnimation, inAnimationTime];
			setAnimateClass(classesToAdd);

			setTimeout(() => {
				if (outAnimation !== "none") {
					const outClassesToAdd = [
						"animate-out",
						outAnimation,
						outAnimationTime,
					];

					setAnimateClass(outClassesToAdd);

					setTimeout(() => {
						setIsAnimating(false);
						setAnimateClass([]);
						stopNotificationSound();
						isCheckedSayTextAlert && start();
					}, outDuration);
				}
			}, inDuration + durationMs);
		}
	};

	const handleSendTestAlert = () => {
		const socketParam = {
			streamKey: store.get("channelData")?.streamKey,
			variantID,
			item_variantID: itemVariantsID,
		};

		console.log("handleSendTestAlert");
		console.log("socketParam", socketParam);

		socket.emit("send_test_alert", socketParam);
	};

	const playNotificationSound = (soundUrl: string | undefined) => {
		audio = new Audio(soundUrl);
		audio.play();
	};

	const stopNotificationSound = () => {
		if (audio) {
			audio.pause();
			audio.currentTime = 0;
		}
	};

	return (
		<div className="flex grow flex-col max-h-full h-full ml-0">
			<div className="flex grow h-full max-h-full">
				<div className="flex grow flex-col w-[258px]">
					<div className="relative w-full flex items-center gap-3 p-4 bg-background-float">
						<Button
							color="default"
							onClick={handlePreviewAlert}
							disabled={isAnimating}
						>
							Preview Alert
						</Button>
						<Button color="default" onClick={handleSendTestAlert}>
							Send Test Alert
						</Button>
					</div>
					<div className="h-full flex justify-center">
						<div
							style={{
								backgroundImage: `url(${editorSvg})`,
								width,
								height,
								maxHeight: "calc(100% - 18rem)",
							}}
							className="overflow-hidden absolute flex justify-center items-center"
						>
							<div
								className={`absolute w-full h-full flex justify-center ${animateClass.join(
									" "
								)}`}
							>
								<div className="w-full h-full flex items-center visible">
									<div className="w-full flex justify-center relative p-4">
										<div
											className={`flex w-full h-full p-[16px] rounded-[10px] ${
												method !== "overlay" ? method : ""
											}`}
										>
											<div
												style={{
													transform: `scale(${
														(alertImage?.scale / 100) * 2
													})`,
												}}
												className={`flex grow w-1/2 self-center justify-center ${
													method === "overlay" ? "relative" : ""
												}`}
											>
												{alertImage?.type === "video" && (
													<div>
														<MediaPlayer
															src={alertImage?.url || ""}
															autoplay
															// loop
															muted
															className="w-full h-full"
														>
															<MediaProvider></MediaProvider>
														</MediaPlayer>
													</div>
												)}

												{alertImage?.type === "image" && (
													<img
														className="w-full h-full"
														src={alertImage?.url || ""}
														alt="Alert image"
													/>
												)}
											</div>
											<div
												className={`flex items-center justify-center w-full my-3 ${
													method === "overlay"
														? "absolute inset-0"
														: ""
												}`}
											>
												<div
													className="font-bold text-lg mr-1"
													style={{ color: textColor }}
												>
													<p
														dangerouslySetInnerHTML={{
															__html: updatedMessage,
														}}
													/>
												</div>
											</div>
										</div>
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

const replaceUsername = (
	message: string,
	username: string,
	accentColor: string
): string => {
	const usernameSpan = createUserSpan(username, accentColor);
	return message.replace("{username}", usernameSpan);
};

const replaceAmountAndUsername = (
	message: string,
	bits: string,
	username: string,
	accentColor: string
): string => {
	const amountSpan = createAmountSpan(bits, accentColor);
	const usernameSpan = createUserSpan(username, accentColor);
	return message
		.replace("{amount}", amountSpan)
		.replace("{username}", usernameSpan);
};

const createUserSpan = (username: string, accentColor: string): string => {
	return `<span className='font-bold text-lg mr-1' style='color:${accentColor}'>${username}</span>`;
};

const createAmountSpan = (bits: string, accentColor: string): string => {
	return `<span className='font-bold text-lg mr-1' style='color:${accentColor}'>${bits}</span>`;
};

export default PreviewContent;
