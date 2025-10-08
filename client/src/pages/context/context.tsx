import {createContext, useState, useEffect, type ReactNode, useContext, useRef} from "react";
import { io, Socket } from "socket.io-client";
import { jwtDecode } from 'jwt-decode';
import axios from "axios";



interface AuthContextType {
  userData: object | null;
  getUserProfile: () => Promise<object>;
  setUserData: React.Dispatch<React.SetStateAction<object>>;
  isLoading: boolean;
  socket: Socket | null;
  setSocket: React.Dispatch<React.SetStateAction<Socket | null>>;
  logout: () => Promise<void>;
  connectedUsers: User[];
  currentRoomUsers: User[];
  currentUser: User | null;
  rooms: Room[];
}

interface DecodeType {
  name: string;
  email: string;
  role: string;
  nickName: string;
}

interface User {
  name: string;
  socketId: string | undefined;
  nickName: string;
  role: string;
  isOnline: boolean;
  lastSeen?: Date;
}

interface Room {
  name: string;
  users: User[];
  userCount: number;
}


export const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

// Create a custom hook for easier usage
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthContextProvider');
  }
  return context;
};

export const AuthContextProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const HOST = import.meta.env.VITE_URL;
  const [userData, setUserData] = useState<object | null>(null);
  const [connectedUsers, setConnectedUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentRoomUsers, setCurrentRoomUsers] = useState<User[]>([]);
  const [rooms, setRooms] = useState<Room[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [socket, setSocket] = useState<Socket | null>(null);
  const socketRef = useRef<Socket | null>(null);
  

  useEffect(() => {
    const getCookiesOnReload = async () => {
      try {
        const userCookie = localStorage.getItem('userToken');
        console.log(userCookie, "cookies we retrieve from the broweser");

        if (userCookie) {
        const decoded = jwtDecode(userCookie);
        console.log("🔍 Context - decoded:", decoded);
        setUserData(decoded);

        // Create socket only if it doesn't exist
        if (!socketRef.current) {
          const newSocket = io(HOST);
          socketRef.current = newSocket;
          setSocket(newSocket);

          if(newSocket) {
            const newLoggedInUser: User = { 
              name: (decoded as DecodeType).name,
              nickName: (decoded as DecodeType).nickName,
              role: (decoded as DecodeType).role,
              socketId: newSocket.id,
              isOnline: true
             };


            setCurrentUser(newLoggedInUser);

            newSocket.emit('user-authenticated', {
              name: newLoggedInUser.name,
              nickName: newLoggedInUser.nickName,
              role: newLoggedInUser.role
            });

            newSocket.on("connect", () => {
              // Update current user with new socket ID
              setCurrentUser(prev => prev ? { ...prev, socketId: newSocket.id } : null);
            });

            // Listen for users list updates
            newSocket.on("users-list", (users: User[]) => {
              setConnectedUsers(users);
            });

            // Listen for room users updates
            newSocket.on("room-users-update", (roomData: { room: string; users: User[] }) => {
              setCurrentRoomUsers(roomData.users);
              
              // Update rooms list
              setRooms(prev => prev.map(room => 
                room.name === roomData.room 
                  ? { ...room, users: roomData.users, userCount: roomData.users.length }
                  : room
              ));

            });

            // Listen for user joined/left events
            newSocket.on("user-joined", (user: User) => {
              console.log('👋 User joined notification:', user.nickName);
              // setConnectedUsers(prev => {
              //   const exists = prev.find(u => u.nickName === user.nickName);
              //   if (exists) {
              //     return prev.map(u => u.nickName === user.nickName ? { ...user, isOnline: true } : u);
              //   }
              //   return [...prev, { ...user, isOnline: true }];
              // });
            });

            newSocket.on("user-left", (userNickName: string) => {
              setConnectedUsers(prev => 
                prev.map(user => 
                  user.nickName === userNickName ? { ...user, isOnline: false, lastSeen: new Date() } : user
                )
              );
              setCurrentRoomUsers(prev => prev.filter(user => user.nickName !== userNickName));
            });
        } 
        } 
      }     
      } catch (error) {
        console.error("Error reading cookie:", error);
      }finally {
        setIsLoading(false); // Always set loading to false when done
      }

    }
    getCookiesOnReload();
  },[])

  const leaveRoom = (roomName: string) => {
    if (socket) {
      socket.emit('leave-room', roomName);
    }
  };

  
  const logout = async () => {
      try {
        const response = await axios.post("http://localhost:3000/api/logout", {}, {
          withCredentials: true 
        });

        console.log(response.data, "we are logged out");
    
      // Clear socket and local state after successful logout
      if (socket) {
        socket.on("disconnect", () => {
              console.log("Socket disconnected");
              setCurrentUser(prev => prev ? { ...prev, isOnline: false } : null);
            });
      }
      setUserData(null);
      setSocket(null);
      window.location.href = "/";
    
      } catch (error) {
        console.error("Logout failed:", error);
      }
  }

  const getUserProfile = async () => {
    let userProfileData: object = {};
    const email = (currentUser as User)?.nickName;

    try {
      const response = await axios.post("http://localhost:3000/api/profile", email);
      userProfileData = response.data;
    } catch (error) {
      console.error(error, "we encoutered an error getting your profile")
    }

    return userProfileData
  }

  const contextValue = { userData, setUserData, getUserProfile, isLoading, socket, 
                          setSocket, logout,connectedUsers,currentRoomUsers,
                          currentUser,rooms,leaveRoom };
    
    return (<AuthContext.Provider value={contextValue}>{children}</AuthContext.Provider>)
};