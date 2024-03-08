import './App.css';
import Header from './Components/Header';
import Home from './Components/Home';
import  { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
function App() {
  return (
    <div>
      <Header/>
      <Router>
        <Routes>
          <Route  path="/" element={<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
