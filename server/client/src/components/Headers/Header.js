import NavBar from '../NavBar';
import Sidebar from '../Sidebar';
import { useState } from 'react';


const Header = () => {

  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggleSideBar={toggleSideBar} type={"home"}/>
      <NavBar toggleSideBar={toggleSideBar} type={"home"}/>
    </>
  )
}

export default Header;

