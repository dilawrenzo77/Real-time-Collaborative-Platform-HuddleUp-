import { Link } from "react-router-dom";

export default function successSignUp() {


    return <>
    <p className="text-4xl">User Signed-Up Successfully</p>
    <Link to="/auth/log-in"><button className="text-red-700">Huddle Home</button></Link>
    </>
};
