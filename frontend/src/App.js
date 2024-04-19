import './App.css';
// import Header from './Components/Header';
import Home from './Components/Home';
import  { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
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
function App() {
  return (
    <div >
      {/* <Header/> */}
      <Router>
      <Navbar/>
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
          <Route path='/notification' element={<Notification/>}/>
          <Route path='/message' element={<Message/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
