import { Link } from "react-router-dom";


const Contacts = () => {
    return (
        <div className="flex flex-col items-center justify-start gap-3">
            <div className="flex items-center justify-between w-full px-4 py-2">
                <p className="gradient-text font-semibold text-md lg:text-lg">HuddleUp</p>
                <Link to="/dashboard">
                    <div className="flex items-center justify-center gap-2 hover:scale-105 transition-all duration-300">
                        <p className="text-sm lg:text-lg">Home</p>
                        <svg width="20" height="20" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path opacity="0.4" d="M13.85 3.70391C13.05 3.10391 11.95 3.10391 11.15 3.70391L4.65 8.57891C4.08344 9.00383 3.75 9.6707 3.75 10.3789V18.5003C3.75 19.743 4.75736 20.7503 6 20.7503H11V17.0003C11 16.1719 11.6716 15.5003 12.5 15.5003C13.3284 15.5003 14 16.1719 14 17.0003V20.7503H19C20.2426 20.7503 21.25 19.743 21.25 18.5003V10.3789C21.25 9.6707 20.9166 9.00383 20.35 8.57891L13.85 3.70391Z" fill="#323544"/>
                            <path d="M11 17.0005V20.7505H14V17.0005C14 16.1721 13.3284 15.5005 12.5 15.5005C11.6716 15.5005 11 16.1721 11 17.0005Z" fill="#323544"/>
                        </svg>
                    </div>
                </Link>
            </div>
            <div className="flex flex-col items-center justify-start ">
                <p className="text-lg font-semibold">Contacts</p>
                <div className="space-y-3">
                    <div className="bg-neutral-800/50 backdrop-blur-lg rounded-lg px-4 py-2 flex items-center justify-between w-xs hover:scale-110 transition-all duration-300">
                        <div className="flex flex-col items-start justify-center gap-2">
                        <p className="text-xs">Email</p>
                        <p className="text-sm font-semibold">mbatalawrence@gmail.com</p>
                        </div>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M2 12.5C2 6.97766 6.47729 2.50098 11.9996 2.50098C17.5218 2.50098 21.9991 6.97766 21.9991 12.5C21.9991 18.0224 17.5218 22.4991 11.9996 22.4991C6.47729 22.4991 2 18.0224 2 12.5ZM12.5016 9.15521C12.2213 9.27126 12.0385 9.54477 12.0385 9.84817L12.0385 11.749L8.55957 11.749C8.14536 11.749 7.80957 12.0847 7.80957 12.499C7.80957 12.9132 8.14536 13.249 8.55957 13.249H12.0385V15.152C12.0385 15.4554 12.2213 15.7289 12.5016 15.8449C12.7819 15.961 13.1046 15.8967 13.319 15.6821L15.9572 13.0423C16.1007 12.9057 16.1902 12.7128 16.1902 12.499C16.1902 12.2725 16.0898 12.0694 15.9311 11.9319L13.319 9.31802C13.1046 9.10342 12.782 9.03915 12.5016 9.15521Z" fill="#323544"/>
                        </svg>
                    </div>
                    <div className="bg-neutral-800/50 backdrop-blur-lg rounded-lg px-4 py-2 flex items-center justify-between w-xs hover:scale-110 transition-all duration-300">
                        <div className="flex flex-col items-start justify-center gap-2">
                        <p className="text-xs">Github</p>
                        <Link to="https://github.com/dilawrenzo77?tab=repositories">
                        <p className="text-sm font-semibold">https://github.com/dilawrenzo77?tab=repositories</p>
                        </Link>
                        </div>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 12.5C2 6.97766 6.47729 2.50098 11.9996 2.50098C17.5218 2.50098 21.9991 6.97766 21.9991 12.5C21.9991 18.0224 17.5218 22.4991 11.9996 22.4991C6.47729 22.4991 2 18.0224 2 12.5ZM12.5016 9.15521C12.2213 9.27126 12.0385 9.54477 12.0385 9.84817L12.0385 11.749L8.55957 11.749C8.14536 11.749 7.80957 12.0847 7.80957 12.499C7.80957 12.9132 8.14536 13.249 8.55957 13.249H12.0385V15.152C12.0385 15.4554 12.2213 15.7289 12.5016 15.8449C12.7819 15.961 13.1046 15.8967 13.319 15.6821L15.9572 13.0423C16.1007 12.9057 16.1902 12.7128 16.1902 12.499C16.1902 12.2725 16.0898 12.0694 15.9311 11.9319L13.319 9.31802C13.1046 9.10342 12.782 9.03915 12.5016 9.15521Z" fill="#323544"/>
                        </svg>
                    </div>
                    <div className="bg-neutral-800/50 backdrop-blur-lg rounded-lg px-4 py-2 flex items-center justify-between w-xs hover:scale-110 transition-all duration-300">
                        <div className="flex flex-col items-start justify-center gap-2">
                        <p className="text-xs">LinkedIn</p>
                        <p className="text-sm font-semibold">Lorem ipsum dolor sit amet.</p>
                        </div>
                        <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2 12.5C2 6.97766 6.47729 2.50098 11.9996 2.50098C17.5218 2.50098 21.9991 6.97766 21.9991 12.5C21.9991 18.0224 17.5218 22.4991 11.9996 22.4991C6.47729 22.4991 2 18.0224 2 12.5ZM12.5016 9.15521C12.2213 9.27126 12.0385 9.54477 12.0385 9.84817L12.0385 11.749L8.55957 11.749C8.14536 11.749 7.80957 12.0847 7.80957 12.499C7.80957 12.9132 8.14536 13.249 8.55957 13.249H12.0385V15.152C12.0385 15.4554 12.2213 15.7289 12.5016 15.8449C12.7819 15.961 13.1046 15.8967 13.319 15.6821L15.9572 13.0423C16.1007 12.9057 16.1902 12.7128 16.1902 12.499C16.1902 12.2725 16.0898 12.0694 15.9311 11.9319L13.319 9.31802C13.1046 9.10342 12.782 9.03915 12.5016 9.15521Z" fill="#323544"/>
                        </svg>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Contacts;
