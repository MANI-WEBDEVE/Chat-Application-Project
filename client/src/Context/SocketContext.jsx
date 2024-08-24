import { useAppStore } from "@/store";
import { HOST } from "@/utils/constant.js";
import { createContext, useContext, useEffect, useRef } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
    return useContext(SocketContext);
}

export const SocketProvider = ({ children }) => {
    const socket = useRef(null); // Initialize as null to avoid undefined errors
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
