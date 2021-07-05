import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { v4 as uuidv4 } from "uuid";

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

export const createNewStation2 = (
  spaceId,
  stationName,
  statusType,
  statusOrder,
  modules
) => {
  const stationsRef = db
    .collection("space")
    .doc(spaceId)
    .collection("stations");

  stationsRef
    .add({
      name: stationName,
      description: "Add description",
    })
    .then((data) => {
      let id = data.id;
      stationsRef.doc(id).set(
        {
          stationsId: id,
        },
        { merge: true }
      );
      stationsRef.doc(id).collection("tasks").doc("tasks").set({
        tasks: null,
        statusType,
        statusOrder,
      });
      stationsRef.doc(id).collection("modules").doc("modules").set({
        modules,
      });
    });
};

export const createNewTask = async (
  spaceId,
  stationId,
  statusName,
  newTaskName,
  userId
) => {
  const docRef = db
    .collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc(stationId)
    .collection("tasks")
    .doc("tasks");
  const getData = await docRef.get();
  const data = getData.data();
  const { statusType, tasks } = data;

  // TASKS
  let v4 = uuidv4();
  let newTask = {
    [v4]: {
      id: v4,
      content: newTaskName,
      createdBy: userId,
    },
  };
  let newTasks = {
    ...tasks,
    ...newTask,
  };

  // STATUS TYPE

  let taskIds = statusType[statusName].taskIds;

  taskIds.push(v4);

  const newData = {
    ...data,
    statusType: {
      ...statusType,
      [statusName]: {
        ...data.statusType[statusName],
        taskIds: taskIds,
      },
    },
    tasks: newTasks,
  };
  docRef.set({
    ...newData,
  });
};

export const updateDrag = (spaceId, stationId, newState) => {
  console.log("updateing");
  db.collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc(stationId)
    .collection("tasks")
    .doc("tasks")
    .set({
      ...newState,
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

export const changeDescriptionOfStation = (spaceId, stationId, newDesc) => {
  db.collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc(stationId)
    .update({
      description: newDesc,
    });
};
export const changeNameOfStation = (spaceId, stationId, newName) => {
  console.log(spaceId, stationId, newName);
  db.collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc(stationId)
    .update({
      name: newName,
    });
};

export const updateModulesDb = (spaceId, stationId, module, modules) => {
  let objIndex = modules.findIndex((item) => item.name === module.name);
  modules[objIndex].active = !modules[objIndex].active;
  db.collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc(stationId)
    .collection("modules")
    .doc("modules")
    .set({
      modules,
    });
};

export const getUserDataWithId = async (userId) => {
  const userRef = db.collection("users").doc(userId);
  const userData = await userRef.get();
  const data = userData.data();
  return data;
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
