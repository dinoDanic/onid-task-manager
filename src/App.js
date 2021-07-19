import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  auth,
  createUserInFirebase,
  db,
  registerUserFb,
} from "./firebase/firebase.utils";

import { setCurrentUser, signOut, setUsers } from "./redux/user/user.actions";
import { logOut } from "./redux/space/space.actions";

import Space from "./pages/space/space.component.class";
import Home from "./pages/home/home.component.class";
import DockStation from "./pages/dock-station/dock-station.component";
import Station from "./pages/station/station.component";
import SignIn from "./pages/sing-in/sign-in.component.class";
import WelcomePage from "./pages/welcome-page/welcome-page.component";
import ProtectedRoute from "./components/protectedRoute/protectedRoute.component";
import EnterStation from "./pages/enter-station/enter-station.component";

import "./app.styles.scss";
import { AnimatePresence } from "framer-motion";

function App() {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const history = useHistory();
  const signInUrl = history.location.pathname.split("/")[1];
  const { currentUser } = user;

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      console.log("auth change App", user);
      if (user) {
        const { uid } = user;
        const userRef = await db.collection("users").doc(uid).get();
        if (userRef.exists) {
          // ima usera samo dispetchaj
          const userData = userRef.data();
          dispatch(setCurrentUser(userData));
          console.log(signInUrl);
          if (signInUrl === "signin") {
            history.push("/");
          }
        } else {
          // nema usera u db. vjerovatno login putem googla
          registerUserFb(user, user.displayName);
        }
      } else {
        history.push("/signin");
        dispatch(signOut());
        dispatch(logOut());
      }
    });
  }, []);

  useEffect(() => {
    db.collection("users").onSnapshot((usersData) => {
      console.log("db users changed, dispatching setUsers");
      let users = [];
      usersData.forEach((userData) => {
        users.push(userData.data());
      });
      dispatch(setUsers(users));
    });
  }, [dispatch]);

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
          <ProtectedRoute
            path="/s/:id/e/:id"
            component={EnterStation}
            isAuth={currentUser}
          />
        </>
      )}
      {!currentUser && <Route path="/signin" component={WelcomePage} />}
    </div>
  );
}

export default App;
