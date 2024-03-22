/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useSelector } from "react-redux";
// import { RootState } from "@store/index";
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
import { socket } from "@socket/index";

interface AlertData {
	alertSoundName: string;
	alertSoundType: string;
	scale: number;
	alertImageName: string;
	alertImageType: string;
	s3alertImage: string;
	layoutID: number;
	width: number;
	height: number;
	layout: string;
	message: string;
	username: string;
	inAnimation: string;
	inSecond: string;
	outSecond: string;
	outAnimation: string;
	outAnimationTime: string;
	duration: number;
	textColor: string;
	accentColor: string;
	voice_alert_status: boolean;
	s3alertSound: string;
	animationInType: string;
	animationOutType: string;
	// Add other properties as needed
}

const AlertsNoti = () => {
	const mediaPlayerRef = useRef<MediaPlayerInstance>(null);
	const [alertQueue, setAlertQueue] = useState<AlertData[]>([]);
	const [isProcessing, setIsProcessing] = useState(false);
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

	const [formData, setFormData] = useState({
		width: "",
		height: "",
		layout: "",
		message: "",
		username: "",
		inAnimation: "",
		inAnimationTime: "",
		outAnimation: "",
		outAnimationTime: "",
		duration: "",
		textColor: "",
		accentColor: "",
		isCheckedSayTextAlert: false,
		alertImage: {
			url: "",
			type: "",
			name: "",
			scale: 0,
		},
		alertSound: {
			url: "",
			type: "",
			name: "",
		},
	});

	const [updatedMessage, setUpdatedMessage] = useState<JSX.Element | null>(
		null
	);
	const [method, setMethod] = useState(null);

	const { start } = useSpeech({
		text: updatedMessage || "",
		volume: 1, // 0 to 1
	});

	useEffect(() => {
		socket.on("send_test_alert", onSendTestAlert);
		socket.on("follow", onSendTestAlert);
		
		return () => {
			socket.off("send_test_alert", onSendTestAlert);
			socket.off("follow", onSendTestAlert);
		};
	}, []);

	useEffect(() => {
		processNextAlert();
	}, [alertQueue]);

	const onSendTestAlert = (alertData: any) => {
		console.log("alertData", alertData);
		if(alertData){
			const temp = { ...alertData[0] };
			setAlertQueue((prevQueue) => [...prevQueue, temp]);
		}
	};

	const processNextAlert = () => {
		if (alertQueue?.length > 0 && !isProcessing) {
			setIsProcessing(true);
			const nextAlert = alertQueue[0];
			showPreview(nextAlert);
		}
	};

	const removeProcessedAlert = () => {
		setAlertQueue((prevQueue) => prevQueue.slice(1));
		setIsProcessing(false);
	};

	const showPreview = (alertData: any) => {
		const formDataUpdates = {
			width: alertData?.width,
			height: alertData?.height,
			layout: alertData?.layoutID.toString(),
			message: alertData?.message,
			username: alertData?.username,
			inAnimation: alertData?.inAnimation,
			inAnimationTime: alertData?.inSecond,
			outAnimation: alertData?.outAnimation,
			outAnimationTime: alertData?.outSecond,
			duration: alertData?.duration,
			textColor: alertData?.textColor,
			accentColor: alertData?.accentColor,
			isCheckedSayTextAlert: alertData?.voice_alert_status,
			alertImage: {
				url: alertData?.s3alertImage,
				type: alertData?.alertImageType,
				name: alertData?.alertImageName,
				scale: alertData?.scale,
			},
			alertSound: {
				url: alertData?.s3alertSound,
				type: alertData?.alertSoundType,
				name: alertData?.alertSoundName,
			},
		};

		setFormData((prevState) => ({
			...prevState,
			...formDataUpdates,
		}));

		showAlert(formDataUpdates);
	};

	const showAlert = (formData: any) => {
		if (isAnimating) return;

		const { method } =
			formData.layout &&
			layoutList.find(
				(item: { type: string }) => item.type === formData?.layout
			);

		setMethod(method);

		const parts = formData?.message.split("{username}");

		setUpdatedMessage(
			<p>
				{parts.map((part: any, index: number) => (
					<React.Fragment key={index}>
						{part}
						{index !== parts.length - 1 && (
							<span
								className="font-bold text-lg mr-1"
								style={{ color: formData?.accentColor }}
							>
								{formData?.username}
							</span>
						)}
					</React.Fragment>
				))}
			</p>
		);

		if (canPlay) {
			playNotificationSound();
		}

		const inMatch = formData?.inAnimationTime.match(/duration-(\d+)/);
		const outMatch = formData?.inAnimationTime.match(/duration-(\d+)/);
		const durationMs = parseInt(formData?.duration) * 1000;

		if (!inMatch || !outMatch) return;

		const inDuration = parseInt(inMatch[1]);
		const outDuration = parseInt(outMatch[1]);

		if (formData?.inAnimation !== "none") {
			setIsAnimating(true);
			const classesToAdd = [
				"animate-in",
				formData?.inAnimation,
				formData?.inAnimationTime,
			];

			setAnimateClass(classesToAdd);

			setTimeout(() => {
				formData?.isCheckedSayTextAlert && start();

				if (formData?.outAnimation !== "none") {
					const outClassesToAdd = [
						"animate-out",
						formData?.outAnimation,
						formData?.outAnimationTime,
					];

					setAnimateClass(outClassesToAdd);

					setTimeout(() => {
						setIsAnimating(false);
						setAnimateClass([]);
						setTimeout(() => {
							stopNotificationSound();
							removeProcessedAlert();
						}, 2000);
					}, outDuration);
				}
			}, inDuration + durationMs);
		}
	};

	const handleMediaReady = () => {
		setCanPlay(true);
	};

	const playNotificationSound = () => {
		if (mediaPlayerRef.current) {
			mediaPlayerRef.current.play();
		}
	};

	const stopNotificationSound = () => {
		if (mediaPlayerRef.current) {
			mediaPlayerRef.current.pause();
			mediaPlayerRef.current.currentTime = 0;
		}
	};

	return (
		<div
			className={`h-screen w-screen flex items-center justify-center ${
				isAnimating ? "visible" : "hidden"
			}`}
		>
			{formData?.alertSound?.url && (
				<MediaPlayer
					src={formData?.alertSound?.url}
					ref={mediaPlayerRef}
					className="hidden"
					load="eager"
				>
					<MediaProvider onCanPlay={handleMediaReady}></MediaProvider>
				</MediaPlayer>
			)}

			<div
				style={{
					// backgroundImage: `url(${editorSvg})`,
					width: formData?.width,
					height: formData?.height,
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
											(formData?.alertImage?.scale / 100) * 2
										})`,
									}}
									className={`flex grow w-1/2 self-center ${
										method === "overlay" ? "relative" : ""
									}`}
								>
									{formData?.alertImage?.type === "video" && (
										<MediaPlayer
											src={formData?.alertImage?.url}
											autoplay
											muted
											className="w-full h-full"
										>
											<MediaProvider></MediaProvider>
										</MediaPlayer>
									)}

									{formData?.alertImage?.type === "image" && (
										<img
											className="w-full h-full"
											src={formData?.alertImage?.url}
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
										style={{ color: formData?.textColor }}
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
