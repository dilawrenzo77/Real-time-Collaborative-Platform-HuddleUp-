import { Link } from "react-router-dom";





const Home  = () => {


  return (
    <section className="flex flex-col items-center justify-center mx-auto  h-[100vh]">
      <nav className="flex items-center justify-between w-full px-4 mt-2">
        <div>
          <h1 className="text-xl font-semibold gradient-text">HuddleUp</h1>
        </div>
        <div className="flex items-center justify-center gap-3 flex-wrap">
          <Link to="/about">
          <div className="bg-black flex items-center justify-between gap-4 rounded-full px-5 py-1 group hover:bg-white transition-all duration-500 hover:scale-105 cursor-pointer">
            <p className="text-white text-[0.6rem] group-hover:text-black transition-all duration-500">About Us</p>
            <div className="bg-white rounded-full p-0.5 ">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M6.75 2C5.50736 2 4.5 3.00736 4.5 4.25V6.25H3.25C2.83579 6.25 2.5 6.58579 2.5 7C2.5 7.41421 2.83579 7.75 3.25 7.75H4.5V11.25H3.25C2.83579 11.25 2.5 11.5858 2.5 12C2.5 12.4142 2.83579 12.75 3.25 12.75H4.5V16.25H3.25C2.83579 16.25 2.5 16.5858 2.5 17C2.5 17.4142 2.83579 17.75 3.25 17.75H4.5V19.75C4.5 20.9926 5.50736 22 6.75 22H17.25C18.4926 22 19.5 20.9926 19.5 19.75V4.25C19.5 3.00736 18.4926 2 17.25 2H6.75ZM6 17.75V19.75C6 20.1642 6.33579 20.5 6.75 20.5H17.25C17.6642 20.5 18 20.1642 18 19.75V4.25C18 3.83579 17.6642 3.5 17.25 3.5H6.75C6.33579 3.5 6 3.83579 6 4.25V6.25H7.25C7.66421 6.25 8 6.58579 8 7C8 7.41421 7.66421 7.75 7.25 7.75H6V11.25H7.25C7.66421 11.25 8 11.5858 8 12C8 12.4142 7.66421 12.75 7.25 12.75H6V16.25H7.25C7.66421 16.25 8 16.5858 8 17C8 17.4142 7.66421 17.75 7.25 17.75H6Z" fill="#323544"/>
              </svg>
            </div>
          </div>
          </Link>
          <Link to="/contacts">
          <div className="bg-black flex items-center justify-between gap-4 rounded-full px-5 py-1 group hover:bg-white transition-all duration-500 hover:scale-105 cursor-pointer">
            <p className="text-white text-[0.6rem] group-hover:text-black transition-all duration-500">Contact</p>
            <div className="bg-white rounded-full p-0.5">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.25 13.75C7.25 13.3358 6.91421 13 6.5 13H5.5C5.08579 13 4.75 13.3358 4.75 13.75V17.25C4.75 17.6642 5.08579 18 5.5 18H6.5C6.91421 18 7.25 17.6642 7.25 17.25V13.75ZM19.25 13.75C19.25 13.3358 18.9142 13 18.5 13H17.5C17.0859 13.0001 16.75 13.3358 16.75 13.75V17.25C16.75 17.6642 17.0859 17.9999 17.5 18H18.5C18.9142 18 19.25 17.6642 19.25 17.25V13.75ZM8.75 17.25C8.75 18.4926 7.74264 19.5 6.5 19.5H5.5C4.25736 19.5 3.25 18.4926 3.25 17.25V13.75C3.25 12.5074 4.25736 11.5 5.5 11.5H6.5C7.74264 11.5 8.75 12.5074 8.75 13.75V17.25ZM20.75 17.25C20.75 18.4926 19.7426 19.5 18.5 19.5H17.5C16.2574 19.4999 15.25 18.4926 15.25 17.25V13.75C15.25 12.5074 16.2574 11.5001 17.5 11.5H18.5C19.7426 11.5 20.75 12.5074 20.75 13.75V17.25Z" fill="#323544"/>
                <path opacity="0.4" d="M12 3.25C16.8325 3.25 20.75 7.1675 20.75 12V13.75C20.75 12.767 20.1188 11.9333 19.2402 11.627C19.046 7.79626 15.879 4.75 12 4.75C8.12105 4.75002 4.95295 7.79625 4.75879 11.627C3.88063 11.9335 3.25 12.7673 3.25 13.75V12C3.25002 7.16752 7.16752 3.25002 12 3.25Z" fill="#323544"/>
              </svg>
            </div>
          </div>
          </Link>
        </div>
      </nav>
      <div className="grow flex flex-col items-center justify-center gap-2 px-2">
         <div className="flex flex-col items-center justify-center gap-5">
          <p className="text-xl tracking-widest text-center">Welcome to <span className="text-2xl font-semibold tracking-widest text-center"> Huddle Up </span></p>
          <p className="text-lg text-center tracking-widest">Your Shortcut to Communicate in Perfect Sync</p>
          <p className="text-sm lg:text-md text-center tracking-widest">Huddle unites development and design teams in real-time. Collaborate on code, visuals, and feedback in one place to ship better products.</p>
          <p></p>
         </div>
          <div className="flex flex-col items-center justify-start gap-4 sm:flex-row sm:items-center sm:justify-center">
            <Link to="auth/sign-up"><button className="text-lg font-thin rounded-xl border-2 border-black border-solid px-15 py-0.5 cursor-pointer hover:scale-110 transition-all duration-300">Join Huddle</button></Link>
            <Link to="auth/log-in"><button className="text-lg font-thin rounded-xl border-2 border-black border-solid px-15 py-0.5 cursor-pointer hover:scale-110 transition-all duration-300">Log In</button></Link>
          </div>
        </div>
    </section>
  );
};

export default Home;