import NavBar from '../NavBar';
import Sidebar from '../Sidebar';
import { useState } from 'react';


const AuthHeader = () => {

  const [isOpen, setIsOpen] = useState(false);
  
  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggleSideBar={toggleSideBar}/>
      <NavBar toggleSideBar={toggleSideBar}/>
    </>
  )
}

export default AuthHeader;