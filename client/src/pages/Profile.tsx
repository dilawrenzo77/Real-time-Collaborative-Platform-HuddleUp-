// import { type UserData } from "../types/index";
import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "./context/context";
import { Link } from "react-router-dom";

export interface UserData {
  nickName: string;
  email?: string;
  id?: string;
  name?: string;
  phone?: string;
  role?: string;
  createdAt: string;
}


const Profile = () => {
  const { userData } = useAuth();
  const [userProfile, setUserProfile] = useState<object | null>(null);
  const HOST = process.env.VITE_URL;

useEffect(() => {
  const getUser = async () => {
    try {
      // ✅ Use http (not https) for localhost
      const response = await axios.post(`${HOST}}/api/profile`, {
        userEmail: (userData as UserData).email
      });
      
      setUserProfile(response.data?.user);
      // console.log(response.data?.user, "API response data"); // ✅ Log the response directly
      console.log(userProfile);
      
    } catch (error) {
      console.error("Error fetching user profile:", error);
    }
  };

  // ✅ Only run if userData and email exist
  if (userData && (userData as UserData).email) {
    getUser();
  }
}, [userData]); // ✅ Add userData as dependency
  

  return (
    <div className="flex flex-col items-center jsutify-start gap-5">
      <div className="flex items-center justify-between px-2 md:px-3 lg:px-10 py-1 w-full">
        <p className="gradient-text font-semibold text-md">HuddleUp</p>
        <Link to="/dashboard">
        <div className="flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300">
            <p className="text-sm">Home</p>
            <svg width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path opacity="0.4" d="M13.85 3.70391C13.05 3.10391 11.95 3.10391 11.15 3.70391L4.65 8.57891C4.08344 9.00383 3.75 9.6707 3.75 10.3789V18.5003C3.75 19.743 4.75736 20.7503 6 20.7503H11V17.0003C11 16.1719 11.6716 15.5003 12.5 15.5003C13.3284 15.5003 14 16.1719 14 17.0003V20.7503H19C20.2426 20.7503 21.25 19.743 21.25 18.5003V10.3789C21.25 9.6707 20.9166 9.00383 20.35 8.57891L13.85 3.70391Z" fill="#323544"/>
              <path d="M11 17.0005V20.7505H14V17.0005C14 16.1721 13.3284 15.5005 12.5 15.5005C11.6716 15.5005 11 16.1721 11 17.0005Z" fill="#323544"/>
            </svg>
        </div>
        </Link>
      </div>
      <div className=" flex flex-col items-center justify-start gap-6 md:gap-8 lg:gap-20">
        <div>
          <img src="/concept-portrait-overstimulated-person.jpg" alt="avatarImage" className="object-cover rounded-full w-30 h-30 border-2 border-purple-300"/>
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-center justify-center sm:items-center sm:justify-between w-2xl">
          <div className="space-y-6">
            <div className="bg-neutral-800/50 backdrop-blur-lg rounded-lg px-4 py-2 flex items-center justify-between gap-1w-xs">
              <div className="flex flex-col items-start justify-center gap-2">
                <p className="text-xs">Name</p>
                <p className="text-sm font-semibold md:text-md lg:text-lg">{(userData as UserData).name}</p>
              </div>
              <p className="text-[0.7rem] text-teal-200 hover:text-teal-600 transition-all duration-200">Edit</p>
            </div>
            <div className="bg-neutral-800/50 backdrop-blur-lg rounded-lg px-4 py-2 flex items-center justify-between w-xs">
              <div className="flex flex-col items-start justify-center gap-2">
                <p className="text-xs">Email</p>
                <p className="text-sm font-semibold md:text-md lg:text-lg">{(userData as UserData).email}</p>
              </div>
              <p className="text-[0.7rem] text-teal-200 hover:text-teal-600 transition-all duration-200">Edit</p>
            </div>
          </div>
          <div className="space-y-6">
            <div className="bg-neutral-800/50 backdrop-blur-lg rounded-lg px-4 py-2 flex items-center justify-between w-xs">
              <div className="flex flex-col items-start justify-center gap-2">
                <p className="text-xs">NickName</p>
                <p className="text-sm font-semibold md:text-md lg:text-lg">{(userData as UserData).nickName}</p>
              </div>
              <p className="text-[0.7rem] text-teal-200 hover:text-teal-600 transition-all duration-200">Edit</p>
            </div>
            <div className="bg-neutral-800/50 backdrop-blur-lg rounded-lg px-4 py-2 flex items-center justify-between w-xs">
              <div className="flex flex-col items-start justify-center gap-2">
                <p className="text-xs">Role</p>
                <p className="text-sm font-semibold md:text-md lg:text-lg">{(userData as UserData).role}</p>
              </div>
              <p className="text-[0.7rem] text-teal-200 hover:text-teal-600 transition-all duration-200">Edit</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;