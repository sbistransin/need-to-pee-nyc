import styled from "styled-components";
import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";

export const Nav = styled.nav`
  background: ${({scrollNav}) => (scrollNav ? 'white' : 'transplant')};
  height: 80px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: sticky;
  top: 0;
  z-index: 10;
  margin-top: -80px;

  @media screen and (max-width: 960px) {
    transition: 0.8s all ease;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  justify-content: space-between;
  height: 70px;
  z-index: 1;
  width: 100%;
  padding: 0 24px;
`;

export const NavLogo = styled(LinkR)`
  color: black;
  justify-self: flex-start;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  margin-left: 24px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  text-decoration: none;
`;

export const NavUl = styled.ul`
  font-family: 'Montserrat', sans-serif;
  font-weight: 300;
  display: flex;
  align-items: center;
  list-style: none;
  text-align: center;
  margin-right: -22px;

  @media (max-width: 700px) {
    display: none;
  }
`;

export const NavItem = styled.li`
  padding: 0.5em;
  height: 70px;
`;

export const NavLinks = styled(LinkS)`
  color: black;
  display: flex;
  align-items: center;
  text-decoration: none;
  text-transform: uppercase;
  padding: 0 1rem;
  height: 100%;
  cursor: pointer;

  &.active {
    border-bottom: 3px solid black;
  }
`;

export const NavButton = styled.div`
  background: none;
  border: none;
  cursor: pointer;
  color: black;
  font-family: 'Montserrat', sans-serif;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 1em;
  padding: 0px .455em;

  @media (max-width: 700px) {
    font-size: 2em;
  }
`;

export const NavBtn = styled.nav`
  display: flex;
  align-items: center;

  @media screen and (max-width: 700px) {
    display: none;
  }
`;

export const NavButtonLink = styled(LinkR)`
  text-decoration: none;
  color: black;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 1em;
  padding: 1.5em 1em;
`;

export const MobileIcon = styled.div`
display: none;
@media screen and (max-width: 700px) {
  display: block;
  position: absolute;
  top: 0;
  right: 0;
  transform: translate(-100%, 60%);
  cursor: pointer;
}
`;

export const ImgWrap = styled.div`
  max-width: 50px;
  height: 100%;

`;

export const Img = styled.img`
  width: 100%;
  max-height: 50px;
  margin: 0 0 10px 0;
  padding-right: 0;
`;