import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { signout } from '../actions';
import styled from 'styled-components';

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
          <li><Link to="/">Home</Link></li> 
          <li><Link to="/preferences">Manage Settings</Link></li>
          <li><LinkButton href="#" onClick={handleLogOutClick}>Sign Out</LinkButton></li>
        </>
      );
    } else {
      return (
              <>
                <li><Link to="/">Home</Link></li> 
                <li><Link to="/signup">Sign Up</Link></li>
                <li><Link to="/signin">Sign In</Link></li>
              </>
            );
    }
      
  }

  return (
    <NavContainer>
      <NavUl>
        {renderLinks()}
      </NavUl>
    </NavContainer>
  );
};

export default Nav;

const NavContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: #F2F1EA;
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: black;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 1em;
`


const NavUl = styled.ul`
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  list-style: none;
  li:first-child {
    float: left;
  }
  li {
    margin-left: 0.8em;
    padding: 0.5em;
  }
  li a {
    color: black;
    text-decoration: none;
    cursor: pointer;
    text-transform: uppercase;
  }
`;

