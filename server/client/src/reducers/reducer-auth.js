import { 
  AUTH_USER, 
  SIGN_IN_AUTH_ERROR,  
  SIGN_UP_AUTH_ERROR, 
} from '../actions/types';

const INITIAL_STATE = {
  authenticated: localStorage.getItem('token') || '',
  email: '',
  name: '',
  signInAuthError: '',
  signUpAuthError: ''
};

const authReducer = function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      return { ...state, authenticated: action.payload.user_id || null,
        email: action.payload.email,
        name: action.payload.name,
        signInAuthError: '',
        signUpAuthError: '',
        };
    case SIGN_IN_AUTH_ERROR:
      return { ...state,
        signInAuthError: action.payload,
        signUpAuthError: '',
       };
    case SIGN_UP_AUTH_ERROR:
      return { ...state,
        signUpAuthError: action.payload,
        signInAuthError: '',
       };
    default:
      return state;
  }
}

export default authReducer