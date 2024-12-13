import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import { useEffect } from "react";
import { toast } from "sonner";
import ContactContainer from "./components/contact-container/ContactContainer";
import EmptyChatContainer from "./components/empty-chat-container/EmptyChatContainer";
import ChatContainer from "./components/chat-container/ChatContainer";

const Chat = () => {
  const {
    userInfo,
    selectedChatType,
    isUploading,
    isDownloading,
    fileUploadProgress,
    fileDownloadProgress,
  } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup profile to cotinue");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      {isUploading && (
        <div className="h-[100vh] w-[100vw] fixed top-0 left-0 z-10 bg-black/80 flex items-center justify-center flex-col gap-3">
          <h5 className="text-2xl font-medium animate-pulse">Uploading File</h5>
          {fileUploadProgress}%
        </div>
      )}
      {isDownloading && (
        <div className="h-[100vh] w-[100vw] fixed top-0 left-0 z-10 bg-black/80 flex items-center justify-center flex-col gap-3">
          <h5 className="text-2xl font-medium animate-pulse">Downloading File</h5>
          {fileDownloadProgress}%
        </div>
      )}
      <ContactContainer />
      {selectedChatType === undefined ? (
        <EmptyChatContainer />
      ) : (
        <ChatContainer />
      )}
    </div>
  );
};

export default Chat;
