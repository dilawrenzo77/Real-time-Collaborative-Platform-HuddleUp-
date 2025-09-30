import { Link } from "react-router-dom";


const Error = () => {
    return (
        <div className="flex flex-col items-center justify-start gap-7">
            <div className="flex items-center justify-between w-full px-4 py-2">
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
            <div className="flex flex-col items-center justify-start gap-10">
                <svg width="150" height="150" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path opacity="0.4" d="M11.25 2C10.0074 2 9 3.00736 9 4.25V6.1285C9.12064 6.20925 9.2352 6.30292 9.34172 6.40952L10.5 7.56853V4.25C10.5 3.83579 10.8358 3.5 11.25 3.5H17.25C17.6642 3.5 18 3.83579 18 4.25V19.75C18 20.1642 17.6642 20.5 17.25 20.5H11.25C10.8358 20.5 10.5 20.1642 10.5 19.75V16.4314L9.34178 17.5904C9.23524 17.697 9.12066 17.7907 9 17.8715V19.75C9 20.9926 10.0074 22 11.25 22H17.25C18.4926 22 19.5 20.9926 19.5 19.75V4.25C19.5 3.00736 18.4926 2 17.25 2H11.25Z" fill="#323544"/>
                <path d="M7.21971 15.4699L9.93766 12.75L4 12.75C3.58579 12.75 3.25 12.4142 3.25 12C3.25 11.5858 3.58579 11.25 4 11.25L9.93784 11.25L7.21973 8.53016C6.92693 8.23718 6.92708 7.7623 7.22007 7.4695C7.51305 7.1767 7.98793 7.17685 8.28073 7.46984L12.2442 11.4359C12.401 11.5733 12.5 11.7751 12.5 12C12.5 12.2259 12.4002 12.4284 12.2422 12.5659L8.28075 16.5301C7.98796 16.8231 7.51308 16.8233 7.22009 16.5305C6.92709 16.2377 6.92692 15.7629 7.21971 15.4699Z" fill="#323544"/>
                </svg>
                <p className="text-2xl font-semibold">Page Not Found</p>
            </div>
        </div>
    );
}

export default Error;
