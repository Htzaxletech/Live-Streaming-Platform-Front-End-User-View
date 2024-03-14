/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSelector } from "react-redux";
import { RootState } from "@store/index";
import {
	MediaPlayer,
	MediaProvider,
	type MediaPlayerInstance,
} from "@vidstack/react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { useEffect, useRef, useState } from "react";
import React from "react";
import { useSpeech } from "react-text-to-speech";

const AlertsNoti = () => {
	const mediaPlayerRef = useRef<MediaPlayerInstance>(null);
	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	const [animateClass, setAnimateClass] = useState<any>([]);
	const [canPlay, setCanPlay] = useState<any>(false);
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
	} = useSelector((state: RootState) => state.alert.data);

	const { method } =
		layout &&
		layoutList.find((item: { type: string }) => item.type === layout);

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

	useEffect(() => {
		previewAlert();
	}, []);

	const previewAlert = () => {
		if (isAnimating) return;

		if (canPlay) {
			if (mediaPlayerRef.current) {
				(mediaPlayerRef.current as any).play();
			}
		}
		

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

	const handleMediaReady = () => {
		setCanPlay(true);
	};

	return (
		<div className={`h-screen w-screen flex items-center justify-center ${isAnimating ? "visible" : "hidden"}`}>
			{alertSound?.url && (
				<MediaPlayer
					src={alertSound?.url}
					ref={mediaPlayerRef}
					className="hidden"
					load="custom"
					playsinline
					onCanPlay={handleMediaReady}
				>
					<MediaProvider></MediaProvider>
				</MediaPlayer>
			)}

			<div
				style={{
					// backgroundImage: `url(${editorSvg})`,
					width,
					height,
					maxHeight: "100%",
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
									className={`flex grow w-1/2 self-center ${
										method === "overlay" ? "relative" : ""
									}`}
								>
									{alertImage?.type === "video" && (
										<MediaPlayer
											src={alertImage?.url}
											autoplay
											// loop
											className="w-full h-full"
										>
											<MediaProvider></MediaProvider>
										</MediaPlayer>
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
										method === "overlay" ? "absolute inset-0" : ""
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
	);
};

export default AlertsNoti;
