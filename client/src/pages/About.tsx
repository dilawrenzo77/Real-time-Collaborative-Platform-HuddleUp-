import { Link } from "react-router-dom";


const About = () => {
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
            <div className="flex flex-col items-center justify-start ">
                <p className="text-xl font-semibold">Contacts</p>
                <div className="w-xl">
                    <p className="text-sm text-center">
                        In today's fast-paced tech environment, seamless communication within specialized teams is the key to success. HuddleUp is a unified platform designed specifically for web and software development.

                        We empower your entire tech organization by creating focused environments for every discipline—whether it's your Frontend team refining the user interface, your Backend engineers architecting the core logic, or your DevOps team streamlining deployment.

                        By breaking down internal silos and reducing context-switching, HuddleUp helps teams align their efforts, solve complex problems, and accelerate project velocity. We're not just another messaging app; we're the dedicated digital workspace where great ideas become exceptional software.
                    </p>
                </div>
            </div>
        </div>
    );
}

export default About;
