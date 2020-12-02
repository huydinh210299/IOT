import React from 'react';
import { Redirect, Route, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import { getCookie } from 'utils/cookie';
import { checkToken } from '../../utils/checkToken';

function PrivateRoute({ component: Component, ...rest }) {
  const token = localStorage.getItem('token');
  const isAuthenticated = useSelector(
    (state) => state.authReducer.isAuthenticated,
  );
  //   const token = getCookie('token');
  //const authen = checkToken(token);
  //   console.log('authen: ' + authen);
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={(props) => {
        return authen === true ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: '/login',
              state: { from: history.location },
            }}
          />
        );
      }}
    />
  );
}

export default PrivateRoute;
