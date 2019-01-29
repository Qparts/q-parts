import React from 'react';
import { Route, Redirect } from 'react-router-dom';

// wrap <Route> and use this everywhere instead, then when
// sub routes are added to any route it'll work
const RouteWithSubRoutes = route => (
 <Route
  path={route.path}
  render={props => (
   // pass the sub-routes down to keep nesting
   route.isAuth || route.isAuth === undefined ? (
    <route.component {...props} {...route} routes={route.routes} />
   ) : (
     <Redirect to={{
      pathname: route.redirectTo,
     }} />
    )
  )
  }
 />
);

export default RouteWithSubRoutes;