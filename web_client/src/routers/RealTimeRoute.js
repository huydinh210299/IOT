import RealTime from '../components/RealTime/RealTime';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

function RealTimeRoute(props) {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={path}>
        <RealTime />
      </Route>
    </Switch>
  );
}

export default RealTimeRoute;
