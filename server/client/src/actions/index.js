import axios from 'axios';
import { AUTH_ERROR, AUTH_USER } from './types';
//const ROOT_URL = "http://localhost:8000";



export const signin = (formProps, callback) => dispatch => {
  debugger;
  axios.post(
    '/login',
    formProps
  ).then(function (response) {
    debugger;
    dispatch({ type: AUTH_USER, payload: response.data });
    callback();
  })
  .catch(function (error) {
    debugger;
    // figure out how to get more dynamic error messaging
    dispatch({ type: AUTH_ERROR, payload: 'Incorrect Username or Password' });
  });
};

export const signup = (formProps, callback) => dispatch => {
  debugger;
  axios.post(
    '/signup',
    formProps
  ).then(function (response) {
    debugger;
    dispatch({ type: AUTH_USER, payload: response.data });
    callback();
  })
  .catch(function (error) {
    debugger;
    dispatch({ type: AUTH_ERROR, payload: error.response.data });
  });
};

export const signout = (callback) => dispatch => {
  axios.get('/logout')
  .then(function(response) {
    dispatch({ type: AUTH_USER, payload: '' });
    callback()
  })
  .catch(function (error) {
    throw error;
  })
  
};

