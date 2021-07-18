import React, { useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { auth, createUserInFirebase, db } from "./firebase/firebase.utils";

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
  const { currentUser } = user;

  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      console.log("onautsh state change dispathicng current suer");
      if (user) {
        const { photoURL, uid, displayName, email } = user;
        const userRef = db.collection("users").doc(uid);
        const getRef = await userRef.get();
        const gotData = getRef.data();
        if (!gotData) {
          console.log("got no data");
          const userData = {
            image: photoURL,
            uid,
            userName: displayName,
            email,
            favoriteStations: [],
            assignedTasks: [],
          };
          dispatch(setCurrentUser(userData));
          createUserInFirebase(userData);
        }
        if (gotData) {
          console.log(gotData);
          const userData = {
            image: gotData.imageUrl,
            uid: gotData.uid,
            userName: gotData.userName,
            email: gotData.email,
            favoriteStations: gotData.favoriteStations,
            assignedTasks: gotData.assignedTasks,
          };

          dispatch(setCurrentUser(userData));
          createUserInFirebase(userData);
        }
      } else {
        dispatch(signOut());
        dispatch(logOut());
        history.push("/signin");
      }
    });
  }, [dispatch, history]);

  useEffect(() => {
    db.collection("users").onSnapshot((usersData) => {
      console.log("db user change, dispatching setUsers");
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
