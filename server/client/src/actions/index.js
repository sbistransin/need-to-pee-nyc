import axios from 'axios';
import { AUTH_ERROR, AUTH_USER } from './types';
const ROOT_URL = "http://localhost:8000";



export const signin = (formProps, callback) => dispatch => {
  axios.post(
    `${ROOT_URL}/login`,
    formProps
  ).then(function (response) {
    dispatch({ type: AUTH_USER, payload: response.data });
    callback();
  })
  .catch(function (error) {
    // figure out how to get more dynamic error messaging
    dispatch({ type: AUTH_ERROR, payload: 'Incorrect Username or Password' });
  });
};

export const signout = (callback) => dispatch => {
  axios.get(`${ROOT_URL}/logout`)
  .then(function(response) {
    dispatch({ type: AUTH_USER, payload: '' });
    callback()
  })
  .catch(function (error) {
    throw error;
  })
  
};
