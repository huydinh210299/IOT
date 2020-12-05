import {
  LOGIN_FAILURE,
  LOGIN_REQUESTING,
  LOGIN_SUCCESS,
  LOGOUT_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_SUCCESS,
  REGISTER_REQUESTING,
  AUTH_FAILURE,
  AUTH_SUCCESS,
  AUTH_REQUESTING,
} from '../actions/authAction';

const auth = (
  state = {
    token: localStorage.getItem('token') || null,
    isAuthenticated: false,
    isRequesting: false,
    errorState: false,
    errorMsg: null,
    isAuthenticating: false,
    user: {},
  },
  action,
) => {
  switch (action.type) {
    case LOGOUT_SUCCESS:
      return Object.assign({}, state, {
        token: null,
        isAuthenticated: false,
        isRequesting: false,
      });
    case REGISTER_REQUESTING:
    case LOGIN_REQUESTING:
      return Object.assign({}, state, {
        isRequesting: true,
        errorState: false,
        errorMsg: null,
      }); // lay data object cu, tao object moi, assign data cho object moi
    case LOGIN_SUCCESS:
      return Object.assign({}, state, {
        token: action.data.accessToken,
        isAuthenticated: true,
        isRequesting: false,
      });
    case LOGIN_FAILURE:
      return Object.assign({}, state, {
        isAuthenticated: false,
        isRequesting: false,
        errorState: action.errorState,
        errorMsg: action.errorMsg,
      });
    case REGISTER_SUCCESS:
      return {
        ...state,
        isRequesting: false,
        isAuthenticated: false,
        user: action.data,
      };
    case REGISTER_FAILURE:
      return {
        ...state,
        isRequesting: false,
        user: {},
      };
    case AUTH_REQUESTING:
      return {
        ...state,
        isAuthenticating: true,
      };
    case AUTH_SUCCESS:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: true,
      };
    case AUTH_FAILURE:
      return {
        ...state,
        isAuthenticating: false,
        isAuthenticated: false,
      };
    default:
      return state;
  }
};

export default auth;
