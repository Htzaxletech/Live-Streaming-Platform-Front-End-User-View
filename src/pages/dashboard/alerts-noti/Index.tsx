/* eslint-disable @typescript-eslint/no-explicit-any */
// import { useSelector } from "react-redux";
// import { RootState } from "@store/index";
import { MediaPlayer, MediaProvider } from "@vidstack/react";
import "@vidstack/react/player/styles/default/theme.css";
import "@vidstack/react/player/styles/default/layouts/video.css";
import { useEffect, useState } from "react";
import { useSpeech } from "react-text-to-speech";
import { socket } from "@socket/index";

interface AlertType {
	url?: string;
	type?: string;
	name?: string;
	scale?: number;
}
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
	voiceMessage: string;
	alertImage: AlertType;
	alertSound: AlertType;
	inAnimationTime: string;
	isCheckedSayTextAlert: boolean;
	bits: number;
	variantID: number;
	// Add other properties as needed
}

const AlertsNoti = () => {
	const [alertQueue, setAlertQueue] = useState<AlertData[]>([]);
	const [isProcessing, setIsProcessing] = useState(false);
	const [isAnimating, setIsAnimating] = useState<boolean>(false);
	const [animateClass, setAnimateClass] = useState<any>([]);
	const [layoutList] = useState<any>([
		{ type: "1", method: "flex-row" },
		{ type: "2", method: "flex-row-reverse" },
		{ type: "3", method: "flex-col" },
		{ type: "4", method: "flex-col-reverse" },
		{ type: "5", method: "overlay" },
	]);

	const [updatedMessage, setUpdatedMessage] = useState<string>("");
	const [method, setMethod] = useState<string | null>(null);
	let audio: HTMLAudioElement | null = null;

	const { start } = useSpeech({
		text: alertQueue?.[0]?.voiceMessage || "",
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

	const onSendTestAlert = (socketData: any) => {
		const alertData = socketData[0];
		if (!alertData) return;

		let voiceMsg = alertData.message;
		if (parseInt(alertData?.variantID) !== 2) {
			voiceMsg = voiceMsg.replace("{username}", alertData.username);
		} else {
			voiceMsg = voiceMsg
				.replace("{username}", alertData.username)
				.replace("{amount}", alertData.bits.toString());
		}

		const formDataUpdates: Partial<AlertData> = {
			width: alertData?.width,
			height: alertData?.height,
			layout: alertData?.layoutID?.toString(),
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
			bits: alertData?.bits,
			variantID: alertData?.variantID,
			voiceMessage: voiceMsg,
		};

		setAlertQueue((prevQueue) => [
			...prevQueue,
			formDataUpdates as AlertData,
		]);
	};

	const processNextAlert = () => {
		if (alertQueue?.length > 0 && !isProcessing) {
			setIsProcessing(true);
			showAlert(alertQueue[0]);
		}
	};

	const removeProcessedAlert = () => {
		setAlertQueue((prevQueue) => prevQueue.slice(1));
		setIsProcessing(false);
	};

	const showAlert = (formDataParams: AlertData) => {
		if (isAnimating) return;

		const { method } = layoutList.find(
			(item: { type: string }) => item.type === formDataParams.layout
		) || { method: null };

		setMethod(method);

		let replaceMsg = formDataParams.message.replace(
			"{username}",
			`<span className='font-bold text-lg mr-1' style=color:${formDataParams.accentColor}>${formDataParams.username}</span>`
		);

		if (formDataParams.variantID === 2) {
			replaceMsg = replaceMsg.replace(
				"{amount}",
				`<span className='font-bold text-lg mr-1' style=color:${formDataParams.accentColor}>${formDataParams.bits}</span>`
			);
		}

		setUpdatedMessage(replaceMsg);
		playNotificationSound(formDataParams?.alertSound?.url);

		const inMatch = formDataParams?.inAnimationTime.match(/duration-(\d+)/);
		const outMatch = formDataParams?.inAnimationTime.match(/duration-(\d+)/);
		const durationMs = formDataParams?.duration * 1000;

		if (!inMatch || !outMatch) return;

		const inDuration = parseInt(inMatch[1]);
		const outDuration = parseInt(outMatch[1]);

		if (formDataParams?.inAnimation !== "none") {
			setIsAnimating(true);
			const classesToAdd = [
				"animate-in",
				formDataParams?.inAnimation,
				formDataParams?.inAnimationTime,
			];

			setAnimateClass(classesToAdd);

			setTimeout(() => {
				if (formDataParams?.outAnimation !== "none") {
					const outClassesToAdd = [
						"animate-out",
						formDataParams?.outAnimation,
						formDataParams?.outAnimationTime,
					];

					setAnimateClass(outClassesToAdd);

					setTimeout(() => {
						setIsAnimating(false);
						setAnimateClass([]);
						setTimeout(() => {
							stopNotificationSound();
							removeProcessedAlert();
							formDataParams?.isCheckedSayTextAlert && start();
						}, 2000);
					}, outDuration);
				}
			}, inDuration + durationMs);
		}
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
		<div
			className={`h-screen w-screen flex items-center justify-center ${
				isAnimating ? "visible" : "hidden"
			}`}
		>
			<div
				style={{
					// backgroundImage: `url(${editorSvg})`,
					width: alertQueue?.[0]?.width,
					height: alertQueue?.[0]?.height,
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
											alertQueue?.[0]?.alertImage?.scale &&
											(alertQueue?.[0]?.alertImage?.scale / 100) * 2
										})`,
									}}
									className={`flex grow w-1/2 self-center ${
										method === "overlay" ? "relative" : ""
									}`}
								>
									{alertQueue?.[0]?.alertImage?.type === "video" && (
										<MediaPlayer
											src={alertQueue?.[0]?.alertImage?.url || ""}
											autoplay
											muted
											className="w-full h-full"
										>
											<MediaProvider></MediaProvider>
										</MediaPlayer>
									)}

									{alertQueue?.[0]?.alertImage?.type === "image" && (
										<img
											className="w-full h-full"
											src={alertQueue?.[0]?.alertImage?.url || ""}
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
										style={{ color: alertQueue?.[0]?.textColor }}
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
	);
};

export default AlertsNoti;
