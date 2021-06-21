import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth, createUserInFirebase } from "./firebase/firebase.utils";

import { signIn, signOut } from "./redux/user/user.actions";

import Space from "./pages/space/space.component.class";
import Home from "./pages/home/home.component.class";
import DockStation from "./pages/dock-station/dock-station.component";
import Station from "./pages/station/station.component";
import SignIn from "./pages/sing-in/sign-in.component.class";
import ProtectedRoute from "./components/protectedRoute/protectedRoute.component";

import "./app.styles.scss";
import { AnimatePresence } from "framer-motion";

function App() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    console.log("App useEffect");
    auth.onAuthStateChanged((user) => {
      if (user) {
        const { photoURL, uid, displayName, email } = user;
        const userData = {
          image: photoURL,
          uid,
          userName: displayName,
          email,
        };
        dispatch(signIn(userData));
        createUserInFirebase(userData);
        /*  history.push("/"); */
      } else {
        dispatch(signOut());
        history.push("/signin");
      }
    });
  }, [dispatch, history]);

  return (
    <div className="app">
      {currentUser && (
        <>
          <Space />
          <ProtectedRoute
            exact
            path={["/", "/signin"]}
            component={Home}
            isAuth={currentUser}
          />
          <AnimatePresence>
            <ProtectedRoute
              path="/s/:id"
              component={Station}
              isAuth={currentUser}
            />
          </AnimatePresence>
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
