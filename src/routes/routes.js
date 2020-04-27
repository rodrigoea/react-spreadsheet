import React from "react";
import { Route, Switch } from "react-router-dom";
import Home from "../pages/Home";
import Spreadsheet from "../pages/Spreadsheet";
import NotFound from "../pages/NotFound";

const routes = [
  { path: "/", exact: true, component: Home },
  { path: "/spreadsheet/:id", component: Spreadsheet },
  { component: NotFound },
];

const renderRoutes = () => {
  return (
    <Switch>
      {routes.map((route, i) => {
        return (
          <Route
            key={i}
            path={route.path}
            exact={route.exact}
            strict={route.strict}
            render={(props) => <route.component {...props} route={route} />}
          />
        );
      })}
    </Switch>
  );
};

export default renderRoutes;
