import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import routes from "./screens";
import store from "./store/configure-store";
import ProtectedRoute from "./shared/components/protected-route";

export default function App() {
  return (
      <div className="App">
          <div className={"my-wrapper"}>

          <Provider store={store}>
          <Router>
            <Switch>
              {routes.map((route, index) => {
              return route.isProtected ? (
                <ProtectedRoute key={index} {...route} />
              ) :
                    (
                <Route key={index} {...route} />
              );
            })}
            </Switch>
          </Router>
        </Provider>
          </div>
      </div>
  );
}
