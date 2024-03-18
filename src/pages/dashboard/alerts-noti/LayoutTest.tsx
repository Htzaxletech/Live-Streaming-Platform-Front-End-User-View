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
import Button from "@components/ui/Button";
import TogglePanel from "@components/ui/TogglePanel";
import { FaRegHeart, FaRegStar } from "react-icons/fa";
import { IoDiamondSharp } from "react-icons/io5";
import Variants from "../alerts/variants/Index";

const LayoutTest = () => {
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
		<main className="grid grid-cols-5 h-screen">
			<header className="bg-gray-200 col-span-5 row-span-1 flex justify-between items-center">
				<div>
					<Button>Back to Alerts Home</Button>
				</div>
				<div>
					<h6 className="font-semibold">Alert Box 2</h6>
				</div>
				<div className="flex items-center gap-2">
					<Button color="default" size="lg">
						Discard Changes
					</Button>
					<Button color="primary" size="lg">
						Save Changes
					</Button>
				</div>
			</header>
			<aside className="bg-gray-400 row-span-12 h-full overflow-y-scroll flex z-10">
				<div className="w-full">
					<TogglePanel
						icon={<FaRegHeart size={16} />}
						heading={"Follows"}
						className="bg-background-float"
					>
						<Variants hideNewVariant initialData={[]} />
					</TogglePanel>
				</div>
			</aside>
			<article className="bg-gray-300 col-span-3 row-span-12 h-full">
				Content
			</article>
			<aside className="bg-gray-400 row-span-12 col-start-5 col-end-6 h-full">
				<div className="w-full">
					<TogglePanel
						icon={<FaRegHeart size={16} />}
						heading={"Follows"}
						className="bg-background-float"
					>
						<Variants hideNewVariant initialData={[]} />
					</TogglePanel>
				</div>
			</aside>
			<footer className="bg-gray-200 col-span-5 row-span-1 flex items-center justify-center">
				Footer
			</footer>
		</main>
	);
};

export default LayoutTest;
