// import Loading from "components/common/Loading";
import PrivateRoute from '../components/Shared/PrivateRoute';

import React, { Suspense, lazy } from 'react';

import { Route, Switch, useLocation } from 'react-router-dom';

// import ErrorNotFound from '../components/common/ErrorNotFound';

import LayoutMenu from '../components/Layout/LayoutMenu';
import { Card } from 'antd';

const Home = lazy(() => import('./HomeRoute'));
const Statistic = lazy(() => import('./StatisticRoute'));
const RealTime = lazy(() => import('./RealTimeRoute'));
// const Rooms = lazy( () => import("routers/RoomsRoute"));
// const Deveices = lazy( () => import("routers/DeveicesRoute"));
// const Profile = lazy( () => import("routers/ProfileRoute"));
// const Test = lazy( () => import("components/Test"));

function MainAppRoute(props) {
  return (
    <LayoutMenu>
      <Suspense fallback={<div>Loading...</div>}>
        <Switch>
          <PrivateRoute component={Home} exact path="/home" />
          <PrivateRoute component={Statistic} exact path="/statistic" />
          <PrivateRoute component={RealTime} exact path="/realtime" />
          {/* <PrivateRoute component={Rooms} path="/rooms" />
          <PrivateRoute component={Deveices} path="/deveices" />
          <PrivateRoute component={Profile} path="/profile" />
          <PrivateRoute component={Test} path="/test" /> */}

          {/* <Route component={ErrorNotFound} path="*" /> */}
        </Switch>
      </Suspense>
    </LayoutMenu>
  );
}

export default MainAppRoute;
