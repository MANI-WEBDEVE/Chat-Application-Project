import { useNavigate } from "react-router-dom";
// import { AvatarImage } from "@/components/ui/avatar"
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { getColors } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST, LOGOUT_ROUTE } from "@/utils/constant";
import { useState } from "react";
import { FiEdit2 } from "react-icons/fi";
import {  IoPowerSharp } from "react-icons/io5"
import apiClient from "@/lib/api-client";
import { toast } from "sonner";
// import { Avatar } from "@radix-ui/react-avatar"

function ProfileInfo() {
  const { userInfo, setUserInfo } = useAppStore();
  const [selectColor, setSelectColor] = useState(0);
  const navigate = useNavigate();


  const logOut = async() => {
    try {
        let response = await apiClient.post(LOGOUT_ROUTE,{}, {withCredentials:true})
        console.log(response)
        if(response.status === 200){
            toast.success("Logged out successfully ✔")
            setUserInfo(null)
            navigate("/auth")
        }    
    } catch (error) {
        console.log({error})
    }
    
  }

  return (
    <div className="absolute bottom-0 h-16 flex items-center justify-between px-10 w-full bg-[#2a2b33]">
      <div className="flex gap-3 items-center justify-center ">
        <div className="relative w-12 h-12">
          <Avatar
            className="w-12 h-12 md:w-18
             md:h-18 overflow-hidden rounded-full border-[2px]  border-purple-800"
          >
            {userInfo.image ? (
              <AvatarImage
                src={`${HOST}/${userInfo.image}`}
                alt="profile"
                className="object-cover w-full h-full  "
              />
            ) : (
              <div
                className={`uppercase h-12 w-12 md:w-18 md:h-18 text-lg border border-white flex justify-center items-center rounded-full ${getColors(
                 userInfo.color
                )}`}
              >
                {userInfo.firstName
                  ? userInfo.firstName.split("").shift()
                  : userInfo.email.split("").shift()}
              </div>
            )}
          </Avatar>
        </div>
        <div className="tracking-tighter pr-1">
          {userInfo.firstName && userInfo.lastName
            ? `${userInfo.firstName
                .split("")
                .shift()
                .toUpperCase()}${userInfo.firstName.slice(1)} ${ userInfo.lastName.replace(/\s+/g, '').length >= 4 ?  userInfo.lastName: "" }`
            : ""}
        </div>
      </div>
      <div className="flex gap-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <FiEdit2
                className="text-purple-600 text-xl font-medium"
                onClick={() => navigate("/profile")}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>Edit Profile</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger>
              <IoPowerSharp
                className="text-red-700 text-xl font-medium"
                onClick={logOut}
              />
            </TooltipTrigger>
            <TooltipContent>
              <p>LogOut</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>
    </div>
  );
}

export default ProfileInfo;
