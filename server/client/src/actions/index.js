import axios from 'axios';
import { AUTH_USER, SIGN_IN_AUTH_ERROR, SIGN_UP_AUTH_ERROR } from './types';

export const signin = (formProps, callback) => dispatch => {
  axios.post(
    '/login',
    formProps
  ).then(function (response) {
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('token', response.data.user_id);
    callback();
  })
  .catch(function (error) {
    // figure out how to get more dynamic error messaging
    dispatch({ type: SIGN_IN_AUTH_ERROR, payload: 'Incorrect Username or Password' });
  });
};

export const signup = (formProps, callback) => dispatch => {
  axios.post(
    '/signup',
    formProps
  ).then(function (response) {
    dispatch({ type: AUTH_USER, payload: response.data });
    localStorage.setItem('token', response.data.user_id);
    callback();
  })
  .catch(function (error) {
    dispatch({ type: SIGN_UP_AUTH_ERROR, payload: error.response.data });
  });
};

export const signout = (callback) => dispatch => {
  localStorage.removeItem('token');
  axios.get('/logout')
  .then(function(response) {
    dispatch({ type: AUTH_USER, payload: '' });
    callback()
  })
  .catch(function (error) {
    throw error;
  })
  
};

export const fetchCurrentUser = () => dispatch => {
  axios.get('/current-user')
  .then(function(response) {
    dispatch({ type: AUTH_USER, payload: response.data})
  })
  .catch(function (error) {
    throw error;
  })
};

// update if we decide to add name to store and are able to update it
export const updateUser = (formData, callback) => dispatch => {
  debugger;
  axios.put('/current-user',
  formData)
  .then(function(response) {
    callback();
  })
  .catch(function (error) {
    throw error;
  })
};
