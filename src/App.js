import React, { useEffect } from "react";
import { auth } from "./firebase/firebase.utils";
import { Route, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import { signIn, signOut } from "./redux/user/user.actions";

import Space from "./pages/space/space.component";
import Home from "./pages/home/home.component";
import DockStation from "./pages/dock-station/dock-station.component";
import Station from "./pages/station/station.component";
import SignIn from "./pages/sing-in/sign-in.component.class";
import ProtectedRoute from "./components/protectedRoute/protectedRoute.component";

import "./app.styles.scss";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();
  let unsubscribeFromAuth = null;

  useEffect(() => {
    unsubscribeFromAuth = auth.onAuthStateChanged((user) => {
      if (user) {
        const { photoURL, uid, displayName, email } = user;
        const userData = {
          image: photoURL,
          uid,
          userName: displayName,
          email,
        };
        dispatch(signIn(userData));
        history.push("/");
      } else {
        dispatch(signOut());
        history.push("/signin");
      }
    });
    return () => {
      unsubscribeFromAuth();
    };
  }, []);

  return (
    <div className="app">
      {currentUser && (
        <>
          <Space />
          <ProtectedRoute
            exact
            path="/"
            component={Home}
            isAuth={currentUser}
          />
          <ProtectedRoute
            path="/s/:id"
            component={Station}
            isAuth={currentUser}
          />
          <ProtectedRoute
            exact
            path="/s/:id"
            component={DockStation}
            isAuth={currentUser}
          />
        </>
      )}
      {!currentUser && <Route path="/signin" component={SignIn} />}
    </div>
  );
}

export default App;
