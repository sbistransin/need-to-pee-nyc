import axios from 'axios';
import { AUTH_ERROR, AUTH_USER } from './types';
const ROOT_URL = "http://localhost:8000";


// export function signin(formData) {
//   axios.post(`${ROOT_URL}/login`, formData)
//   .then(function (response) {
//     debugger;
//     return {
//       type: AUTH_USER,
//       payload: response.data
//     }
//   })
//   .catch(function (error) {
//     debugger;
//     return { 
//       type: AUTH_ERROR,
//       payload: error };
//   });;
// }

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
