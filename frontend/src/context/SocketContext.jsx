import { createContext, useEffect, useState, useContext } from "react";
import { io } from "socket.io-client";
import { AuthContext } from "./AuthContext";

export const SocketContext = createContext();

export const SocketContextProvider = ({ children }) => {
    const [socket, setSocket] = useState(null);
    const { currentUser } = useContext(AuthContext);

    useEffect(() => {
        const socketServerUrl = "https://plotitude-socket.onrender.com";

        const newSocket = io(socketServerUrl, {
            transports: ["websocket"], // Force WebSocket over polling
            reconnection: true, // Enable automatic reconnection
            reconnectionAttempts: 5, // Retry 5 times before failing
            reconnectionDelay: 3000, // Wait 3 seconds between attempts
        });

        setSocket(newSocket);

        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        if (currentUser && socket) {
            socket.emit("newUser", currentUser.id);
        }
    }, [currentUser, socket]);

    return (
        <SocketContext.Provider value={{ socket }}>
            {children}
        </SocketContext.Provider>
    );
};
