import { useParams } from "react-router-dom";
import { useAuth } from "./context/context";
import { useEffect, useRef, useState } from "react";
import type { DependencyList } from 'react';
import { Link } from "react-router-dom";
import UserTab from "./userTab";


interface messageDataType  {
    room: string | undefined;
    author: string | null;
    message: string;
    time: string;
    status: boolean;
}
interface UserData {
  nickName: string;
  email?: string;
  id?: string;
  name?: string;
}
// interface User {
//   name: string;
//   socketId: string | undefined;
//   nickName: string;
//   role: string;
//   isOnline: boolean;
//   lastSeen?: Date;
// }





function useAutoScroll(dependencies: DependencyList = []): React.RefObject<HTMLDivElement | null> {
    const scrollRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTo({
                top: scrollRef.current.scrollHeight,
                behavior: 'smooth'
            });
        }
    }, dependencies);

    return scrollRef;
}


const Chat = () => {
  const { roomId } = useParams();
  const { userData, socket, logout, currentRoomUsers } = useAuth();
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState<any[]>([]);
  const [notification, setNotification] = useState<any[]>([]);
  const [hours, setHours] = useState<number>();
  // Filter messages for current room
  const currentRoomMessages = messageList.filter(msg => msg.room === roomId);
            
    

  useEffect(() => {
    try {
      const joinAutoGroup = async () =>  {
        // Ensure we're joined to the room before sending
        if (socket) {
            // Join room if not already joined
            socket.emit("JoinChat", roomId);


            // Listen for message history when joining
            socket.on('room-history', (data) => {
                // console.log(`Received ${data.messages.length} messages for room ${data.roomId}`);
                setMessageList(data.messages);
            });
            
            // Small delay to ensure room join completes
            await new Promise(resolve => setTimeout(resolve, 50));
        }

      }
      joinAutoGroup()
    } catch (error) {
      console.log("error joining group");
    }
  }, [])
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();


    if(message !== ""){
      const messageData: messageDataType = {
        room: roomId,
        author: (userData as UserData)?.nickName,
        message: message,
        time: new Date(Date.now()).getHours() + ":" + new Date(Date.now()).getMinutes(),
        status: true
      }
      setHours(new Date(Date.now()).getHours());

      await socket?.emit("sentChat", messageData);
      // setMessageList((list) => [...list, messageData]);
      setMessage("");
    }
  }

  useEffect(() => {
    socket?.on("recieveChat", (chatData) => {
      setMessageList((list) => [...list, chatData]);
    });

  }, [socket]);

 useEffect(() => {
    if (!socket) return;

    const handleUserLeft = (data: any) => {
        setNotification((list) => [...list, {
            id: Date.now() + Math.random().toString(36),
            type: 'user-left',
            message: data.message || `User ${data.userId} left the room`,
            userId: data.userId,
            roomId: data.roomId,
            timestamp: data.timestamp
        }]);
    };

    const handleLeftRoomSuccess = (data: any) => {
        setNotification((list) => [...list, {
            id: Date.now() + Math.random().toString(36),
            type: 'you-left',
            message: data.message || `You left the room`,
            roomId: data.roomId,
            timestamp: data.timestamp
        }]);
        
        setTimeout(() => {
            // console.log('Navigating to dashboard...');
            window.location.href = "/dashboard";
        }, 2000);
    };

    socket.on('user-left', handleUserLeft);
    socket.on('left-room-success', handleLeftRoomSuccess);


    return () => {
        socket.off('user-left', handleUserLeft);
        socket.off('left-room-success', handleLeftRoomSuccess);
        socket.off('any');
    };
}, [socket]);

  // Auto-remove notifications after delay
  useEffect(() => {
      if (notification.length > 0) {
          const timer = setTimeout(() => {
              setNotification(prev => prev.slice(1)); // Remove oldest notification
          }, 3000); // Remove after 3 seconds
          
          return () => clearTimeout(timer);
      }
  }, [notification]);


  useEffect(() => {
    const loadMessages = () => {
        try {
            if (roomId) {
                // Store messages by room ID
                const savedMessages = localStorage.getItem(`chatMessages_${roomId}`);
                if (savedMessages) {
                    const parsedMessages = JSON.parse(savedMessages);
                    setMessageList(Array.isArray(parsedMessages) ? parsedMessages : []);
                    // console.log(`Loaded ${parsedMessages.length} messages for room ${roomId}`);
                } else {
                    // No messages for this room yet
                    setMessageList([]);
                }
            }
        } catch (error) {
            console.error('Failed to load messages from storage:', error);
            // Clear corrupted data for this specific room
            localStorage.removeItem(`chatMessages_${roomId}`);
            setMessageList([]);
        }
    };

    loadMessages();
  }, [roomId]); //Add roomId dependency


  // Save messages with error handling and size limit 
