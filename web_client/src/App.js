import logo from './logo.svg';
import './App.css';
import 'antd/dist/antd.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import PrivateRoute from './components/Shared/PrivateRoute';

import Login from './components/Login/Login';
import MainAppRoutes from './routers/MainAppRoute';

function App() {
  return (
    <Router>
      <Switch>
        <Route component={Login} path="/login" />
        <PrivateRoute component={MainAppRoutes} path="*" exact />
      </Switch>
    </Router>
  );
}

export default App;
