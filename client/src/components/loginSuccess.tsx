import { Link } from "react-router-dom";

export default function LoginSuccess() {

    return <>
    <p className="text-4xl">Logged in Successfully</p>
    <Link to="/dashboard"><button className="text-red-700">Huddle Home</button></Link>
    </>
};