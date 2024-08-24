import { HOST, SEARCH_CONTACT_ROUTE } from "@/utils/constant.js";
import { animationDefaultOption, getColors } from "@/lib/utils";
import Lottie from "react-lottie";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import apiClient from "@/lib/api-client.js";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { useAppStore } from "@/store";

function NewDm() {
  const {setSelectedChatType, setSelectedChatData} = useAppStore()
  const [openNewContactModel, setOpenNewContactModel] = useState(false);
  const [searchContacts, setSearchContacts] = useState([]);

  const searchContact = async (searchTerm) => {
    try {
      if (searchTerm.length > 0) {
        const response = await apiClient.post(
          SEARCH_CONTACT_ROUTE,
          { searchTerm },
          { withCredentials: true }
        );

        if (response.status === 200 && response.data.contacts) {
          setSearchContacts(response.data.contacts);
        } else {
          setSearchContacts([]);
        }
      }
    } catch (error) {}
  };

  const selectNewContact = (contact) => {
    setOpenNewContactModel(false);
    setSelectedChatType("contact");
    setSelectedChatData(contact)
    setSearchContacts([])
  }


  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setOpenNewContactModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            <p>Select New Contact</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={openNewContactModel} onOpenChange={setOpenNewContactModel}>
        <DialogContent className="bg-[#1c1b1e] border-none text-white w-[400px] h-[400px] flex flex-col ">
          <DialogHeader>
            <DialogTitle>Please select a Contact</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <input
              type="text"
              placeholder="Search Contacts"
              className=" rounded-[10px] px-6 py-4 bg-[#2c2e3b] border-none focus:outline-none w-full"
              onChange={(e) => searchContact(e.target.value)}
            />
          </div>
          {searchContacts.length > 0 && (
             <ScrollArea className="h-[260px]">
             <div className="flex flex-col gap-3">
               {searchContacts.map((contact) => (
                 <div
                   key={contact._id}
                   className="flex gap-2 items-center cursor-pointer"
                   onClick={() => selectNewContact(contact)}
                 >
                   <div className="w-12 h-12 relative ">
                     <Avatar
                       className="w-10 h-10 md:w-12
              md:h-12 overflow-hidden rounded-s-full"
                     >
                       {contact.image ? (
                         <AvatarImage
                           src={`${HOST}/${contact.image}`}
                           alt="profile"
                           className="object-cover w-full h-full "
                         />
                       ) : (
                         <div
                           className={`uppercase h-32 w-32 md:w-48 md:h-48 text-5xl border border-white flex justify-center items-center rounded-full ${getColors(
                             contact.color
                           )}`}
                         >
                           {contact.firstName
                             ? contact.firstName.split("").shift()
                             : contact.userInfo.email.split("").shift()}
                         </div>
                       )}
                     </Avatar>
                   </div>
                   <div className="flex flex-col ">
                     <span>
                       {contact.firstName && contact.lastName
                         ? `${contact.firstName} ${contact.lastName}`
                         : ""}
                     </span> 
                     <span className="text-xs font-thin ">{contact.email}</span>
                   </div>
                 </div>
               ))}
             </div>
           </ScrollArea>
          )}
         
          {searchContacts.length <= 0 && (
            <div className=" flex-1 md:bg-[#1c1d25] flex flex-col justify-center items-center  duration-1000 transition-all rounded-[10px]">
              <Lottie
                isClickToPauseDisabled={true}
                height={100}
                width={100}
                options={animationDefaultOption}
              />
              <div className="text-opacity-80 text-white flex flex-col  items-center mt-3 lg:text-2xl text-2xl transition-all duration-300 text-center tracking-tighter">
                <h3 className="poppins-medium">
                  HI<span className="text-purple-800">! </span>Search new{" "}
                  <span className="text-purple-800">Contact </span>
                </h3>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

export default NewDm;

// zebra shed dutch return friend thunder boss canal surge forward onion untilzebra shed dutch return friend thunder boss canal surge forward onion until
