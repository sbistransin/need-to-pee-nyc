import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from "react-router-dom";
import { signout } from "../../actions";
import { SidebarContainer, SideBarLink, SideBarMenu, SideBtnWrap, SidebarRouteButton, SidebarRoute, SidebarWrapper, ClosedIcon, Icon, NavButton } from './SidebarElements';


const Sidebar = ({isOpen, toggleSideBar, type}) => {
  const { authenticated } = useSelector(state => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOutClick = () => {
    dispatch(signout(() => {
      navigate('/');
    }));
  };

  const renderLinks = () => {
    if (authenticated) {
      return (
        <>
          <SideBarLink to="about" onClick={toggleSideBar}>
            About
          </SideBarLink>
          <SideBarLink to="discover" onClick={toggleSideBar}>
            How It Works
          </SideBarLink>
          <SideBarLink to="services" onClick={toggleSideBar}>
            Services
          </SideBarLink>
        </>
      );
    } else {
      return (
        <>
          <SideBarLink to="about" onClick={toggleSideBar}>
            About
          </SideBarLink>
          <SideBarLink to="discover" onClick={toggleSideBar}>
            How It Works
          </SideBarLink>
          <SideBarLink to="services" onClick={toggleSideBar}>
            Services
          </SideBarLink>
          <SideBarLink to="signup" onClick={toggleSideBar}>
            Sign Up
          </SideBarLink>
        </>
      );
    }
  }

  const renderBtn = () => {
    if (authenticated) {
      return (
        <>
          <SidebarRouteButton to="/preferences">
            Settings
          </SidebarRouteButton>
          <NavButton onClick={handleLogOutClick}>
            Sign Out
          </NavButton>
        </>
      );
    } else {
      return (
        <>
          <SidebarRouteButton to="/signin">
            Sign In
          </SidebarRouteButton>
        </>
      );
    }
  }

  const renderAuthLinks = () => {
    if (authenticated) {
      return (
        <>
          <SidebarRoute to="/">
            Home
          </SidebarRoute>
        </>
      )
    }
    return (
        <>
          <SidebarRoute to="/">
            Home
          </SidebarRoute>
          <SidebarRoute to="/signin">
            Sign In
          </SidebarRoute>
          <SidebarRoute to="/signup">
            Sign Up
          </SidebarRoute>
        </>
    )
  }
  
  return (
    <SidebarContainer isOpen={isOpen} onClick={toggleSideBar}>
      <Icon onClick={toggleSideBar}>
        <ClosedIcon />
      </Icon>
      <SidebarWrapper>
        {(type === "home") ? <SideBarMenu>{renderLinks()}</SideBarMenu> : <SideBarMenu>{renderAuthLinks()}</SideBarMenu>}
        {(type !== "home" && !authenticated) ? "" : <SideBtnWrap>{renderBtn()}</SideBtnWrap>}
      </SidebarWrapper>
    </SidebarContainer>
  )
}

export default Sidebar;

