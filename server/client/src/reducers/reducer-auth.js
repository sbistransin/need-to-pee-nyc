import { AUTH_USER, AUTH_ERROR } from '../actions/types';

const INITIAL_STATE = {
  authenticated: '',
  authError: '',
};

const authReducer = function(state = INITIAL_STATE, action) {
  switch (action.type) {
    case AUTH_USER:
      // should i clear out the error message here?
      return { ...state, authenticated: action.payload.user_id || null,
        authError: ''
        };
    case AUTH_ERROR:
      return { ...state, authError: action.payload };
    default:
      return state;
  }
}

export default authReducer