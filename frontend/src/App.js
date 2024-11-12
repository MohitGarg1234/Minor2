import "./App.css";
import Home from "./Components/Home";
import {
  BrowserRouter as Router,
  Route,
  Routes,
} from "react-router-dom";
import Header from "./Components/Header";
import Signup from "./Components/Signup";
import Login from "./Components/Login";
import Verification from "./Components/Verification";
import Details from "./Components/Details";
import HomePage from "./Components/HomePage";
import Navbar from "./Components/Navbar";
import ConnectAlumini from "./Components/ConnectAlumini";
import JobOpening from "./Components/JobOpening";
import JobOpeningPage from "./Components/JobOpeningPage";
import Resume from "./Components/Resume";
import Setting from "./Components/Setting";
import Notification from "./Components/Notification";
import Askforreferal from "./Components/Askforreferal";
import Dashboard from "./Components/Dashboard";
import { io } from "socket.io-client";
import { useContext, useEffect, useMemo, useState } from "react";
import { UserContext } from "./context/userContext";
import AdminLogin from "./Components/AdminLogin";
// import AdminHomePage from "./Components/AdminHomePage";
import AdminForgotPassword from "./Components/AdminForgotPassword";
import AdminVerifyOTP from "./Components/AdminVerifyOTP";
import AdminResetPassword from "./Components/AdminResetPassword";
import AdminJobPost from "./Components/AdminJobPost";
import AdminArticlePost from "./Components/AdminArticlePost";
import AdminAnnouncement from "./Components/AdminAnnouncement";
import AdminJobPosting from "./Components/AdminJobPosting";
import ChatsList from "./Components/ChatsList";  // Chat List Component
import Chat from "./Components/Chat"; 

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  const [unreadCount, setUnreadCount] = useState(0);
  const [unreadMessageCount, setUnreadMessageCount] = useState(0);
  const { currentUserId } = useContext(UserContext);
  const socket = useMemo(() => {
    return io("http://localhost:5000",{ transports: ["websocket"], })}, []);

  useEffect(() => {
    if (currentUserId) {
      socket.on("connect", () => {
        console.log("Connected", socket.id);
      });
      socket.emit("join", currentUserId);
      socket.on("newNotification", (data) => {
        setUnreadCount((prev) => prev + 1); // Increment unread count
      });
      socket.on("unreadMessageCount", ({ unreadMessageCount }) => {
        setUnreadMessageCount((prevCount) => prevCount + unreadMessageCount);
        console.log(unreadMessageCount);
      });
      socket.on("Welcome", (s) => {
        console.log(s);
      });
      return () => {
        socket.disconnect();
      };
      // eslint-disable-next-line
    }
  }, [socket, currentUserId]);
  return (
    <Router>
      <div>
        {!token && <Header />}
        {token && role === "user" && <Navbar unreadCount={unreadCount} unreadMessageCount={unreadMessageCount} />}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/details" element={<Details />} />
          <Route
            path="/admin/forgot-password"
            element={<AdminForgotPassword />}
          />
          <Route path="/admin/verify-otp" element={<AdminVerifyOTP />} />
          <Route
            path="/admin/reset-password"
            element={<AdminResetPassword />}
          />
          {token && role === "user" ? (
            <>
              <Route path="/homepage" element={<HomePage />} />
              <Route path="/grownnetwork" element={<ConnectAlumini />} />
              <Route path="/jobopening" element={<JobOpening />} />
              <Route path="/jobopeningpage" element={<JobOpeningPage />} />
              <Route path="/askforreferal" element={<Askforreferal />} />
              <Route path="/resume" element={<Resume socket={socket} />} />
              <Route path="/setting" element={<Setting />} />
              <Route path="/notification" element={<Notification unreadCount={unreadCount} setUnreadCount={setUnreadCount}/>}/>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/messages" element={<ChatsList socket={socket} userId={currentUserId} unreadMessageCount={unreadMessageCount} setUnreadMessageCount={setUnreadMessageCount}/>} />
              <Route path="/message/:otherUserId" element={<Chat userId={currentUserId} socket={socket} />} /> 
            </>
          ) : null}
          {token && role === "admin" ? (
            <>
              <Route path="/adminHomepage" element={<AdminArticlePost />} />
              <Route path="/job-post" element={<AdminJobPost/>}/>
              <Route path="/article-post" element={<AdminArticlePost/>}/>
              <Route path="/announcements" element={<AdminAnnouncement />} />
              <Route path="/adminjobposting" element={<AdminJobPosting />} />
            </>
          ) : null}
        </Routes>
      </div>
    </Router>
  );
}

export default App;
