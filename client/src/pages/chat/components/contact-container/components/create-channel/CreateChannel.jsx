import {
  CREATE_CHANNEL_ROUTE,
  GET_ALL_CONTACT_ROUTE,
  HOST,
  SEARCH_CONTACT_ROUTE,
} from "@/utils/constant.js";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useEffect, useState } from "react";
import { FaPlus } from "react-icons/fa";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import apiClient from "@/lib/api-client.js";
import { useAppStore } from "@/store";
import { Button } from "@/components/ui/button";
import MultipleSelector from "@/components/ui/multiSelect";

function CreateChannel() {
  const { setSelectedChatType, setSelectedChatData, addChannel } =
    useAppStore();
  const [newChannelModel, setNewChannelModel] = useState(false);
  const [searchContacts, setSearchContacts] = useState([]);
  const [allContact, setAllContact] = useState([]);
  const [selectContacts, setSelectContacts] = useState([]);
  const [channelName, setChannelName] = useState("");

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await apiClient.get(GET_ALL_CONTACT_ROUTE, {
          withCredentials: true,
        });
        console.log(response.data.contacts);
        setAllContact(response.data.contacts);
      } catch (error) {
        console.log(error.message);
      }
    };
    getData();
  }, []);

  const createChannelHandler = async () => {
    try {
      if (channelName.length > 0 && selectContacts.length > 0) {
        const response = await apiClient.post(
          CREATE_CHANNEL_ROUTE,
          {
            name: channelName,
            members: selectContacts.map((contact) => contact.value),
          },
          { withCredentials: true }
        );
        if(response.status === 201) {
          setChannelName("");
          setSelectContacts([]);
          setNewChannelModel(false);  
          addChannel(response.data.channel)
        }
      }
    } catch (error) {}
  };

  return (
    <>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <FaPlus
              className="text-neutral-400 font-light text-opacity-90 hover:text-neutral-100 cursor-pointer transition-all duration-300"
              onClick={() => setNewChannelModel(true)}
            />
          </TooltipTrigger>
          <TooltipContent className="bg-[#1c1b1e] border-none mb-2 p-3 text-white">
            <p>Create New Channel</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={newChannelModel} onOpenChange={setNewChannelModel}>
        <DialogContent className="bg-[#1c1b1e] border-none text-white w-[400px] h-[400px] flex flex-col ">
          <DialogHeader>
            <DialogTitle>
              Please fill up the details for new channel
            </DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <div>
            <input
              type="text"
              placeholder="Channel Name"
              className=" rounded-[10px] px-6 py-4 bg-[#2c2e3b] border-none focus:outline-none w-full"
              onChange={(e) => setChannelName(e.target.value)}
              value={channelName}
            />
          </div>
          <MultipleSelector
            className="rounded-lg bg-[#2c2e3b] border-none focus:outline-none text-white"
            defaultOptions={allContact}
            placeholder="Search Contact"
            value={selectContacts}
            onChange={setSelectContacts}
            emptyIndicator={
              <p className="text-center text-lg leading-10 text-gray-600">
                no results found.
              </p>
            }
          />
          <div>
            <Button
              onClick={createChannelHandler}
              className="w-full bg-purple-700 hover:bg-purple-900 transition-all duration-300"
            >
              Create Channel
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export default CreateChannel;

// zebra shed dutch return friend thunder boss canal surge forward onion untilzebra shed dutch return friend thunder boss canal surge forward onion until
