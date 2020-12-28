import ChooseArea from '../components/ChooseArea/ChooseArea';
import React from 'react';
import { Route, Switch, useRouteMatch } from 'react-router-dom';

function ChooseAreaRoute(props) {
  const { path, url } = useRouteMatch();
  return (
    <Switch>
      <Route path={path}>
        <ChooseArea />
      </Route>
    </Switch>
  );
}

export default ChooseAreaRoute;
