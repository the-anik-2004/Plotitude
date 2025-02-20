// import { createContext, useEffect, useState, useContext } from "react";
// import { io } from "socket.io-client";
// import { AuthContext } from "./AuthContext.jsx";

// export const SocketContext = createContext();

// export const SocketContextProvider = ({ children }) => {
//     const [socket, setSocket] = useState(null);
//     const { currentUser } = useContext(AuthContext);

//     useEffect(() => {
//         const socketServerUrl = "https://plotitude-socket.onrender.com";

//         const newSocket = io(socketServerUrl, {
//             transports: ["websocket"], // Use WebSocket transport
//             reconnection: true, // Auto-reconnect if disconnected
//             reconnectionAttempts: 5, // Try reconnecting 5 times
//             reconnectionDelay: 3000, // Wait 3 seconds before retrying
//         });

//         setSocket(newSocket);

//         // return () => {
//         //     newSocket.disconnect();
//         // };
//     }, []);

//     useEffect(() => {
//         if (currentUser && socket) {
//             socket.emit("newUser", currentUser.id);
//         }
//     }, [currentUser, socket]); // ✅ Make sure `socket` is not null before emitting

//     return (
//         <SocketContext.Provider value={{ socket }}>
//             {children}
//         </SocketContext.Provider>
//     );
// };
