import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../pages/context/context";





const PrivateRoutes: React.FC = () => {
    const { userData, isLoading } = useAuth();
    const location = useLocation();


    if (isLoading) {
    return (
        <div className="fixed inset-0 bg-gray-900/70 backdrop-blur-sm z-50 flex items-center justify-center">
            <div className="flex flex-col items-center justify-center space-y-4">
                <div className="flex space-x-2">
                    <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-4 h-4 bg-white rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
                </div>
                <p className="text-white font-medium">Loading...</p>
            </div>
        </div>
        );
    }
    
    return userData ? (<Outlet /> ) : (<Navigate to="/auth/log-in" state={{from: location}} replace/>)
    
}

export default PrivateRoutes;