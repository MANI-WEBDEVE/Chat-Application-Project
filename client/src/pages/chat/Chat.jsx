import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import { useEffect } from "react";
import { toast } from "sonner";
import ContactContainer from "./components/contact-container/ContactContainer";
import EmptyChatContainer from "./components/empty-chat-container/EmptyChatContainer";
import ChatContainer from "./components/chat-container/ChatContainer";

const Chat = () => {
  const { userInfo } = useAppStore();
  const navigate = useNavigate();
  useEffect(() => {
    if (!userInfo.profileSetup) {
      toast("Please setup profile to cotinue");
      navigate("/profile");
    }
  }, [userInfo, navigate]);

  return (
    <div className="flex h-[100vh] text-white overflow-hidden">
      <ContactContainer />
      <EmptyChatContainer />
      <ChatContainer />
    </div>
  );
};

export default Chat;
