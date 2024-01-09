/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "@components/ui/Button";
import Input from "@components/ui/Input";
import { useSelector, useDispatch } from "react-redux";
import { toggleChat } from "@store/slices/chatSlice";
import { RootState } from "store";
import { LuUsers, LuArrowLeftFromLine, LuArrowRightFromLine } from "react-icons/lu";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { socket } from "../../socket";
import { customAlphabet } from "nanoid";
import { useParams } from "react-router-dom";
import store from "store2";

const StreamChatBox: React.FC = () => {
  const isChatOpen = useSelector((state: RootState) => state.chat.isChatOpen);
  const [chatMessages, setChatMessages] = useState<unknown[]>([]);
  // const [isConnected, setIsConnected] = useState(false);
  const [message, setMessage] = useState("");

  const dispatch = useDispatch();

  const handleToggleChat = () => {
    dispatch(toggleChat());
  };

  const nanoid = customAlphabet("1234567890", 6);

  let userID = store.get("userId");
  if (!userID) {
    userID = nanoid();
    store.set("userId", userID);
  }
  
  const params = useParams();
    
  useEffect(() => {
    socket.connect();

    function onConnect() {
      socket.timeout(3000).emit(
        "livestream_connect",
        {
          userID: 1,
          // streamKey: params.id,
          streamKey: "0r6fyRXaj",
        },
        () => {
          console.log("livestream_connect");
        }
      );

       socket.timeout(3000).emit(
         "chat_connect",
         {
           userID: 1,
           // streamKey: params.id,
           liveID: "123",
         },
         () => {
           console.log("chat_connect");
         }
       );
    }

    function onDisconnect() {
      socket.emit(
        "livestream_disconnect",
        {
          userID,
          // streamKey: params.id,
          streamKey: "0r6fyRXaj",
        },
        () => {
          console.log("livestream_disconnect");
        }
      );

      socket.emit(
        "chat_disconnect",
        {
          userID: 1,
          // streamKey: params.id,
          liveID: "123",
        },
        () => {
          console.log("chat_disconnect");
        }
      );
    }

    // function onConnectLiveChat() {
    //   socket.timeout(3000).emit(
    //     "chat_connect",
    //     {
    //       userID: 1,
    //       // streamKey: params.id,
    //       LiveID: "123",
    //     },
    //     () => {
    //       console.log("chat_connect");
    //     }
    //   );
    // }

    // function onDisConnectLiveChat() {
    //   socket.emit(
    //     "chat_disconnect",
    //     {
    //       userID,
    //       // streamKey: params.id,
    //       LiveID: "123",
    //     },
    //     () => {
    //       console.log("chat_disconnect");
    //     }
    //   );
    // }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    function onMessageEvent(value: any) {
      console.log("value", value);
      setChatMessages(previous => [...previous, value]);
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);

    // socket.on("connect", onConnectLiveChat);
    // socket.on("disconnect", onDisConnectLiveChat);

    socket.on("chat_list_message", onMessageEvent);
    console.log("listen events");

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("chat_list_message", onMessageEvent);
    };
  }, [params.id]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log("message", message);
    socket.emit(
      "add_chat_message",
      { userID, liveID: params.id, message },
      () => {
        console.log("Sent");
      }
    );
    setMessage("");
  };

  return (
		<>
			<div
				className={`invisible md:visible bg-background-base md:w-60 lg:w-72 top-[50px] overflow-y-auto h-full flex flex-col justify-between fixed right-0 transform ${
					isChatOpen ? "translate-x-0" : "translate-x-full"
				} ease-in-out z-20`}
			>
				<div className="flex justify-between items-center border-b-2 gap-2 p-2">
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
				<div className="px-4 pt-4 h-4/6 overflow-auto">
					{/* Chat messages */}
					<div className="mb-2">
						<span className="text-gray-500">Default User:</span> Hello
						Testing!
					</div>

					{chatMessages.map((i: any, index) => {
						return (
							<div key={index} className="mb-2">
								<span className="text-gray-500">{i.userID}:</span>
								{i.message}
							</div>
						);
					})}
					{/* Add more messages as needed */}
				</div>

				{/* Chat Footer */}
				<div className="pt-4 px-4 h-2/6">
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
