export const LOGIN_FAILURE = 'LOGIN_FAILURE';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_REQUESTING = 'LOGIN_REQUESTING';
export const LOGOUT_SUCCESS = 'LOGOUT_SUCCESS';

export const login = () => {
  return async (dispatch) => {
    dispatch(loginRequesting());
    try {
      dispatch(loginSuccess());
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

export const logout = () => {
  return async (dispatch) => {};
};
