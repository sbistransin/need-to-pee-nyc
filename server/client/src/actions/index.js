import axios from 'axios';
import { AUTH_ERROR, AUTH_USER, UPDATE_USER } from './types';
//const ROOT_URL = "http://localhost:8000";

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
    dispatch({ type: AUTH_ERROR, payload: 'Incorrect Username or Password' });
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
    dispatch({ type: AUTH_ERROR, payload: error.response.data });
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

export const updateUser = (formData) => dispatch => {
  axios.put('/current-user',
  formData)
  .then(function(response) {
    //dispatch({ type: UPDATE_USER, payload: response.data})
  })
  .catch(function (error) {
    throw error;
  })
};
