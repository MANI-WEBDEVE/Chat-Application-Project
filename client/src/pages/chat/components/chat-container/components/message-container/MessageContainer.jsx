import apiClient from "@/lib/api-client";
import { useAppStore } from "@/store";
import { GET_ALL_MESSAGES, HOST } from "@/utils/constant";
import moment from "moment";
import { useEffect, useRef, useState } from "react";
import { MdFolderZip } from "react-icons/md";
import { IoCloseSharp, IoDownloadOutline } from "react-icons/io5";
import { IoMdArrowRoundDown } from "react-icons/io";
const MessageContainer = () => {
  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState(null);
  const scrollRef = useRef();
  const {
    selectedChatType,
    selectedChatData,
    userInfo,
    setIsDownloading,
    selectedChatMessage,
    setSelectedChatMessage,
    setFileDownloadProgress
  } = useAppStore();

  useEffect(() => {
    const getMessages = async () => {
      try {
        const response = await apiClient.post(
          GET_ALL_MESSAGES,
          { id: selectedChatData._id },
          { withCredentials: true }
        );
        if (response.data.messages) {
          setSelectedChatMessage(response.data.messages);
        }
      } catch (error) {
        console.log(`some one Error: ${error}`);
      }
    };

    if (selectedChatData._id) {
      if (selectedChatType === "contact") getMessages();
    }
  }, [selectedChatData, selectedChatType, setSelectedChatMessage]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedChatMessage]);

  const checkIfImage = (filePath) => {
    const imageRegex =
      /\.(jpg|jpeg|png|webp|avif|gif|svg|jfif|tiff|tif|heif|bmp)$/i;
    return imageRegex.test(filePath);
  };

  const renderMessages = () => {
    let lastDate = null;
    return selectedChatMessage.map((message, index) => {
      const messageData = moment(message.timestamp).format("YYYY-MM-DD");
      const showDate = messageData !== lastDate;
      lastDate = messageData;
      console.log(selectedChatType === "contact");
      return (
        <div key={index}>
          {showDate && (
            <div className="text-center text-gray-500 my-2 ">
              {" "}
              {moment(message.timestamp).format("LL")}{" "}
            </div>
          )}
          {selectedChatType === "contact" && renderDMMessages(message)}
          {selectedChatType === "channel" && renderChannelMessages(message)}
        </div>
      );
    });
  };

  const handleDownload = async (fileUrl) => {
    setIsDownloading(true);
    
    const response = await apiClient.get(`${HOST}/${fileUrl}`, {
      responseType: "blob",
      onDownloadProgress: (ProgressEvent) => {
        const {total, loaded} = ProgressEvent;
        const percentCompeleted = Math.round(loaded * 100 / total);
        setFileDownloadProgress(percentCompeleted);
      }
    });
    const urlBlob = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement("a");
    link.href = urlBlob;
    link.setAttribute("download", fileUrl.split("/").pop());
    link.click();
    link.remove();
    window.URL.revokeObjectURL(urlBlob);
    setIsDownloading(false);
    setFileDownloadProgress(0);
  };

  const renderDMMessages = (message) => {
    console.log(message);
    return (
      <div
        className={`${
          message.sender === selectedChatData._id ? "text-left" : "text-right"
        } overflow-auto`}
      >
        {message.messageType === "text" && (
          <div
            className={`${
              message.sender !== selectedChatData._id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 rounded-xl border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20 rounded-xl"
            } border inline-block p-4 rounded-lg my-1 max-w-[50%] break-words`}
          >
            {message.contact}
          </div>
        )}
        {message.messageType === "file" && (
          <div
            className={`${
              message.sender !== selectedChatData._id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 rounded-xl border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20 rounded-xl"
            } border inline-block p-4 rounded-lg my-1 max-w-[50%] break-words `}
          >
            {checkIfImage(message.fileUrl) ? (
              <div
                className="cursor-pointer"
                onClick={() => {
                  setShowImage(true);
                  setImageUrl(message.fileUrl);
                }}
              >
                <img
                  src={`${HOST}/${message.fileUrl}`}
                  alt="image"
                  height={200}
                  width={200}
                />
              </div>
            ) : (
              <div className="flex items-center justify-center gap-4 ">
                <span className="text-white/80 text-3xl bg-black/20 rounded-full p-3">
                  <MdFolderZip />
                </span>
                <span className="text-white/80">
                  {message.fileUrl.split("/").pop()}
                </span>
                <span
                  className="text-xl p-3 rounded-full bg-black/20 text-white/50 hover:bg-black/50 transition-all duration-300"
                  onClick={() => handleDownload(message.fileUrl)}
                >
                  <IoDownloadOutline />
                </span>
              </div>
            )}
          </div>
        )}
        <div className="text-xs text-gray-600">
          {moment(message.timestamp).format("LT")}
        </div>
      </div>
    );
  };

  const renderChannelMessages = (message) => {
      return (
        <div className={`mt-5 ${message.sender._id !== userInfo._id ? "text-left": "text-right" }`}>
           {message.messageType === "text" && (
          <div
            className={`${
              message.sender._id !== userInfo._id
                ? "bg-[#8417ff]/5 text-[#8417ff]/90 rounded-xl border-[#8417ff]/50"
                : "bg-[#2a2b33]/5 text-white/80 border-[#ffffff]/20 rounded-xl"
            } border inline-block p-4 rounded-lg my-1 max-w-[50%] break-words`}
          >
            {message.contact}
          </div>
        )}
        </div>
      )
  }


  return (
    <div className="flex-1  p-4 px-8 md:w-[65vw] lg:w-[70vw] xl:w-[80vw] w-full message-list  overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800 scrollbar-track-[#1C1D25]">
      {renderMessages()}
      <div ref={scrollRef} />
      {showImage && (
        <div className="h-[100vh] fixed top-0 left-0 z-[1000] w-[100vw] flex itmes-center justify-center backdrop-blur-lg flex-col">
           <div className="flex items-center justify-center  gap-8  mb-2  ">
            <button className="text-2xl p-3 rounded-full bg-black/20 text-white/50 hover:bg-black/50 transition-all duration-300 border-[1px] border-purple-500/80" onClick={() =>handleDownload(imageUrl)}><IoMdArrowRoundDown /></button>
            <button className="text-2xl p-3 rounded-full bg-black/20 text-white/50 hover:bg-black/50 transition-all duration-300 border-[1px] border-purple-500/80" onClick={() => {
              setShowImage(false);
              setImageUrl(null);
            }} ><IoCloseSharp/></button>
          </div>
          <div>
            <img
              src={`${HOST}/${imageUrl}`}
              alt=""
              className="h-[85vh] w-full bg-cover"
            />
          </div>
         
        </div>
      )}
    </div>
  );
};

export default MessageContainer;
