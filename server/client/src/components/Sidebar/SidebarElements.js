import { Link as LinkR } from "react-router-dom";
import { Link as LinkS } from "react-scroll";
import styled from 'styled-components';
import { FaTimes } from "react-icons/fa";

export const SidebarContainer = styled.aside`
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100%;
  background: white;
  display: grid;
  align-items: center;
  top: 0;
  left: 0;
  transition: 0.3s ease-in-out;
  opacity: ${({ isOpen }) => (isOpen ? '100%' : '0')};
  top: ${({ isOpen }) => (isOpen ? '0' : '-100%')};
`;

export const ClosedIcon = styled(FaTimes)`
  color: black;
`;

export const Icon = styled.div`
  position: absolute;
  top: 1.2rem;
  right: 1.5rem;
  background: transparent;
  font-size: 2rem;
  cursor: pointer;
  outline: none;
`;

export const SidebarWrapper = styled.div`
  color: black;
  justify-content: center;
  align-items: center;
`;

export const SideBarMenu = styled.ul`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 80px);
  text-align: center;

  @media screen and (max-width: 480px) {
    grid-template-rows: repeat(6, 60px);
  }
`;

export const SideBarLink = styled(LinkS)`
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5em;
  font-weight: 300;
  text-transform: uppercase;
  text-decoration: none;
  list-style: none;
  transition: 0.2s ease-in-out;
  color: black;
  cursor: pointer;
`;

export const SideBtnWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;

  @media screen and (max-width: 820px) {
    flex-direction: column;
  }

`;

export const SidebarRouteButton = styled(LinkR)`
  background-color: white;
  color: black;
  font-weight: 300;
  font-size: 1.5rem;
  text-align: center;
  display: flex;
  justify-content: center;
  letter-spacing: 0.5px;
  width: 10rem;
  padding: 0.5em;
  margin: 0.5rem;
  border: 1px solid black;
  border-radius: 4px;
  text-transform: uppercase;
  text-decoration: none;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  &:hover {
    background-color: black;
    color: white;
  }
`;

export const SidebarRoute = styled(LinkR)`
  text-decoration: none;
  color: black;
  font-family: 'Montserrat', sans-serif;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 1.5em;
  display: flex;
  align-items: center;
  justify-content: center;
  list-style: none;
  transition: 0.2s ease-in-out;
  cursor: pointer;
`;

export const NavButton = styled.div`
  background: white;
  border: 1px solid black;
  cursor: pointer;
  color: black;
  font-family: 'Montserrat', sans-serif;
  text-decoration: none;
  text-transform: uppercase;
  font-weight: 300;
  font-size: 1.5em;
  border-radius: 4px;
  text-align: center;
  display: flex;
  justify-content: center;
  letter-spacing: 0.5px;
  width: 10rem;
  padding: 0.5em;
  margin: 0.5rem;
  white-space: nowrap;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  white-space: nowrap;

  &:hover {
    background-color: black;
    color: white;
  }
`;