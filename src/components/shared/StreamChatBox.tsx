/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import store from "store2";
import { useSelector, useDispatch } from "react-redux";
import { toggleChat } from "@store/slices/chatSlice";
import { RootState } from "store";
import {
	LuUsers,
	LuArrowLeftFromLine,
	LuArrowRightFromLine,
} from "react-icons/lu";
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { socket } from "../../socket";
import { useLocation } from "react-router-dom";
import { chatTempData, getRandomColor } from "@utils/helpers";
import { Virtuoso } from "react-virtuoso";
import { FaArrowDown } from "react-icons/fa6";

interface StreamChatBoxProps {
	liveID: any; // Replace 'any' with a more specific type if possible
	streamKey: any; // Replace 'any' with a more specific type if possible
}

const StreamChatBox: React.FC<StreamChatBoxProps> = ({
	liveID: lid,
	streamKey: skey,
}) => {
	const isChatOpen = useSelector((state: RootState) => state.chat.isChatOpen);
	const [chatMessages, setChatMessages] = useState<unknown[]>(chatTempData);
	// const [isConnected, setIsConnected] = useState(false);
	const [message, setMessage] = useState("");
	const [showScrollButton, setShowScrollButton] = useState(false);

	const dispatch = useDispatch();
	const { state } = useLocation();

	const handleToggleChat = () => {
		dispatch(toggleChat());
	};

	console.log(
		"Stream Chat Box >> state?.liveStreamData",
		state?.liveStreamData
	);

	const userID = store.get("id");
	const streamKey = state?.liveStreamData?.streamKey || skey;
	const liveID = state?.liveStreamData?.liveID || lid;

	// console.table({ userID, streamKey });

	const virtuosoRef = useRef<any>(null);

	useEffect(() => {
		scrollToBottom();
	}, [chatMessages]);

	// const handleScroll = () => {
	// 	if (virtuosoRef.current) {
	// 		const { scrollTop, scrollHeight, clientHeight } =
	// 			virtuosoRef.current.getScrollingElement();
	// 		const isAtBottom = scrollTop + clientHeight === scrollHeight;

	// 		setShowScrollButton(!isAtBottom);
	// 	}
	// };

	const scrollToBottom = () => {
		if (virtuosoRef.current) {
			virtuosoRef.current.scrollToIndex({
				index: chatMessages.length - 1,
				align: "end",
				behavior: "smooth",
			});
		}
	};

	useEffect(() => {
		const liveStatus = 1;

		if (liveStatus && state?.liveStreamData) {
			socket.connect();

			socket.timeout(3000).emit("add_user_count", { userID });

			socket.on("connect", onConnect);
			socket.on("disconnect", onDisconnect);
			socket.on("chat_list_message", onMessageEvent);
		}

		return () => {
			socket.emit("remove_user_count", { userID });

			socket.off("connect", onConnect);
			socket.off("disconnect", onDisconnect);
			socket.off("chat_list_message", onMessageEvent);
		};
	}, []);

	const onConnect = () => {
		socket.timeout(3000).emit(
			"livestream_connect",
			{
				userID,
				streamKey,
			},
			() => {
				console.log("livestream_connect");
			}
		);

		socket.timeout(3000).emit(
			"chat_connect",
			{
				userID,
				liveID,
			},
			() => {
				console.log("chat_connect");
			}
		);
	};

	const onDisconnect = () => {
		socket.emit(
			"livestream_disconnect",
			{
				userID,
				streamKey,
			},
			() => {
				console.log("livestream_disconnect");
			}
		);

		socket.emit(
			"chat_disconnect",
			{
				userID,
				liveID,
			},
			() => {
				console.log("chat_disconnect");
			}
		);
	};

	const onMessageEvent = (value: any) => {
		setChatMessages((previous) => [...previous, value]);
	};

	const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMessage(e.target.value);
	};

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault();

		console.log("chatMessages", chatMessages);
		setChatMessages((previous) => [...previous, message]);

		socket.emit("add_chat_message", { userID, liveID, message }, () => {
			console.log("message sent");
		});

		setMessage("");
	};

	const chatContent = (_, chat: any) => (
		<div className="text-sm hover:bg-zinc-100 px-2 py-1">
			<span style={{ backgroundColor: getRandomColor() }}>
				{chat?.userID}
			</span>
			<span>:&nbsp;</span>
			<span className="leading-normal">{chat?.message}</span>
		</div>
	);

	const handleEndReached = () => {
		setShowScrollButton(false);
	};

	const handleAtBottomStateChange = (atBottom: boolean) => {
		setShowScrollButton(!atBottom);
	};

	return (
		<>
			<div
				className={`invisible md:visible bg-background-base md:w-60 lg:w-72 overflow-y-auto h-full flex flex-col justify-between fixed top-0 right-0 transform ${
					isChatOpen ? "translate-x-0" : "translate-x-full"
				} ease-in-out z-20`}
			>
				<div className="flex justify-between items-center border-b-2 gap-2 p-2 mt-[50px]">
					{/* Toggle Button */}
					<Button className="bg-transparent" onClick={handleToggleChat}>
						<LuArrowRightFromLine className="text-xl" />
					</Button>
					<div>
						<h5 className="uppercase font-semibold">Stream Chat</h5>
					</div>

					<Button className="bg-transparent">
						<LuUsers className="text-xl" />
					</Button>
				</div>

				{/* Chat Content */}
				<div className="px-2 pt-3 h-5/6">
					{/* Chat messages */}
					<Virtuoso
						ref={virtuosoRef}
						style={{ height: "100%" }}
						data={chatMessages}
						itemContent={chatContent}
						endReached={handleEndReached}
						atBottomStateChange={handleAtBottomStateChange}
					/>
					{showScrollButton && (
						<Button
							className="relative mx-auto bottom-10 rounded-full bg-primary-50 hover:bg-primary-100 active:bg-primary-100"
							onClick={() => scrollToBottom()}
						>
							<FaArrowDown className="text-lg text-primary" />
						</Button>
					)}
				</div>

				{/* Chat Footer */}
				<div className="pt-4 px-4 h-1/6">
					<form onSubmit={handleSubmit}>
						<Input
							className="w-full"
							placeholder="Send a message"
							value={message}
							onChange={handleInputChange}
							endContent={
								<Button className="bg-transparent">
									<img src="/src/assets/images/emote.svg" />
								</Button>
							}
						/>
						<div className="flex justify-end mt-3">
							<Button
								color="primary"
								className="text-white"
								type="submit"
							>
								Chat
							</Button>
						</div>
					</form>
				</div>
			</div>

			{!isChatOpen && (
				<Button
					color="primary"
					className="fixed top-16 right-0 z-50 transition-all duration-300 rounded-tr-none rounded-br-none"
					onClick={handleToggleChat}
				>
					<LuArrowLeftFromLine className="text-xl" />
				</Button>
			)}
		</>
	);
};

export default StreamChatBox;
