import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../actions';


const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authenticated = useSelector(state => state.auth.authenticated);

  const handleLogOutClick = () => {
    dispatch(signout(() => {
      navigate('/');
    }));
  }

  const renderLinks = () => {
    if (authenticated) {
      return (
        <>
          <li><Link to="/current-user">Manage Settings</Link></li>
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
