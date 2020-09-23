import React from "react";
import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import {connect, Provider} from "react-redux";
import routes from "./screens";
import store from "./store/configure-store";
import ProtectedRoute from "./shared/components/protected-route";
import {socket} from "./API";
import {getNotifications} from "./services/notifications";

const App = ({dispatch, currentUser}) => {
    // if (currentUser._id) {
    //     console.log(getNotifications)
    //     socket.on('msg', msg => dispatch(getNotifications(msg)));
    // }
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
export default App;
// const mapStateToProps = (state) => ({
//     currentUser: state.currentUser.currentUser,
//     // notifications: state.notifications.notifications,
// });
//
// export default connect(mapStateToProps)(App);
