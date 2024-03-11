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
function App() {
  return (
    <div >
      {/* <Header/> */}
      <Navbar/>
      <Router>
        <Routes>
          <Route  path="/" element={<Home/>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/verification" element={<Verification/>}/>
          <Route path="/details" element={<Details/>}/>
          <Route path='/homepage' element={<HomePage/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
