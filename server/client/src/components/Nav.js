import { Link } from "react-router-dom";


const Nav = () => {

  const renderLinks = () => {
      return (
        <>
          <li><Link to="/signup">Sign Up</Link></li>
          <li><Link to="/signin">Sign In</Link></li>
        </>
      );
  }

  return (
    <>
      <div id="logo">
        <Link to="/">
          Home
        </Link>
      </div>

      <ul>
        {renderLinks()}
      </ul>
    </>
  );
};

export default Nav;
