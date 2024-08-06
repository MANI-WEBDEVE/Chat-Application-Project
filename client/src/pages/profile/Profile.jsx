import { useNavigate } from "react-router-dom";
import { useAppStore } from "@/store";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { colors, getColors } from "@/lib/utils";
import { FaPlus, FaTrash } from "react-icons/fa";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import apiClient from "@/lib/api-client";
import { UPDATE_PROFILE_ROUTE } from "@/utils/constant";

const Profile = () => {
  const navigate = useNavigate();
  const { userInfo, setUserInfo } = useAppStore();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [image, setImage] = useState(null);
  const [hovered, setHovered] = useState(false);
  const [selectColor, setSelectColor] = useState(0);

  useEffect(() => {
    if (userInfo.profileSetup) {
      setFirstName(userInfo.firstName);
      setLastName(userInfo.lastName);
      setSelectColor(userInfo.selectColor);
    }
  }, [userInfo])


  const validateProfile = () => {
    if (!firstName) {
      toast.error("Please first Name are required");
      return false;
    }
    if (!lastName) {
      toast.error("Please last Name are required");
      return false;
    }
    return true;
  };

  const saveChanges = async () => {
    if (validateProfile()) {
      const response = await apiClient.post(UPDATE_PROFILE_ROUTE,{ firstName, lastName, color:selectColor },
        {withCredentials:true}
      );
      if (response.status === 200 && response.data) {
        setUserInfo({...response.data});
        toast.success("Profile updated successfully");
        navigate('/chat')
      }
    }
  };

  return (
    <div className="bg-[#1b1c24] h-[100vh] flex justify-center items-center gap-10">
      <div className="flex flex-col gap-10 w-[80vw] md:w-max">
        <div>
          <IoArrowBack className="text-white/90 text-4xl lg:text-6xl cursor-pointer " />
        </div>
        <div className="grid grid-cols-2">
          <div
            className="h-full w-32 md:w-48 relative flex items-center justify-center"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            <Avatar
              className="w-32 h-32 md:w-48
             md:h-48 overflow-hidden rounded-s-full"
            >
              {image ? (
                <AvatarImage
                  src={image}
                  alt="profile"
                  className="object-cover w-full h-full "
                />
              ) : (
                <div
                  className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border border-white flex justify-center items-center rounded-full ${getColors(
                    selectColor
                  )}`}
                >
                  {firstName
                    ? firstName.split("").shift()
                    : userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>
            {hovered && (
              <div
                className="absolute lg:inset-0 sm:inset-10 
              
              md:inset-0 min-[342px]:inset-x-1 max-[613px]:inset-y-7 
              min-[614px]:inset-x-1 max-[766px]:inset-y-7
              min-[640px]:inset-x-1 max-[690px]:inset-y-7 
              min-[710px]:inset-x-1 max-[770px]:inset-y-9 
               
              flex items-center justify-center bg-black/50 rounded-full"
              >
                {image ? (
                  <FaTrash className="text-white text-3xl cursor-pointer" />
                ) : (
                  <FaPlus className="text-white text-3xl cursor-pointer" />
                )}
              </div>
            )}
          </div>
          <div className="flex min-x-32 md:min-w-64 flex-col gap-5 text-white items-center justify-center">
            <div className="w-full">
              <Input
                placeholder="Email"
                type="email"
                disbaled={true}
                value={userInfo.email}
                className="bg-[#2c2e3b] border-none rounded-xl p-6"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Fisrt Name"
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="bg-[#2c2e3b] placeholder:opacity-55 border-none rounded-xl p-6"
              />
            </div>
            <div className="w-full">
              <Input
                placeholder="Last Name"
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="bg-[#2c2e3b] placeholder:opacity-55 border-none rounded-xl p-6"
              />
            </div>
            <div className="w-full gap-5 flex justify-center items-center">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className={`${color} h-8 w-8 rounded-full cursor-pointer transition-all   ${
                    selectColor === index ? "outline outline-offset-2" : ""
                  }`}
                  onClick={() => setSelectColor(index)}
                ></div>
              ))}
            </div>
          </div>
        </div>
        <div className="w-full" onClick={saveChanges}>
          <Button className="h-16 w-full bg-purple-700 hover:bg-purple-950 transition-all duration-500 rounded-2xl">
            Save Changes
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
