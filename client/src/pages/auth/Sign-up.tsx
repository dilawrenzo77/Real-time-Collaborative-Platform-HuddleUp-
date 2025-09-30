import axios from "axios"
import { useState } from 'react';
import SuccessSignUp from "../../components/successSignUp";
import { Link } from "react-router-dom";


export default function SignUp() {
    const [values, setValues] = useState({
        name: '',
        email: '',
        nickName: '',
        role: '',
        phone: '',
        password: ''
    });
    const [showSuccess, setShowSuccess] = useState(false);
    const isFormValid = values.email.trim() !== '' && values.password.trim() !== '' && values.name.trim() !== '' 
        && values.role.trim() !== '' && values.phone.trim() !== '' && values.nickName.trim() !== '';
    const [isLoading, setIsLoading] = useState(false);
    const HOST = import.meta.env.VITE_URL;
    

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        // Don't submit if form is invalid or already loading
        if (!isFormValid || isLoading) return;
        
        setIsLoading(true); 


        try {
            const response = await axios.post(`${HOST}/api/signUp`, values);

            if(response?.data.message === "User created successfully"){
                setValues({
                    name: '',
                    email: '',
                    nickName: '',
                    role: '',
                    phone: '',
                    password: ''
                    });
                setShowSuccess(true);
            }
        } catch (error) {
            console.error(error);
            alert('Registration failed. Please check your network and try again later.');
        }finally{
            setIsLoading(false)
        }


    }

    const getButtonContent = () => {
        if (isLoading) {
            return (
                <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                    <span className="ml-2">Signing in...</span>
                </div>
            );
        }
        return "Sign In";
    };

    return (<>
        <div className="flex items-center justify-center min-h-screen overflow-y-hidden">
            {showSuccess ? <SuccessSignUp /> :
            <div className="flex flex-col items-center justify-center gap-3 mx-auto w-full">
                <div className="flex flex-col items-center justify-center gap-1">
                    <p className="text-lg font-bold text-center md:text-xl lg:text-2xl">Welcome to HuddleUp</p>
                    <p className="text-xs sm:text-sm md:text-md text-neutral-500 tracking-widest text-center">Starting a project? collaborate and communicate with HuddleUp.</p>
                </div>
            <form onSubmit={handleSubmit} id="signup" className="grow space-y-3 w-full flex flex-col items-center justify-start sm:flex-row sm:items-start sm:justify-between gap-[-3] sm:gap-5 px-25">
                <div className="w-full flex flex-col items-center justify-center gap-2">
                    <div className="flex flex-col items-start justify-center gap-1 w-full">
                        <label htmlFor="name" className="text-xs sm:text-sm md:text-md text-neutral-800">Full Name</label>
                        <input type="text" disabled={isLoading} name="name" value={values.name} required onChange={(e) => setValues({...values, name: e.target.value})} className="text-sm md:text-md lg:text-lg border-1 border-neutral-900/40 rounded-full w-full py-1 sm:py-1.5 md:py-2 lg:py-2 px-1 appearance-none outline-none bg-transparent"/>
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1 w-full">
                        <label htmlFor="e-mail" className="text-xs sm:text-sm md:text-md text-neutral-800">E-mail</label>
                        <input type="email" disabled={isLoading} name="e-mail" value={values.email} required onChange={(e) => setValues({...values, email: e.target.value})} className="text-sm md:text-md lg:text-lg border-1 border-neutral-900/40 rounded-full w-full py-1 sm:py-1.5 md:py-2 lg:py-2 px-1 appearance-none outline-none bg-transparent"/>
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1 w-full">
                        <label htmlFor="nickName" className="text-xs sm:text-sm md:text-md text-neutral-800">NickName</label>
                        <input type="text" disabled={isLoading} name="nickName" value={values.nickName} required onChange={(e) => setValues({...values, nickName: e.target.value})} className="text-sm md:text-md lg:text-lg border-1 border-neutral-900/40 rounded-full w-full py-1 sm:py-1.5 md:py-2 lg:py-2 px-1 appearance-none outline-none bg-transparent"/>
                    </div>
                </div>
                <div className="w-full flex flex-col items-center justify-center gap-2">
                <div className="flex flex-col items-start justify-center gap-1 w-full ">
                    <label htmlFor="role" className="text-xs sm:text-sm md:text-md text-neutral-800">Role</label>
                    <select name="role" disabled={isLoading} value={values.role} required onChange={(e) => setValues({...values, role: e.target.value})} className="text-sm md:text-sm lg:text-lg text-neutral-500 border-1 border-neutral-900/40 rounded-full w-full py-1 sm:py-1.5 md:py-2 lg:py-2 px-1 appearance-none outline-none bg-transparent">
                        <option value="" disabled >Select a role</option>
                        <option value="FrontEnd" key="1">FrontEnd</option>
                        <option value="BackEnd" key="2">BackEnd</option>
                        <option value="UI Design" key="3">UI Design</option>
                        <option value="DevOps" key="4">DevOps</option>
                    </select>
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1 w-full">
                        <label htmlFor="phone" className="text-xs sm:text-sm md:text-md text-neutral-800">Phone</label>
                        <input type="text" disabled={isLoading} name="phone" value={values.phone} required onChange={(e) => setValues({...values, phone: e.target.value})} className="text-sm md:text-md lg:text-lg border-1 border-neutral-900/40 rounded-full w-full py-1 sm:py-1.5 md:py-2 lg:py-2 px-1 appearance-none outline-none bg-transparent"/>
                    </div>
                    <div className="flex flex-col items-start justify-center gap-1 w-full">
                        <label htmlFor="password" className="text-xs sm:text-sm md:text-md text-neutral-800">Password</label>
                        <input type="password" disabled={isLoading} autoComplete="off" name="password" value={values.password} required onChange={(e) => setValues({...values, password: e.target.value})} className="text-sm md:text-md lg:text-lg border-1 border-neutral-900/40 rounded-full w-full py-1 sm:py-1.5 md:py-2 lg:py-2 px-1 appearance-none outline-none bg-transparent"/>
                    </div>
                </div>
                
            </form>
            {!isFormValid ? <button type="submit" form="signup" disabled={!isFormValid} className="bg-neutral-400 rounded-full w-[22rem] lg:w-[50rem] py-0.5 sm:py-2 lg:py-3 text-lg lg:text-4xl font-bold cursor-pointer hover:scale-110 transition-all duration-300">Sign Up</button> : <button type="submit" disabled={!isFormValid || isLoading} form="signup" className="bg-neutral-800 rounded-full w-[22rem] py-0.5 sm:py-2 lg:py-3 lg:text-4xl font-bold text-lg text-white cursor-pointer hover:scale-110 transition-all duration-300">{getButtonContent()}</button>}
            <div className="flex items-center justify-center">
                <p className="text-xs md:text-md lg:text-lg">Already on HuddleUp? 
                    <Link to="/auth/log-in">
                        <span className="text-purple-500 cursor-pointer"> Log In</span>
                    </Link>   
                </p>
            </div>
            </div>
            }
        </div>
    </>)
};