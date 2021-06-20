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

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}
const db = firebase.firestore();

var provider = new firebase.auth.GoogleAuthProvider();
const auth = firebase.auth();

const LoginWithGoogle = () => {
  auth.signInWithPopup(provider).catch((error) => {
    console.log(error.message);
  });
};

const loginWithEmailAndPassword = (email, password) => {
  auth.signInWithEmailAndPassword(email, password).catch((error) => {
    var errorMessage = error.message;
    console.log(errorMessage);
  });
};

const createUserInFirebase = async ({ email, image, uid, userName }) => {
  const userRef = db.doc(`users/${uid}`);
  const snapShot = await userRef.get();
  if (!snapShot.exists) {
    console.log("no data, creating");
    userRef.set({
      email,
      imageUrl: image,
      uid,
      userName,
    });
  } else {
    console.log("we got u allready, updating ");
    userRef.update({
      email,
      imageUrl: image,
      uid,
      userName,
    });
  }
};

const createNewSpace = async (name, creatorId, color, setLayer) => {
  if (!name) {
    alert("Space name is req");
    return;
  }
  await db
    .collection("space")
    .add({
      name: name,
      admin: creatorId,
      color: color,
      members: firebase.firestore.FieldValue.arrayUnion(creatorId),
    })
    .then((data) => {
      let id = data.id;
      db.collection("space").doc(id).set(
        {
          spaceId: id,
        },
        { merge: true }
      );
    });
  if (setLayer) {
    setLayer(false);
  }
};

export {
  db,
  auth,
  LoginWithGoogle,
  loginWithEmailAndPassword,
  createUserInFirebase,
  createNewSpace,
};
