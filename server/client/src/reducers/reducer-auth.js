// is it bad to save user data here?
import { AUTH_USER, AUTH_ERROR, UPDATE_USER } from '../actions/types';

// can we get current user here?
const INITIAL_STATE = {
  authenticated: '',
  email: '',
  name: '',
  authError: '',
};

const authReducer = function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      // should i clear out the error message here?
      return { ...state, authenticated: action.payload.user_id || null,
        email: action.payload.email,
        name: action.payload.name,
        authError: ''
        };
    case AUTH_ERROR:
      return { ...state, authError: action.payload };
    case UPDATE_USER:
      return {...state, name: action.payload.name}
    default:
      return state;
  }
}

export default authReducer