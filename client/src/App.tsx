import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Chat from "./pages/Chat";
import Profile from "./pages/Profile";
import SignUp from "./pages/auth/Sign-up";
import LogIn from "./pages/auth/log-in";
import DashBoard from "./pages/DashBoard";
import { AuthContextProvider } from "./pages/context/context";
import PrivateRoutes from "./utils/PrivateRoutes";
import About from "./pages/About";
import Notifications from "./pages/Notifications";
import Contacts from "./pages/Contacts";
import Error from "./pages/error"



function App() {
  return (
    <div className=" min-h-screen bg-gradient-to-r from-rose-100 to-teal-100 xl:container xl:mx-auto overflow-x-hidden">
      <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/auth/log-in" element={<LogIn />} />
          <Route path="/auth/sign-up" element={<SignUp/>}/>
          <Route path="/contacts" element={<Contacts />}/>
          <Route path="/about" element={<About />}/>
          <Route path="*" element={<Error />}/>
          <Route element={<PrivateRoutes />}>
            <Route path="/chat/:roomId" element={<Chat />}/>
            <Route path="/profile" element={<Profile />}/>
            <Route path="/dashboard" element={<DashBoard />}/>
            <Route path="/notifications" element={<Notifications />}/>
          </Route>
        </Routes>
      </BrowserRouter>
      </AuthContextProvider>
    </div>
  )
}

export default App