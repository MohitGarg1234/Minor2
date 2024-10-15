import './App.css';
// import Header from './Components/Header';
import Home from './Components/Home';
import  { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Header from './Components/Header'
import Signup from './Components/Signup';
import Login from './Components/Login';
import Verification from './Components/Verification';
import Details from './Components/Details';
import HomePage from './Components/HomePage';
import Navbar from './Components/Navbar';
import ConnectAlumini from './Components/ConnectAlumini';
import JobOpening from './Components/JobOpening';
import JobOpeningPage from './Components/JobOpeningPage';
import Resume from './Components/Resume';
import Setting from './Components/Setting';
import Notification from './Components/Notification';
import Askforreferal from './Components/Askforreferal';
import Message from './Components/Message';
import ChatArea from './Components/ChatArea';
import Dashboard from './Components/Dashboard';
import {io} from "socket.io-client";
import { useContext, useEffect, useMemo, useState } from 'react';
import { UserContext } from './context/userContext';
function App() {
  const token = localStorage.getItem('token');
  const [unreadCount, setUnreadCount] = useState(0);
  const {currentUserId} = useContext(UserContext);
  const socket = useMemo(()=>io("http://localhost:5000"),[]);
  useEffect(()=>{
    if(currentUserId){

      socket.on("connect",()=>{
        console.log("Connected",socket.id);
      })
      console.log(currentUserId);
      socket.emit("join", currentUserId);
      socket.on("newNotification", (data) => {
        console.log("New notification:", data.message);
        setUnreadCount((prev) => prev + 1); // Increment unread count
      });
      socket.on("Welcome",(s)=>{
        console.log(s);
      })
    return ()=>{
      socket.disconnect();
    }
    // eslint-disable-next-line
    }
  },[socket, currentUserId]);
  return (
    <div>
      {!token && <Header/>}
      <Router>
      {token && <Navbar unreadCount={unreadCount}/>}
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/verification" element={<Verification/>}/>
          <Route path="/details" element={<Details/>}/>
          <Route path='/homepage' element={<HomePage/>}/>
          <Route path='/grownnetwork' element={<ConnectAlumini/>}/>
          <Route path='/jobopening' element={<JobOpening/>}/>
          <Route path='/jobopeningpage' element={<JobOpeningPage/>}/>
          <Route path='/askforreferal' element={<Askforreferal/>}/>
          <Route path='/resume' element={<Resume/>}/>
          <Route path='/setting' element={<Setting/>}/>
          <Route path='/notification' element={<Notification unreadCount={unreadCount} setUnreadCount={setUnreadCount}/>}/>
          <Route path='/message' element={<Message/>}/>
          <Route path='/chatarea' element={<ChatArea/>} />
          <Route path='/dashboard' element={<Dashboard/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
