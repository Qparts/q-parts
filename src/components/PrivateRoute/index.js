import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const privateRoute = ({ component, redirectTo, ...props }) => {
 return <Route {...props} render={routeProps => {
  const Wrapper = component;

  return props.fakeAuth ? (
   <Wrapper {...routeProps} {...props} />
  ) : (
    <Redirect to={{
     pathname: redirectTo,
    }} />
   )
 }} />
};

export default privateRoute;