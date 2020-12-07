import Statistic from '../components/Statistic/Statistic';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

function StatisticRoute(props) {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={path}>
        <Statistic />
      </Route>
    </Switch>
  );
}

export default StatisticRoute;
