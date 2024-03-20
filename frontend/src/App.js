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
        </Routes>
      </Router>
    </div>
  );
}

export default App;
