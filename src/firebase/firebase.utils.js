import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCHAllXm9uaufWa4JBdr3dwV9qfmE2rSyI",
  authDomain: "onid-tm.firebaseapp.com",
  projectId: "onid-tm",
  storageBucket: "onid-tm.appspot.com",
  messagingSenderId: "141658461672",
  appId: "1:141658461672:web:47706ce9c15eb178dd805d",
};

firebase.initializeApp(firebaseConfig);

var provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

const LoginWithGoogle = () => {
  auth
    .signInWithPopup(provider)
    .then((result) => {
      console.log(result);
    })
    .catch((error) => {
      console.log(error.message);
    });
};

const db = firebase.firestore();

export { db, auth, LoginWithGoogle };
