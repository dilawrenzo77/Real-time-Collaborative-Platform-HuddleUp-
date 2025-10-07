import axios from "axios"
import { useState } from 'react';
import { io } from "socket.io-client";
import { useAuth } from "../context/context"; 
import { Link } from "react-router-dom";


const Login = () => {
    const { setUserData, setSocket } = useAuth();
    const HOST = import.meta.env.VITE_URL;
    const HOST2 = import.meta.env.VITE_VS_HOST;
    const [values, setValues] = useState({
        email: '',
        password: ''
    });
    const isFormValid = values.email.trim() !== '' && values.password.trim() !== '' ;
    const [isLoading, setIsLoading] = useState(false);
    

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()

        // Don't submit if form is invalid or already loading
        if (!isFormValid || isLoading) return;
        
        setIsLoading(true); 


        try {
            const response = await axios.post(`${HOST}/api/login`, values, { withCredentials: true});

            if(response?.data.message === "Successfully Logged In "){
                const user = response?.data?.user;
                const token = response?.data?.token;
                setUserData({user, token});
                setSocket(io(HOST2));

                setValues({
                    email: '',
                    password: ''
                    });
                window.location.href = "/dashboard";
            }

        } catch (error) {
            console.error(error);
            alert('LogIn failed. Please check your network and try again later.');
        }finally{
            setIsLoading(false)
        }

    }

    const getButtonContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span className="ml-2">Logging in...</span>
                </div>
            );
        }
        return "Log In";
    };

    return (<>
        <div className="flex items-center justify-center min-h-screen overflow-y-hidden">
            <div className="flex flex-col items-center justify-center gap-5 mx-auto px-1">
                <div className="flex flex-col items-center justify-center gap-1">
                    <p className="text-lg font-bold text-center md:text-xl lg:text-2xl">Welcome back to HuddleUp</p>
                    <p className="text-xs sm:text-sm md:text-md text-neutral-500 tracking-widest text-center">Starting a project? collaborate and communicate with HuddleUp.</p>
                </div>
                <form onSubmit={handleSubmit} className=" grow space-y-7 w-full">
                    <div className="flex flex-col items-start justify-center gap-1">
                        <label htmlFor="e-mail" className="text-xs sm:text-sm md:text-md text-neutral-800">E-mail</label>
                        <input type="email" disabled={isLoading} name="e-mail" value={values.email} required onChange={(e) => setValues({...values, email: e.target.value})} className="text-sm md:text-md lg:text-lg border-1 border-neutral-900/40 rounded-full w-full py-1 sm:py-1.5 md:py-2 lg:py-2 px-1 appearance-none outline-none bg-transparent "/>
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1">
                        <label htmlFor="password" className="text-xs sm:text-sm md:text-md text-neutral-800">Password</label>
                        <input type="password" disabled={isLoading} autoComplete="off" name="password" value={values.password} required onChange={(e) => setValues({...values, password: e.target.value})} className="text-sm md:text-md lg:text-lg border-1 border-neutral-900/40 rounded-full w-full py-1 sm:py-1.5 md:py-2 lg:py-2 px-1 appearance-none outline-none bg-transparent"/>
                    </div>

                    {!isFormValid ? <button type="submit" disabled={!isFormValid} className="bg-neutral-400 rounded-full text-neutral-500 w-full py-0.5 sm:py-2 lg:py-3 text-lg lg:text-4xl font-bold cursor-pointer hover:scale-110 transition-all duration-300">Log In</button> : <button type="submit"  disabled={!isFormValid || isLoading} className="bg-neutral-800 text-white rounded-full w-full py-0.5 text-lg font-semibold cursor-pointer hover:scale-110 transition-all duration-300">{getButtonContent()}</button>}
                </form>
                <div className="flex items-center justify-center">
                    <p className="text-xs md:text-md lg:text-lg">Not on HuddleUp? 
                        <Link to="/auth/sign-up">
                            <span className="text-purple-500 cursor-pointer"> Sign Up</span>
                        </Link>   
                    </p>
                </div>
            </div>
        </div>
    </>)
};

export default Login;