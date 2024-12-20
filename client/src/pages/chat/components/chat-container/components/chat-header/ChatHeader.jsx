import { AvatarImage } from "@/components/ui/avatar";
import { getColors } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constant";
import { Avatar } from "@radix-ui/react-avatar";
import { RiCloseFill } from "react-icons/ri";

const ChatHeader = () => {
  const { closeChat, selectedChatData, selectedChatType } = useAppStore();
  return (
    <div className="h-[10vh] border-b-[1px] border-[#2f303b] flex items-center px-4">
      <div className="flex w-full items-cneter  justify-between">
        <div className="flex gap-3 items-center justify-center">
          <div className="w-12 h-12 relative ">
            {selectedChatType === "contact" ? <Avatar
              className="w-10 h-10 md:w-12
              md:h-12 overflow-hidden "
            >
              {selectedChatData.image ? (
                <AvatarImage
                  src={`${HOST}/${selectedChatData.image}`}
                  alt="profile"
                  className="object-cover rounded-full w-full h-full "
                />
              ) : (
                <div
                  className={`uppercase h-12 w-12 md:w-12 md:h-12 text-xl border border-white flex justify-center items-center rounded-full ${getColors(
                    selectedChatData.color
                  )}`}
                >
                  {selectedChatData.firstName
                    ? selectedChatData.firstName.split("").shift()
                    : selectedChatData.userInfo.email.split("").shift()}
                </div>
              )}
            </Avatar>
             :  <div className="bg-[#ffffff22] h-10 w-10 flex items-center justify-center text-2xl text-center rounded-full">#</div>}
            
          </div>
          <div>
            {selectedChatType === "channel" && selectedChatData.name}
            {selectedChatType === "contact"
              ? `${selectedChatData.firstName} ${selectedChatData.lastName}`
              : selectedChatData.email}
          </div>
        </div>
        <div className="flex items-center justify-center gap-5">
          <button
            className="text-neutral-500 duration-300 transition-all focus:border-none focus:outline-none focus:text-white"
            onClick={closeChat}
          >
            <RiCloseFill className=" text-3xl" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
