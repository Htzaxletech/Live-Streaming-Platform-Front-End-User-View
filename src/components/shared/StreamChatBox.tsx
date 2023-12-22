import Button from "@components/ui/Button";
// import IconButton from "@components/ui/IconButton";
import Input from "@components/ui/Input";
import { useSelector, useDispatch } from "react-redux";
import { toggleChat } from "@store/slices/chatSlice";
import drawRight from "@assets/images/draw-right.svg";
import people from "@assets/images/people.svg";
import { RootState } from "store";
import { LuUsers, LuArrowLeftFromLine, LuArrowRightFromLine } from "react-icons/lu";
// import { FaUser } from "react-icons/fa"; // Assuming you're using React Icons

const StreamChatBox: React.FC = () => {
  const isChatOpen = useSelector((state: RootState) => state.chat.isChatOpen);
  const dispatch = useDispatch();

  const handleToggleChat = () => {
    dispatch(toggleChat());
  };


  return (
    <>
      <div
        className={`invisible md:visible md:w-2/6 lg:w-1/5 overflow-y-auto h-full flex flex-col justify-between fixed right-0 transition-all duration-300 transform ${
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
            <span className="text-gray-500">User1:</span> Hello!
          </div>
          <div className="mb-2">
            <span className="text-gray-500">User2:</span> Hi there!
          </div>
          <div className="mb-2">
            <span className="text-gray-500">User1:</span> Hello!
          </div>
          <div className="mb-2">
            <span className="text-gray-500">User2:</span> Hi there!
          </div>
          <div className="mb-2">
            <span className="text-gray-500">User1:</span> Hello!
          </div>
          <div className="mb-2">
            <span className="text-gray-500">User2:</span> Hi there!Hi there!Hi
            there!Hi there!Hi
          </div>
          <div className="mb-2">
            <span className="text-gray-500">User1:</span> Hello!
          </div>
          <div className="mb-2">
            <span className="text-gray-500">User2:</span> Hi there!Hi there!Hi
            there!Hi there!Hi there!Hi ther there!Hi there!Hi there!Hi ther
          </div>
          <div className="mb-2">
            <span className="text-gray-500">User1:</span> Hello!ad asdlfkhaosf
          </div>
          <div className="mb-2">
            <span className="text-gray-500">User2:</span> Hi there!
          </div>
          <div className="mb-2">
            <span className="text-gray-500">User1:</span> Hello!
          </div>
          <div className="mb-2">
            <span className="text-gray-500">User2:</span> Hi there!
          </div>
          <div className="mb-2">
            <span className="text-gray-500">User1:</span> Hello!
          </div>
          <div className="mb-2">
            <span className="text-gray-500">User2:</span> Hi there!Hi there!Hi
            there!Hi there!Hi there!Hi there!Hi there!Hi there!
          </div>
          <div className="mb-2">
            <span className="text-gray-500">User1:</span> Hello!
          </div>
          <div className="mb-2">
            <span className="text-gray-500">User2:</span> Hi there!
          </div>
          <div className="mb-2">
            <span className="text-gray-500">User1:</span> Hello!
          </div>
          <div className="mb-2">
            <span className="text-gray-500">User2:</span> Hi there!
          </div>
          <div className="mb-2">
            <span className="text-gray-500">User1:</span> Hello!
          </div>
          <div className="mb-2">
            <span className="text-gray-500">User2:</span> Hi there!Hi there!Hi
            there!Hi there!Hi there!Hi there!Hi there!Hi there!
          </div>
          {/* Add more messages as needed */}
        </div>

        {/* Chat Footer */}
        <div className="pt-4 px-4 h-2/6">
          <Input
            className="w-full"
            placeholder="Send a message"
            endContent={
              <Button className="bg-transparent">
                <img src="/src/assets/images/emote.svg" />
              </Button>
            }
          />
          <div className="flex justify-end mt-3">
            <Button color="primary" className="text-white">
              Chat
            </Button>
          </div>
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
