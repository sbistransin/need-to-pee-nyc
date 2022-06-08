import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import Signup from './components/auth/SignUp';
import Signin from './components/auth/SignIn';
import Preferences from './components/Preferences';
import RequireAuth from './components/auth/RequireAuth';
import { useEffect } from "react";
import { fetchCurrentUser } from "./actions";
import { useDispatch } from "react-redux";

const App = () => {

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  return (
    <>
      <Router>
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
      </Router>
    </>
  )
}

export default App;