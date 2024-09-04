import apiClient from "@/lib/api-client";
import { useAppStore } from "@/store";
import { GET_ALL_MESSAGES } from "@/utils/constant";
import moment from "moment";
import { useEffect, useRef } from "react";

const MessageContainer = () => {
  const scrollRef = useRef()
  const { selectedChatType, selectedChatData, userInfo, selectedChatMessage,setSelectedChatMessage } = useAppStore()

  useEffect(() => {

    const getMessages = async () => {
      try {
        const response = await apiClient.post(GET_ALL_MESSAGES, {id: selectedChatData._id}, {withCredentials:true})
        if (response.data.messages){
          setSelectedChatMessage(response.data.messages)
        }
      } catch (error) {
        console.log(`some one Error: ${error}`);
        
      }
    }
    console.log(getMessages())

     if (selectedChatData._id){
      if (selectedChatType === "contact")  getMessages()
     }

  }, [selectedChatData, selectedChatType, setSelectedChatMessage])


  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessage])

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessage.map((message, index) => {
      const messageData = moment(message.timestamp).format("YYYY-MM-DD")
      const showDate = messageData !== lastDate;
      lastDate = messageData
      console.log(selectedChatType === 'contact')
      return (
        
          <div key={index}>
            {
               showDate&& (<div className="text-center text-gray-500 my-2 "> {moment(message.timestamp).format("LL")} </div>)}
            {
              selectedChatType === 'contact' && renderDMMessages(message)
            }
          </div>
        
      )

    })
  }

  const renderDMMessages = (message) => {
  console.log(message)
  return <div className={`${message.sender === selectedChatData._id ? "text-left" : "text-right"} overflow-auto`}>
      {
        message.messageType === "text" && (
          <div className={`${message.sender !== selectedChatData._id ? "bg-[#8417ff]/5 text-[#8417ff]/90 rounded-xl border-[#8417ff]/50" : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20 rounded-xl"

            } border inline-block p-4 rounded-lg my-1 max-w-[50%] break-words`}>

            {message.contact}
          </div>
        )
      }
      <div className="text-xs text-gray-600">{moment(message.timestamp).format("LT")}</div>
    </div>
  }

  return <div className="flex-1  p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full message-list  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-[#1C1D25]" >
    {renderMessages()}
    <div ref={scrollRef} />
  </div>;
};

export default MessageContainer;
