import NavBar from '../NavBar';
import Sidebar from '../Sidebar';
import { useState } from 'react';
import { useSelector } from 'react-redux';



const PreferencesHeader = () => {

  const [isOpen, setIsOpen] = useState(false);
  const { authenticated } = useSelector(state => state.auth);

  const getIfAuth = () => {
    if (authenticated) {
      return true;
    } else {
      return false;
    }
  };
  
  const toggleSideBar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggleSideBar={toggleSideBar} />
      <NavBar toggleSideBar={toggleSideBar} />
    </>
  )
}

export default PreferencesHeader;