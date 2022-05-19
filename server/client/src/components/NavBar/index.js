import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from "react";
import { signout } from '../../actions';
import { animateScroll as scroll } from "react-scroll";
import { FaCity, FaBars } from 'react-icons/fa';
import logo from "../../images/need2peecrop.png";
import { Nav, NavButton, NavButtonLink, NavItem, NavLinks, NavContainer, NavLogo, MobileIcon, NavBtn, NavUl, Img, ImgWrap } from "./NavBarElements";

const NavBar = ({toggleSideBar, type}) => {
  console.log(type);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { authenticated } = useSelector(state => state.auth);
  const [scrollNav, setScrollNav] = useState(false);

  const toggleHome = () => {
    scroll.scrollToTop();
  }

  const changeNav = () => {
    if(window.scrollY >= 70){
      setScrollNav(true);
    } else {
      setScrollNav(false);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', changeNav)
  }, [])


  const handleLogOutClick = () => {
    dispatch(signout(() => {
      navigate('/');
    }));
  }


  const renderButtons = () => {
    if (authenticated && type === "home") {
      return (
        <>
          <NavButtonLink 
            to="/preferences">
            Settings
          </NavButtonLink>
          <NavButton 
            href="#" 
            onClick={handleLogOutClick}>
            Sign Out
          </NavButton>
        </>
         
      )
    } else if (authenticated && type !== "home") {
      return (
        <>
          <NavButtonLink 
            to="/">
            Home
          </NavButtonLink>
          <NavButtonLink 
            to="/preferences">
            Settings
          </NavButtonLink>
          <NavButton 
            href="#" 
            onClick={handleLogOutClick}>
            Sign Out
          </NavButton>
        </>
        
      )
    } else if (type !== "home") { // on an auth page
      return (
        <>
          <NavButtonLink 
            to="/">
            Home
          </NavButtonLink>
          <NavButtonLink 
            to="/signup">
            Sign Up
          </NavButtonLink>
          <NavButtonLink 
            to="/signin">
            Sign In
          </NavButtonLink>  
        </>
        
      )
    } else { // not authenticated on home page
      return (
        <>
          <NavButtonLink 
            to="/signin">
            Sign In
          </NavButtonLink>  
        </>
      )
    }
  }

  const renderLinks = () => {
    if (authenticated) {
      return (
        <>
          <NavItem>
            <NavLinks 
              to="about"
              smooth={true} 
              duration={500} 
              spy={true} 
              exact='true' 
              offset={-70}>
              About
            </NavLinks>
          </NavItem> 
          <NavItem>
            <NavLinks 
              to="discover"
              smooth={true} 
              duration={500} 
              spy={true} 
              exact='true' 
              offset={-70}>
              How It Works
            </NavLinks>
          </NavItem> 
          <NavItem>
            <NavLinks 
              to="services"
              smooth={true} 
              duration={500} 
              spy={true} 
              exact='true' 
              offset={-70}>
              Services
            </NavLinks>
          </NavItem>
        </>
      );
    } else {
      return (
              <>
                <NavItem>
                  <NavLinks 
                    to="about"
                    smooth={true} 
                    duration={500} 
                    spy={true} 
                    exact='true' 
                    offset={-70}>
                    About
                  </NavLinks>
                </NavItem> 
                <NavItem>
                  <NavLinks 
                    to="discover"
                    smooth={true} 
                    duration={500} 
                    spy={true} 
                    exact='true' 
                    offset={-70}>
                    How It Works
                  </NavLinks>
                </NavItem> 
                <NavItem>
                  <NavLinks to="signup"
                    smooth={true} 
                    duration={500} 
                    spy={true} 
                    exact='true' 
                    offset={-70}>
                    Sign Up
                  </NavLinks>
                </NavItem>
                <NavItem>
                  <NavLinks 
                    to="services"
                    smooth={true} 
                    duration={500} 
                    spy={true} 
                    exact='true' 
                    offset={-70}>
                    Services
                  </NavLinks>
                </NavItem>
              </>
            );
    }
      
  }

  return (
    <Nav scrollNav={scrollNav}>
      <NavContainer>
        <NavLogo to="/" onClick={toggleHome}>
          {/* <ImgWrap>
            <Img src={logo} alt="logo" />
          </ImgWrap> */}
          <FaCity size={40}/>
        </NavLogo>
        <MobileIcon onClick={toggleSideBar}>    
            <FaBars size={30} />
        </MobileIcon>
        <NavUl>
          {(type === "home") ? renderLinks() : ""}
        </NavUl>
        <NavBtn>
          {renderButtons()}
        </NavBtn>
      </NavContainer>
    </Nav>
  );
};

export default NavBar;