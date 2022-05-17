import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useState } from "react";
import { signout } from '../actions';
import styled from 'styled-components';

const Nav = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authenticated = useSelector(state => state.auth.authenticated);
  const [extendNavbar, setExtendNavbar] = useState(false);

  const handleLogOutClick = () => {
    dispatch(signout(() => {
      navigate('/');
    }));
  }

  const renderLinks = () => {
    if (authenticated) {
      return (
        <>
          <li>
            <Link to="/">
              Home
            </Link>
          </li> 
          <li>
            <Link to="/preferences">
              Manage Settings
            </Link>
          </li>
          <li>
            <LinkButton 
              extendNavbar={extendNavbar}
              href="#" 
              onClick={handleLogOutClick}>
              Sign Out
            </LinkButton>
          </li>
        </>
      );
    } else {
      return (
              <>
                <li>
                  <Link to="/">
                    Home
                  </Link>
                </li> 
                <li>
                  <Link to="/signup">
                    Sign Up
                  </Link>
                </li>
                <li>
                  <Link to="/signin">
                  Sign In
                  </Link>
                </li>
              </>
            );
    }
      
  }

  return (
    <NavBar extendNavbar={extendNavbar}>
      <NavContainer>
        <OpenLinksButton 
          onClick={() => setExtendNavbar((curr) => !curr)}
        >
          {extendNavbar ? <>&#10005;</> : <>&#8801;</>}
        </OpenLinksButton>
        <NavUl>
          {renderLinks()}
        </NavUl>
      { extendNavbar &&
        <NavbarExtendedContainer>
          <ExtendedNavUl>{renderLinks()}</ExtendedNavUl>
        </NavbarExtendedContainer>
      }
      </NavContainer>
    </NavBar>
      
  );
};

export default Nav;

const NavBar = styled.div`
  background: #F2F1EA;
  position: fixed;
  width: 100%; 
  height: ${(props) => (props.extendNavbar ? "100vh" : "70px;")}
`;

const NavContainer = styled.div`
  width: 100%;
  position: flex;
  flex-direction: row;
  @media (min-width: 750px) {
    height: 70px;
  }
`;

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

  @media (max-width: 750px) {
    display: none;
  }
`;

const ExtendedNavUl = styled.ul`
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  display: flex;
  flex-direction: column;
  list-style: none;
  li {
    margin-left: 0.8em;
    padding: 0.5em;
  }
  li a {
    color: black;
    text-decoration: none;
    cursor: pointer;
    text-transform: uppercase;
    font-size: 2em;
  }
`;

const LinkButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  color: black;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  font-weight: 300;
  font-size: ${(props) => (props.extendNavbar ? "2em;" : "1em;")}
  padding: 0px;
`;

const NavbarExtendedContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: 750px) {
    display: none;
  }

`;

const OpenLinksButton = styled.button`
  width: 70px;
  height: 50px;
  background: none;
  border: none;
  color: black;
  font-size: 40px;
  cursor: pointer;
  display: none;
  padding-left: 10px;

  @media (max-width: 750px) {
    display: flex;
  }
`;