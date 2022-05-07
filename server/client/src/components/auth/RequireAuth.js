import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";


const RequireAuth = ({ children }) => {
  
  const authenticated = useSelector(state => state.auth.authenticated);
  const location = useLocation();

  return authenticated ? children : <Navigate to="/signin" replace state={{ path: location.pathname }}/>
}

export default RequireAuth;