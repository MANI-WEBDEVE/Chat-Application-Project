import { useAppStore } from "@/store";
import { HOST } from "@/utils/constant.js";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
    const socket = useRef(); // Initialize as null to avoid undefined errors
    const { userInfo } = useAppStore();

    useEffect(() => {
        if (userInfo) {
            // Initialize the socket connection only when userInfo is available
            socket.current = io(HOST, {
                withCredentials: true,
                query: { userId: userInfo.id }
            });

            // Attach the connect event listener
            socket.current.on("connect", () => {
                console.log(`Connected to the socket server`);
            });

            const handleRecieveMessage = (message) => {
                const { selectedChatType, selectedChatData, addMessage,addContactInDMList} = useAppStore.getState()
                if (selectedChatType !== undefined && (selectedChatData._id === message.sender._id || selectedChatData._id === message.recipient._id)) {
                    console.log({ message })
                    addMessage(message)
                    addContactInDMList(message)
                }
            }

            const handleRecieveChannelMessage = (message) => {
                const { selectedChatType, selectedChatData, addMessage, addChannelMessageList } = useAppStore.getState()
                if (selectedChatType !== undefined && selectedChatData._id === message.channelId) {
                    console.log({ message })
                    addMessage(message)
                    addChannelMessageList(message)
                    
                }

            }


            socket.current.on("recieveMessage", handleRecieveMessage)
            socket.current.on("recieve-channel-message", handleRecieveChannelMessage)
            // Clean up the socket connection when the component unmounts or userInfo changes
            return () => {
                if (socket.current) {
                    socket.current.disconnect();
                }
            };
        }

        // If userInfo is not available, ensure socket.current is null
        return () => {
            socket.current = null;
        };
    }, [userInfo]);

    return (
        <SocketContext.Provider value={socket.current}>
            {children}
        </SocketContext.Provider>
    );
};
