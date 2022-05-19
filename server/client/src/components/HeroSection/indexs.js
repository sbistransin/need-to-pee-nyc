import React from 'react';
import { useSelector } from 'react-redux';
import logo from '../../images/need2pee.svg';
import { HeroContainer, HeroContent, ImgWrap, Img, HeroP, HeroBtnWrapper, Button, SidebarRouteButton } from './HeroSectionElements';

const HeroSection = () => { 
  const { authenticated, name } = useSelector(state => state.auth);

  const renderText = () => {
    if (authenticated) {
      return "Welcome Back, " + name;
    } else {
      return "Sign up to start texting today.";
    }
  }

  const renderBtns = () => {
    if (authenticated) {
      return (
      <SidebarRouteButton to="/preferences">Manage Settings</SidebarRouteButton>
      )
    } else {
      return (
        <Button 
          to="about"
          smooth={true} 
          duration={500} 
          spy={true} 
          exact='true' 
          offset={-70}
        >
          Learn More
        </Button>
      )
    }
  }
  return (
    <HeroContainer>
      <HeroContent id="home">
        {/* <HeroH1>Need to Pee NYC</HeroH1> */}
        <ImgWrap><Img src={logo} alt="logo"/></ImgWrap>
        <HeroP>
          {renderText()}
        </HeroP>
        <HeroBtnWrapper>{renderBtns()}</HeroBtnWrapper>
      </HeroContent>
    </HeroContainer>)
}

export default HeroSection;

