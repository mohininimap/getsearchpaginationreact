import React from 'react';
import { BrowserRouter as Router,Routes,Route} from 'react-router-dom';
// import Navigation from './components/Navigation';
import "./App.css";
import RegisterForm from './components/forms/RegisterForm';
import Useeffectex from './hookspractice/Useeffectex';

const App = () => {
  return (
    <Router>
      {/* <div className='navigationdiv'><Navigation/></div> */}
      
      <Routes>
       {/* <Route path="/" element={<RegisterForm/>}></Route> */}
       
       <Route path="" element={<Useeffectex/>}></Route>
      </Routes>
    </Router>
  )
}

export default App