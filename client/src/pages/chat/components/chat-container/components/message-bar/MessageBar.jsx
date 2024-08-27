import { useSocket } from "@/Context/SocketContext";
import { useAppStore } from "@/store";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";

const MessageBar = () => {
  const emojiRef = useRef();
  const socket = useSocket()
  const [message, setMessage] = useState("");
  const { selectedChatType, selectedChatData, userInfo } = useAppStore()
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false)

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [emojiRef])

  const handleEmoji = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
  }

  const handleSendMessage = () => {
    if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        contact: message,
        recipient: selectedChatData._id,
        messageType: 'text',
        fileUrl: undefined
      })
    }
  }

  return (
    <div className="h-[10vh] bg-[#1c1d25] flex justify-center items-center px-8  mb-6 gap-4">
      <div className="flex-1 flex bg-[#2a2b33]  rounded-[0.45rem]  itmes-center ga-3 pr-5">
        <input
          type="text"
          className="flex-1 p-5 bg-transparent rounded-[0.45rem] focus:border-none focus:outline-none placeholder:text-gray-700/"
          placeholder="Enter Messages"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <div className="relative top-5 ">

        <button className="text-neutral-500 duration-300 transition-all focus:border-none focus:outline-none focus:text-white">
          <GrAttachment className="text-2xl" />
        </button>
        </div>
        <div className="relative  top-5 left-3">
          <button className="text-neutral-500 duration-300 transition-all focus:border-none focus:outline-none focus:text-white " onClick={() => setEmojiPickerOpen(true)}>
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker theme="dark"
            open={emojiPickerOpen}
            onEmojiClick={handleEmoji}
            autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <button className=" bg-[#B417ff] rounded-[0.45rem] flex items-center justify-center p-5  duration-300  transition-all focus:bg-[#741bda] focus:border-none focus:outline-none focus:text-white hover:bg-[#741bda] " onClick={handleSendMessage}>
          <IoSend className="text-2xl" />
        </button>
    </div>
  );
};

export default MessageBar;
