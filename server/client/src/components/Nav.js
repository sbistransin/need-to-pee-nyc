import { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signout, fetchCurrentUser } from '../actions';
import axios from "axios";


const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authenticated = useSelector(state => state.auth.authenticated);

  const handleLogOutClick = () => {
    dispatch(signout(() => {
      navigate('/');
    }));
  }

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, []);

  const renderLinks = () => {
    if (authenticated) {
      return (
        <>
          <li><Link to="/preferences">Manage Settings</Link></li>
          <li><Link to="/" onClick={handleLogOutClick}>Sign Out</Link></li>
        </>
      );
    } else {
      return (
              <>
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/signin">Sign In</Link></li>
              </>
            );
    }
      
  }

  return (
    <>
      <div id="logo">
        <Link to="/">
          Home
        </Link>
      </div>

      <ul>
        {renderLinks()}
      </ul>
    </>
  );
};

export default Nav;
