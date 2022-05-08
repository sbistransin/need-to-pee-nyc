import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import './index.css';
import App from './components/App';
import Nav from './components/Nav';
import Home from './components/Home';
import Signup from './components/auth/SignUp';
import Signin from './components/auth/SignIn';
import Preferences from './components/Preferences';
import RequireAuth from './components/auth/RequireAuth';
import { Navigate } from "react-router-dom";

import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reducers from "./reducers";
//import promise from "redux-promise";
import thunk from "redux-thunk";


//const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const store = createStore(reducers, {}, applyMiddleware(thunk));


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
  {/* <Provider store={createStoreWithMiddleware(reducers)}> */}
    <Router>
      <Nav />
      <App>
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/signup" element={<Signup/>} />
            <Route exact path="/signin" element={<Signin/>} />
            <Route exact path='/preferences' 
              element={
                <RequireAuth>
                  <Preferences/>
                </RequireAuth>
              }/>
        </Routes>
      </App>
    </Router>
  </Provider>
);

