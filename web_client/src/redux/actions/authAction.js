import userApi from '../../api/userApi';
import axiosClient from '../../api/axiosClient';
import { notifSuccess } from '../../components/Shared/Notification';
export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_REQUESTING = 'LOGIN_REQUESTING';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';
export const REGISTER_FAILURE = 'REGISTER_FAILURE';
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS';
export const REGISTER_REQUESTING = 'REGISTER_REQUESTING';
export const AUTH_FAILURE = 'AUTH_FAILURE';
export const AUTH_SUCCESS = 'AUTH_SUCCESS';
export const AUTH_REQUESTING = 'AUTH_REQUESTING';

export const loginAction = (data) => {
  return async (dispatch) => {
    dispatch(loginRequesting());
    try {
      const response = await userApi.login(data);
      dispatch(loginSuccess(response));
    } catch (error) {
      dispatch(loginFailure());
    }
  };
};

const loginRequesting = () => ({
  type: LOGIN_REQUESTING,
});

const loginSuccess = (data) => ({
  type: LOGIN_SUCCESS,
  data,
});

const loginFailure = (err) => ({
  type: LOGIN_FAILURE,
  err,
});

export const registerAction = (data) => {
  return async (dispatch) => {
    data = { ...data, role: 'admin' };
    dispatch(registerRequesting());
    try {
      const response = await axiosClient.post('api/auth/register', data);
      notifSuccess(
        'Register successfully!',
        `Now you can login with email ${response.email}`,
      );
      dispatch(registerSuccess(response));
    } catch (error) {
      dispatch(registerFailure());
    }
  };
};

const registerRequesting = () => ({
  type: REGISTER_REQUESTING,
});

const registerSuccess = (data) => ({
  type: REGISTER_SUCCESS,
  data,
});

const registerFailure = (err) => ({
  type: REGISTER_FAILURE,
  err,
});

export const authAction = (token) => {
  return async (dispatch) => {
    console.log('old token: ', token);
    dispatch(authRequesting());
    try {
      const response = await axiosClient.post('api/auth');
      dispatch(authSuccess());
    } catch (error) {
      dispatch(authFailure());
    }
  };
};

const authRequesting = () => ({
  type: AUTH_REQUESTING,
});

const authSuccess = (data) => ({
  type: AUTH_SUCCESS,
  data,
});

const authFailure = (err) => ({
  type: AUTH_FAILURE,
  err,
});

export const logoutAction = () => {
  return async (dispatch) => {
    try {
      dispatch(logoutSuccess());
    } catch (error) {}
  };
};

const logoutSuccess = () => ({
  type: LOGOUT_SUCCESS,
});
