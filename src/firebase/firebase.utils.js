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

export const fieldValue = firebase.firestore.FieldValue;

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
      favoriteSpace: "",
    });
  } else {
    userRef.update({
      email,
      imageUrl: image,
      uid,
      userName,
    });
  }
};

const createNewSpace = async (name, currentUser, color, setLayer) => {
  const { uid } = currentUser;
  if (!name) {
    alert("Space name is req");
    return;
  }

  await db
    .collection("space")
    .add({
      name: name,
      admin: uid,
      color: color,
      members: firebase.firestore.FieldValue.arrayUnion(uid),
      created: new Date(),
      description: "Add description",
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

const createNewStation = (spaceId, stationName, modules, statusType) => {
  const stationsRef = db
    .collection("space")
    .doc(spaceId)
    .collection("stations");

  stationsRef
    .add({
      name: stationName,
      created: new Date(),
      modules,
      statusType,
    })
    .then((data) => {
      let id = data.id;
      stationsRef.doc(id).set(
        {
          stationsId: id,
        },
        { merge: true }
      );
    });
};

export const removeMember = (spaceId, memberId) => {
  db.collection("space")
    .doc(spaceId)
    .update({
      members: firebase.firestore.FieldValue.arrayRemove(memberId),
    });
};

export const newAdmin = (spaceId, memberId) => {
  db.collection("space").doc(spaceId).update({
    admin: memberId,
  });
};

export const setSpaceAsFavorite = (userId, spaceId) => {
  db.collection("users").doc(userId).update({
    favoriteSpace: spaceId,
  });
};

export const getFavoriteStations = async (favoriteSpaceId) => {
  if (!favoriteSpaceId) return;
  const colRef = db
    .collection("space")
    .doc(favoriteSpaceId)
    .collection("stations");
  const querySnapshop = await colRef.get();
  if (querySnapshop.empty) {
    console.log("empity");
  }
  let list = [];
  querySnapshop.forEach((data) => {
    list.push(data.data());
  });
  return list;
};

export const renameStation = (spaceId, stationId, newName) => {
  db.collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc(stationId)
    .update({
      name: newName,
    });
};

export const renameSpace = (spaceId, newName) => {
  db.collection("space").doc(spaceId).update({
    name: newName,
  });
};

export const deleteSpace = (spaceId) => {
  db.collection("space").doc(spaceId).delete();
};

export const updateColorOfSpace = (spaceId, color) => {
  db.collection("space").doc(spaceId).update({
    color: color,
  });
};

export const changeDescriptionOfSpace = (spaceId, newDesc) => {
  db.collection("space").doc(spaceId).update({
    description: newDesc,
  });
};

export {
  db,
  auth,
  LoginWithGoogle,
  loginWithEmailAndPassword,
  createUserInFirebase,
  createNewSpace,
  createNewStation,
};
