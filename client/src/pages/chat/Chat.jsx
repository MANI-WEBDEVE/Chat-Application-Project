import { useNavigate } from 'react-router-dom';
import { useAppStore } from "@/store";
import { useEffect } from 'react';
import { toast } from 'sonner';

const Chat = () => {
  const {userInfo} = useAppStore()
  const navigate = useNavigate();
  useEffect(() => {
    if(!userInfo.profileSetup) {
      toast("Please setup profile to cotinue");
      navigate("/profile");
    }
  }, [userInfo,navigate])


  return <div></div>;
};

export default Chat;
