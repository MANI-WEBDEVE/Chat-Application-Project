import { useSocket } from "@/Context/SocketContext";
import apiClient from "@/lib/api-client";
import { useAppStore } from "@/store";
import { UPLOADS_FILES_ROUTES } from "@/utils/constant";
import EmojiPicker from "emoji-picker-react";
import { useEffect, useRef, useState } from "react";
import { GrAttachment } from "react-icons/gr";
import { IoSend } from "react-icons/io5";
import { RiEmojiStickerLine } from "react-icons/ri";
import { toast } from "sonner";

const MessageBar = () => {
  const emojiRef = useRef();
  const inputRef = useRef();
  const socket = useSocket();
  const [message, setMessage] = useState("");
  const { selectedChatType, selectedChatData, userInfo, setIsUploading, setFileUploadProgress } = useAppStore();
  const [emojiPickerOpen, setEmojiPickerOpen] = useState(false);

  useEffect(() => {
    function handleClickOutside(event) {
      if (emojiRef.current && !emojiRef.current.contains(event.target)) {
        setEmojiPickerOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [emojiRef]);

  const handleEmoji = (emoji) => {
    setMessage((prev) => prev + emoji.emoji);
  };

  const handleSendMessage = () => {
    if (message.length === 0) {
      toast.error("Message cannot be empty");
    } else if (selectedChatType === "contact") {
      socket.emit("sendMessage", {
        sender: userInfo.id,
        contact: message,
        recipient: selectedChatData._id,
        messageType: "text",
        fileUrl: undefined,
      });
      setMessage("");
    }
  };
  const handleAttachmentInput = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleAttachmentChange = async (event) => {
    try {
      const file = event.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      setIsUploading(true);
      const response = await apiClient.post(UPLOADS_FILES_ROUTES, formData, { withCredentials: true,
        onUploadProgress:(data)=> {
            setFileUploadProgress(Math.round((100*data.loaded)/data.total))
        }
       });
      console.log(response.data);
      if (response.status === 200) {
        setIsUploading(false)
       if (selectedChatType === "contact") {
        socket.emit("sendMessage", {
          sender: userInfo.id,
          contact: undefined,
          recipient: selectedChatData._id,
          messageType: "file",
          fileUrl: response.data.filePath
        });
       }
      }
    } catch (error) {
      setIsUploading(false);
      console.log(`some one Error: ${error}`);
      
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
          <button className="text-neutral-500 duration-300 transition-all focus:border-none focus:outline-none focus:text-white" onClick={handleAttachmentInput}>
            <GrAttachment className="text-2xl" />
          <input type="file" hidden ref={inputRef} onChange={handleAttachmentChange} />
          </button>
        </div>
        <div className="relative  top-5 left-3">
          <button
            className="text-neutral-500 duration-300 transition-all focus:border-none focus:outline-none focus:text-white "
            onClick={() => setEmojiPickerOpen(true)}
          >
            <RiEmojiStickerLine className="text-2xl" />
          </button>
          <div className="absolute bottom-16 right-0" ref={emojiRef}>
            <EmojiPicker
              theme="dark"
              open={emojiPickerOpen}
              onEmojiClick={handleEmoji}
              autoFocusSearch={false}
            />
          </div>
        </div>
      </div>
      <button
        className=" bg-[#B417ff] rounded-[0.45rem] flex items-center justify-center p-5  duration-300  transition-all focus:bg-[#741bda] focus:border-none focus:outline-none focus:text-white hover:bg-[#741bda] "
        onClick={handleSendMessage}
      >
        <IoSend className="text-2xl" />
      </button>
    </div>
  );
};

export default MessageBar;
