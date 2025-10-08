import { Link } from "react-router-dom";

export default function successSignUp() {


    return <>
    <div className="h-[90vh] flex flex-col items-center justify-center gap-20">
        <p className="text-4xl">User Signed-Up Successfully</p>
        <Link to="/auth/log-in"><button className="text-teal-700">Hog in To HuddleUp</button></Link>
    </div>
    </>
};
