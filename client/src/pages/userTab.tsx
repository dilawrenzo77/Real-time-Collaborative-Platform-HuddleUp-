
interface User {
  name: string;
  socketId: string | undefined;
  nickName: string;
  role: string;
  isOnline: boolean;
  lastSeen?: Date;
}

interface UserProps {
    data: User;
}

const UserTab: React.FC<UserProps> = ({ data }) => {
    return (
        <div className="flex items-center justify-center gap-1">
            <svg width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14.5701 2.90203C15.1766 3.03681 15.5591 3.63776 15.4243 4.24429L11.8687 20.2442C11.7339 20.8508 11.133 21.2332 10.5265 21.0984C9.91994 20.9636 9.53751 20.3627 9.6723 19.7562L13.2279 3.75619C13.3626 3.14967 13.9636 2.76725 14.5701 2.90203ZM8.09429 7.20446C8.53365 7.64378 8.53368 8.3561 8.09436 8.79546L4.88978 12.0003L8.09432 15.2049C8.53366 15.6442 8.53366 16.3565 8.09432 16.7959C7.65498 17.2352 6.94267 17.2352 6.50333 16.7959L2.50333 12.7959C2.06401 12.3565 2.06399 11.6443 2.5033 11.2049L6.5033 7.20454C6.94262 6.76518 7.65493 6.76515 8.09429 7.20446ZM17.0034 7.20446C17.4427 6.76515 18.155 6.76518 18.5944 7.20454L22.5944 11.2049C23.0337 11.6443 23.0336 12.3565 22.5943 12.7959L18.5943 16.7959C18.155 17.2352 17.4427 17.2352 17.0033 16.7959C16.564 16.3565 16.564 15.6442 17.0033 15.2049L20.2079 12.0003L17.0033 8.79546C16.564 8.3561 16.564 7.64378 17.0034 7.20446Z" fill="#323544"/>
            </svg>
            <div className="flex items-center justify-center gap-2 bg-neutral-200/50 py-0.5 px-4 rounded-md">
              <img src="/concept-portrait-overstimulated-person.jpg" alt="avatarImage" className="object-cover rounded-full w-6 h-6 border-2 border-purple-300"/>
              <div className=" flex flex-col items-start justify-center gap-0.5">
                <p className="text-xs font-semibold">{data.nickName}</p>
                <div>
                    <p className="text-[0.4rem] font-semibold">{data.role}</p>
                    <p className="text-[0.4rem] font-semibold">{data.lastSeen?.toLocaleTimeString()}</p>
                </div>
              </div>
            </div>
            <div className="bg-green-500 h-2 w-2 rounded-full animate-pulse drop-shadow-2xl shadow-lg shadow-neutral-50"></div>
        </div>
    );
}

export default UserTab;
