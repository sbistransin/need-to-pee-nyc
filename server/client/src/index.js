import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
import App from './components/App';
import Nav from './components/Nav';
import Map from './components/Map';
import Signup from './components/auth/SignUp';
import Signin from './components/auth/SignIn';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Nav />
      <App>
        <Routes>
            <Route exact path="/" element={<Map/>} />
            <Route exact path="/signup" element={<Signup/>} />
            <Route exact path="/signin" element={<Signin/>} />
        </Routes>
      </App>
    </Router>
    
  </React.StrictMode>
);

