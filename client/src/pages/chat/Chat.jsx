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


  return <div>
    <h1>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Voluptatem impedit nisi eligendi dicta amet a porro consectetur blanditiis totam, quae, deleniti atque tenetur.</h1>
  </div>;
};

export default Chat;
