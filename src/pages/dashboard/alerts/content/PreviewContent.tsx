/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@components/ui/Button";
import editorSvg from "@assets/images/editor.svg";
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import {
	MediaPlayer,
	MediaProvider,
	type MediaPlayerInstance,
} from "@vidstack/react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { useRef, useState } from "react";
import React from "react";
import { useSpeech } from "react-text-to-speech";
import { socket } from "@socket/index";
import store from "store2";

const PreviewContent = () => {
	const mediaPlayerRef = useRef<MediaPlayerInstance>(null);
	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	const [animateClass, setAnimateClass] = useState<any>([]);
	const [layoutList] = useState<any>([
		{
			type: "1",
			method: "flex-row",
		},
		{
			type: "2",
			method: "flex-row-reverse",
		},
		{
			type: "3",
			method: "flex-col",
		},
		{
			type: "4",
			method: "flex-col-reverse",
		},
		{
			type: "5",
			method: "overlay",
		},
	]);

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
		itemVariantsID
	} = useSelector((state: RootState) => state.alert.data);

	const { method } = layout && layoutList.find(
		(item: { type: string }) => item.type === layout
	);

	const parts = message.split("{username}");
	const updatedMessage = (
		<p>
			{parts.map((part, index) => (
				<React.Fragment key={index}>
					{part}
					{index !== parts.length - 1 && (
						<span
							className="font-bold text-lg mr-1"
							style={{ color: accentColor }}
						>
							{username}
						</span>
					)}
				</React.Fragment>
			))}
		</p>
	);

	const { start } = useSpeech({
		text: updatedMessage,
		volume: 1, // 0 to 1
	});

	const handlePreviewAlert = () => {
		if (isAnimating) return;

		if (mediaPlayerRef.current) {
			(mediaPlayerRef.current as any).play();
		}

		const inMatch = inAnimationTime.match(/duration-(\d+)/);
		const outMatch = inAnimationTime.match(/duration-(\d+)/);

		console.log("inAnimation", inAnimation);
		const durationMs = parseInt(duration) * 1000;

		if (!inMatch || !outMatch) return;

		const inDuration = parseInt(inMatch[1]);
		const outDuration = parseInt(outMatch[1]);

		if (inAnimation !== "none") {
			setIsAnimating(true);
			const classesToAdd = ["animate-in", inAnimation, inAnimationTime];

			setAnimateClass(classesToAdd);

			setTimeout(() => {
				isCheckedSayTextAlert && start();

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
					}, outDuration);
				}
			}, inDuration + durationMs);
		}
	};

	const handleSendTestAlert = () => {
		console.log("handleSendTestAlert");
		socket.emit(
			"send_test_alert",
			{
				streamKey: store.get("channelData")?.streamKey,
				variantID,
				item_variantID: itemVariantsID,
			}
		);
	}

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
						<Button color="default" onClick={handleSendTestAlert}>Send Test Alert</Button>
					</div>
					<div className="h-full flex items-center justify-center mt-0">
						{alertSound?.url && (
							<MediaPlayer
								src={alertSound?.url}
								ref={mediaPlayerRef}
								className="hidden"
							>
								<MediaProvider></MediaProvider>
							</MediaPlayer>
						)}

						<div
							style={{
								backgroundImage: `url(${editorSvg})`,
								width,
								height,
								maxHeight: "calc(100% - 20rem)",
							}}
							className="overflow-hidden absolute flex justify-center items-center"
						>
							<div
								className={`absolute w-full h-full flex justify-center ${animateClass.join(
									" "
								)}`}
								// onAnimationEnd={() => setIsAnimating(false)}
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
															src={alertImage?.url}
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
														src={alertImage?.url}
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
													{updatedMessage}
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

export default PreviewContent;
