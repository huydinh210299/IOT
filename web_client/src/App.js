import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/Shared/PrivateRoute';

import Login from './components/Login/Login';
import MainAppRoutes from './routers/MainAppRoute';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { authAction } from './redux/actions/authAction';
import { Spin } from 'antd';

function App() {
  const dispatch = useDispatch();

  const { isAuthenticating } = useSelector(state => state.authReducer);
  useEffect(() => {
    // console.log("1");
    // const token = localStorage.getItem("token");
    // if (!!token) {
    //   dispatch(authAction());
    // }
  });
  return (
    <div style={{ height: '100%' }}>
      {isAuthenticating ?
        (<Spin size="large" spinning={isAuthenticating}>
          <Router>
            <Switch>
              <Route component={Login} path="/login" />
              <PrivateRoute component={MainAppRoutes} path="*" exact />
            </Switch>
          </Router>
        </Spin>)
        :
        (
          <Router>
            <Switch>
              <Route component={Login} path="/login" />
              <PrivateRoute component={MainAppRoutes} path="*" exact />
            </Switch>
          </Router>
        )}
    </div>
  );
}

export default App;
