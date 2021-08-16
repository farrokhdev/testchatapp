import { useAuth, useResolved } from "hooks";
import { useEffect, useRef } from "react";
import "semantic-ui-css/semantic.min.css";
import { Switch, Route } from "react-router-dom";
import { Chat, Login, Signup } from "components";
import { useHistory } from "react-router-dom";
import { AppProvider } from "context";
import Lottie from "lottie-web";

export const App = () => {
  const { authUser } = useAuth();
  const authResolved = useResolved(authUser);
  const history = useHistory();
  const loaderRef = useRef(null);

  useEffect(() => {
    Lottie.loadAnimation({
      container: loaderRef.current,
      renderer: "svg",
      loop: true,
      autoplay: true,
      animationData: require("./loader.json"),
    });
  }, []);

  useEffect(() => {
    if (authResolved) {
      history.push(!!authUser ? "/" : "/login");
    }
  }, [authUser, authResolved, history]);
  return authResolved ? (
    <AppProvider authUser={authUser}>
      <div className="app">
        <Switch>
          <Route exact path="/">
            <Chat />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
        </Switch>
      </div>
    </AppProvider>
  ) : (
    <div className="loading" ref={loaderRef}></div>
  );
};