useEffect(() => {
    const saveMessages = () => {
        try {
            if (roomId && messageList.length > 0) {
                //Store messages by room ID and limit size
                const messagesToSave = messageList.slice(-1000); // Keep last 1000 messages per room
                localStorage.setItem(`chatMessages_${roomId}`, JSON.stringify(messagesToSave));
            }
        } catch (error) {
            console.error('Failed to save messages to storage:', error);
        }
    };

    saveMessages();
  }, [messageList, roomId]); //Add roomId dependency
  

  // Clear messages function
  // const clearMessages = () => {
  //   setMessageList([]);
  //   localStorage.removeItem('chatMessages');
  // };

  const leaveRoom = async () => {
    if (socket && roomId) {
      socket?.emit('leaveRoom', { roomId: roomId });
    }
  }


  const scrollRef = useAutoScroll([messageList]);

  return (
    <section className="flex flex-col items-center justify-start gap-2 h-[100vh] sm:flex-row">
      <div className="bg-black/20 backdrop-blur-lg px-2 py-1 w-full sm:w-55 mx-auto h-[90vh] sm:ml-2 flex flex-col items-center justify-start gap-1 sm:gap-4 rounded-sm">
        <div className="mx-auto">
          <p className="text-xl font-semibold gradient-text">Huddle Up</p>
        </div>
        <div className="flex items-center justify-start sm:flex-col sm:items-start sm:justify-start gap-3 w-full">
          <Link to="/dashboard">
          <div className="flex items-center justify-center gap-1 hover:scale-105 transition-all duration-300 cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M3.25 15.5C3.25 14.2574 4.25736 13.25 5.5 13.25H9C10.2426 13.25 11.25 14.2574 11.25 15.5V19C11.25 20.2426 10.2426 21.25 9 21.25H5.5C4.25736 21.25 3.25 20.2426 3.25 19V15.5Z" fill="#323544"/>
              <path d="M12.75 6C12.75 4.75736 13.7574 3.75 15 3.75H18.5C19.7426 3.75 20.75 4.75736 20.75 6V9.49998C20.75 10.7426 19.7426 11.75 18.5 11.75H15C13.7574 11.75 12.75 10.7426 12.75 9.49998V6Z" fill="#323544"/>
              <g opacity="0.4">
              <path d="M3.25 6C3.25 4.75736 4.25736 3.75 5.5 3.75H9C10.2426 3.75 11.25 4.75736 11.25 6V9.49998C11.25 10.7426 10.2426 11.75 9 11.75H5.5C4.25736 11.75 3.25 10.7426 3.25 9.49998V6Z" fill="#323544"/>
              <path d="M12.75 15.5C12.75 14.2574 13.7574 13.25 15 13.25H18.5C19.7426 13.25 20.75 14.2574 20.75 15.5V19C20.75 20.2426 19.7426 21.25 18.5 21.25H15C13.7574 21.25 12.75 20.2426 12.75 19V15.5Z" fill="#323544"/>
              </g>
            </svg>
            <p className="text-sm lg:text-md">Dashboard</p>
          </div>
          </Link>
          <Link to="/notifications">
          <div className="flex items-center justify-center gap-1 hover:scale-105 transition-all duration-300 cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.4" d="M12.7516 3.50098C12.7516 3.08676 12.4158 2.75098 12.0016 2.75098C11.5874 2.75098 11.2516 3.08676 11.2516 3.50098V4.28801C7.46161 4.6643 4.5016 7.86197 4.5016 11.751V14.865L3.80936 16.7109C3.25776 18.1819 4.34514 19.751 5.9161 19.751H18.0871C19.658 19.7509 20.7454 18.1819 20.1938 16.7109L19.5016 14.865V11.751C19.5016 7.86197 16.5416 4.6643 12.7516 4.28801V3.50098Z" fill="#323544"/>
              <path d="M14.8736 20.751H9.12622C9.55878 21.918 10.6824 22.7495 11.9999 22.7495C13.3175 22.7495 14.4411 21.918 14.8736 20.751Z" fill="#323544"/>
            </svg>
            <p className="text-sm lg:text-md">Notification</p>
          </div>
          </Link>
          <Link to="/about">
          <div className="invisible sm:visible flex items-center justify-center gap-1 hover:scale-105 transition-all duration-300 cursor-pointer">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.4" d="M6.75 2C5.50736 2 4.5 3.00736 4.5 4.25V19C4.5 20.6569 5.84315 22 7.5 22H18.75C19.1642 22 19.5 21.6642 19.5 21.25C19.5 20.8358 19.1642 20.5 18.75 20.5H18V17.5H18.75C19.1642 17.5 19.5 17.1642 19.5 16.75V4.25C19.5 3.00736 18.4926 2 17.25 2H6.75ZM7.5 20.5C6.67157 20.5 6 19.8284 6 19C6 18.1716 6.67157 17.5 7.5 17.5H16.5V20.5H7.5ZM8.625 5.375H15.375C15.7892 5.375 16.125 5.71079 16.125 6.125V9.375C16.125 9.78921 15.7892 10.125 15.375 10.125H8.625C8.21079 10.125 7.875 9.78921 7.875 9.375V6.125C7.875 5.71079 8.21079 5.375 8.625 5.375Z" fill="#323544"/>
              <path d="M7.875 6.125C7.875 5.71079 8.21079 5.375 8.625 5.375H15.375C15.7892 5.375 16.125 5.71079 16.125 6.125V9.375C16.125 9.78921 15.7892 10.125 15.375 10.125H8.625C8.21079 10.125 7.875 9.78921 7.875 9.375V6.125Z" fill="#323544"/>
            </svg>
            <p className="text-sm lg:text-md">About HuddleUp</p>
          </div>
          </Link>
        </div>
        <div className="flex sm:flex-col items-center sm:items-start justify-start gap-3 w-full bg-neutral-500/70 p-1 rounded-sm grow overflow-y-scroll hide-scrollbar">
          <span className="font-semibold text-md">{roomId}:  <span className="font-semibold text-green-700">{currentRoomUsers.length}</span></span>
          {currentRoomUsers.length === 0 ? <p className="text-sm capitalize font-semibold text-black/50 text-center mx-auto">No user in the group</p> : currentRoomUsers.map((user, i) => <UserTab  key={i} data={user}/> )}
        </div>
        <div className="flex items-center justify-center gap-2">
          <div className="flex items-center justify-center gap-1 border-2 border-neutral-800 rounded-full px-1.5 lg:px-3 sm:py-1 hover:scale-105 transition-all duration-300 cursor-pointer" onClick={leaveRoom}>
            <p className="text-sm lg:text-md text-center">Exit</p>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:scale-105">
              <path d="M13.4053 6.28033C13.6982 5.98744 13.6982 5.51256 13.4053 5.21967C13.1124 4.92678 12.6376 4.92678 12.3447 5.21967L6.09467 11.4697C5.80178 11.7626 5.80178 12.2374 6.09467 12.5303L12.3447 18.7803C12.6376 19.0732 13.1124 19.0732 13.4053 18.7803C13.6982 18.4874 13.6982 18.0126 13.4053 17.7197L7.68566 12L13.4053 6.28033Z" fill="#323544"/>
              <path opacity="0.4" d="M17.9053 6.28033C18.1982 5.98744 18.1982 5.51256 17.9053 5.21967C17.6124 4.92678 17.1376 4.92678 16.8447 5.21967L10.5947 11.4697C10.3018 11.7626 10.3018 12.2374 10.5947 12.5303L16.8447 18.7803C17.1376 19.0732 17.6124 19.0732 17.9053 18.7803C18.1982 18.4874 18.1982 18.0126 17.9053 17.7197L12.1857 12L17.9053 6.28033Z" fill="#323544"/>
            </svg>
          </div>
          <div className="flex items-center justify-center gap-1 border-2 border-neutral-800 rounded-full px-1.5 lg:px-3 sm:py-1 hover:scale-105 transition-all duration-300 cursor-pointer" onClick={logout}>
            <p className="text-sm lg:text-md text-center">LogOut</p>
            <svg width="18" height="18" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg" className="md:scale-105">
              <path d="M11.25 2.62451C10.0074 2.62451 9 3.63187 9 4.87451V6.60927C9.76128 6.98704 10.2493 7.76589 10.2493 8.62451V10.3745L11.75 10.3745C12.9926 10.3745 14 11.3819 14 12.6245C14 13.8672 12.9926 14.8745 11.75 14.8745H10.2493V16.6245C10.2493 17.4831 9.76128 18.262 9 18.6397V20.3745C9 21.6172 10.0074 22.6245 11.25 22.6245H17.25C18.4926 22.6245 19.5 21.6172 19.5 20.3745V4.87451C19.5 3.63187 18.4926 2.62451 17.25 2.62451H11.25Z" fill="#323544"/>
              <path d="M8.28618 7.93158C8.5665 8.04764 8.74928 8.32114 8.74928 8.62453L8.74928 11.8745L11.75 11.8745C12.1642 11.8745 12.5 12.2103 12.5 12.6245C12.5 13.0387 12.1642 13.3745 11.75 13.3745L8.74928 13.3745V16.6245C8.74928 16.9279 8.56649 17.2014 8.28617 17.3175C8.00585 17.4335 7.68322 17.3693 7.46877 17.1547L3.50385 13.187C3.34818 13.0496 3.25 12.8485 3.25 12.6245C3.25 12.4016 3.34723 12.2015 3.50159 12.0641L7.46878 8.09437C7.68324 7.87978 8.00587 7.81552 8.28618 7.93158Z" fill="#323544"/>
            </svg>
          </div>
        </div>
      </div>
      <div className="bg-black/20 backdrop-blur-lg w-[100vw] grow h-[90%] space-y-2 mr-2 px-1 rounded-sm mx-auto">
        <div className="w-full flex justify-between items-center gap-4 mt-1.5 md:mt-2 lg:mt-3 px-1">
          <div className="flex items-center justify-center gap-2">
            <img src="../../public/concept-portrait-overstimulated-person.jpg" alt="avatarImage" className="object-cover rounded-full w-6 h-6 border-2 border-black"/>
            <p className="text-sm lg:text-md bg-neutral-200/50 p-1 lg:p-2.5 lg:px-3 rounded-md">Hi, <span className="font-semibold md:text-lg lg:text-xl">{(userData as UserData).nickName}</span></p>
          </div>
          <Link to="/profile">
            <div className=" bg-black rounded-full px-4 lg:px-5 py-1 md:py-1.5 lg:py-2 hover:scale-95 transition-all duration-300">
              <p className="text-white text-sm md:text-md lg:text-lg font-semibold">View Profile</p>
            </div>
          </Link>
        </div>
        <div className="flex flex-col items-center justify-start gap-2">
          <div  ref={scrollRef}  className="bg-gray-100 rounded-sm w-full flex flex-col items-start justify-start gap-1 px-0.5 py-1 overflow-y-scroll hide-scrollbar h-[65vh]">
            {notification.map((note, index) => (
              <div key={note.id || index} className={`rounded-full px-5 py-1 mb-2 transition-all duration-300 ${note.type === 'you-left' ? 'bg-red-400/80' : 'bg-amber-400/50'}`}>
                <p className="text-neutral-800 text-xs italic text-center">
                  {note.message || `User ${note.userId} has left the room`}
                </p>
                {note.timestamp && (
                <p className="text-[0.5rem] text-neutral-600 text-center">
                {new Date(note.timestamp).toLocaleTimeString()}
                </p>
                )}
              </div>
            ))}
            {currentRoomMessages.map((messageContent, i) => 
            messageContent.author === (userData as UserData).nickName
            ?
            <div key={i} className="ml-auto">
              <div className="bg-teal-400 rounded-md px-2 lg:px-4 py-1.5 max-w-lg"><p className="text-sm md:text-lg lg:text-xl break-words whitespace-normal">{messageContent.message}</p></div>
              <div className="flex items-center justify-end gap-1 md:gap-3 mr-1">
                <p className="text-[0.5rem] md:text-sm lg:text-md text-neutral-600">{messageContent.author}</p>
                <div className="flex items-center justify-end gap-0.5">
                  <p className="text-[0.5rem] md:text-xs lg:text-sm text-neutral-400">{messageContent.time}</p>
                  <p className="text-[0.5rem] md:text-xs lg:text-sm text-neutral-400">{(hours as number) >= 12 ? "PM" : "AM" }</p>
                </div>
              </div>
            </div> 
            :
            <div key={i}>
              <div className="bg-amber-400 rounded-md px-2 lg:px-4 py-1.5 max-w-sm"><p className="text-sm md:text-lg lg:text-xl break-words whitespace-normal">{messageContent.message}</p></div>
              <div className="flex items-center justify-start gap-1 md:gap-3 ml-1">
                <p className="text-[0.5rem] md:text-sm lg:text-md text-neutral-600">{messageContent.author}</p>
                <div className="flex items-center justify-start gap-0.5">
                  <p className="text-[0.5rem] md:text-xs lg:text-sm text-neutral-400">{messageContent.time}</p>
                  <p className="text-[0.5rem] md:text-xs lg:text-sm text-neutral-400">{(hours as number) >= 12 ? "PM" : "AM" }</p>
                </div>
              </div>
            </div>
            )}

          </div>
          <form className="flex items-center justify-between gap-1 bg-neutral-200/50 rounded-lg py-1 px-1 w-full" onSubmit={handleSubmit}>
            <input type="text" className="appearance-none outline-none border-none bg-transparent w-full text-xs md:text-md lg:text-lg md:h-7 lg:h-10" placeholder="write here" value={message} onChange={(event) => setMessage(event.target.value)}/>
            <button className="mr-2">
            <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="hover:opacity-50 transition-all duration-300 lg:scale-200">
            <path d="M21.5127 5.77444C22.1665 3.97839 20.4248 2.23663 18.6287 2.89049L4.63167 7.98618C2.69138 8.69256 2.64771 11.4209 4.56441 12.189L9.72779 14.2582C9.91801 14.3344 10.0687 14.4851 10.145 14.6754L12.2142 19.8387C12.9823 21.7554 15.7106 21.7118 16.417 19.7715L21.5127 5.77444Z" fill="#323544"/>
            </svg>
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Chat;