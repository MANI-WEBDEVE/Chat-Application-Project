import { getColors } from "@/lib/utils";
import { useAppStore } from "@/store";
import { HOST } from "@/utils/constant";
import { Avatar, AvatarImage } from "@radix-ui/react-avatar";
import React from "react";

function Contacts({ contacts, isChannel = false }) {
  const {
    selectedChatData,
    setSelectedChatData,
    selectedChatType,
    setSelectedChatType,
    setSelectedChatMessage,
  } = useAppStore();

  const handleClick = (contact) => {
    if (isChannel) setSelectedChatType("channel");
    else setSelectedChatType("contact");
    setSelectedChatData(contact);
    if (selectedChatData && selectedChatData._id !== contact._id) {
      setSelectedChatMessage([]);
    }
  };
  console.log("Contacts component received:", { contacts, isChannel });
  if (!contacts || contacts.length === 0) {
    return (
      <div className="text-neutral-400 text-center mt-4">
        No contacts available
      </div>
    );
  }

  return (
    <div className="mt-4">
      {contacts?.map((contact) => {
        console.log("Rendering contact:", contact);
        return (
          <div
            key={contact._id}
            className={`pl-10 py-2 transition-all duration-500 cursor-pointer ${
              selectedChatData && selectedChatData._id === contact._id
                ? "bg-[#8147ff] hover:bg-[#8417ff]"
                : "hover:bg-[#2a2b33] hover:text-white"
            } `}
            onClick={() => handleClick(contact)}
          >
            <div className="flex gap-3 items-center text-neutral-300">
              {!isChannel && (
                <Avatar
                  className="w-10 h-10 md:w-12
              md:h-12 overflow-hidden "
                >
                  {contact.image ? (
                    <AvatarImage
                      src={`${HOST}/${contact.image}`}
                      alt="profile"
                      className="object-cover rounded-full w-full h-full "
                    />
                  ) : (
                    <div
                      className={`${
                        selectedChatData && selectedChatData._id === contact._id
                          ? "bg-[#8147ff] hover:bg-[#8417ff] border border-slate-600"
                          : getColors(contact.color)
                      } uppercase h-10 w-10 md:w-10 md:h-10 text-xl border border-white flex justify-center items-center rounded-full `}
                    >
                      {contact.firstName
                        ? contact.firstName.split("").shift()
                        : contact.userInfo.email.split("").shift()}
                    </div>
                  )}
                </Avatar>
              )}
              {contact.firstName} 
            </div>
            <span>{isChannel && contact.name}</span>

          </div>
        );
      })}
      
    </div>
  );
}

export default Contacts;
