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
export const timestamp = firebase.firestore.Timestamp;
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
      favoriteStations: [],
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
      assign: null,
      created: new Date(),
      deadline: null,
      priority: [
        { name: "Urgent", active: false, color: "rgb(226, 68, 92)" },
        { name: "High", active: false, color: "rgb(253, 171, 61)" },
        { name: "Nomal", active: true, color: "rgb(52, 181, 228)" },
        { name: "Low", active: false, color: "rgb(5, 206, 145)" },
      ],
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

export const assignMember = (spaceId, stationId, taskId, userId) => {
  let allTasks = [];
  let task = [];

  const tasksRef = db
    .collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc(stationId)
    .collection("tasks")
    .doc("tasks");

  tasksRef
    .get()
    .then((taskData) => {
      allTasks = taskData.data().tasks;
      task = taskData.data().tasks[taskId];
      task = {
        ...task,
        assign: userId,
      };
    })
    .then(() => {
      tasksRef.set(
        {
          tasks: {
            ...allTasks,
            [taskId]: {
              ...task,
            },
          },
        },
        { merge: true }
      );
    });
};

export const unAssign = (spaceId, stationId, taskId) => {
  let task = [];
  const tasksRef = db
    .collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc(stationId)
    .collection("tasks")
    .doc("tasks");

  tasksRef
    .get()
    .then((taskData) => {
      task = taskData.data().tasks[taskId];
      task = {
        ...task,
        assign: null,
      };
    })
    .then(() => {
      tasksRef.update({
        tasks: {
          [taskId]: {
            ...task,
          },
        },
      });
    });
};

export const setPriority = (
  spaceId,
  stationId,
  taskId,
  allPriority,
  priority
) => {
  let allTasks = [];
  let task = [];

  // set all false
  allPriority.map((item) => (item, (item.active = false)));

  // set active on clicked element
  priority.active = true;

  const tasksRef = db
    .collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc(stationId)
    .collection("tasks")
    .doc("tasks");

  tasksRef
    .get()
    .then((taskData) => {
      allTasks = taskData.data().tasks;
      task = taskData.data().tasks[taskId];
      task = {
        ...task,
        priority: [...allPriority],
      };
    })
    .then(() => {
      tasksRef.set(
        {
          tasks: {
            ...allTasks,
            [taskId]: {
              ...task,
            },
          },
        },
        { merge: true }
      );
    });
};

export const setStatus = (
  spaceId,
  stationId,
  currentStatusType,
  taskId,
  status,
  statusType
) => {
  let allStatusType = {};
  let removedStatus = {};

  console.log(statusType);

  // remove taskId from current
  let removeCurrentId = currentStatusType.taskIds.filter((id) => id !== taskId);

  removedStatus = currentStatusType.taskIds = removeCurrentId;
  console.log(removedStatus[0]);

  // add taskId to new

  statusType[status.name] = {
    ...status,
    taskIds: [...status.taskIds, taskId],
  };

  console.log(statusType);

  // set taskIds

  const statusTypeRef = db
    .collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc(stationId)
    .collection("tasks")
    .doc("tasks");

  statusTypeRef.set(
    {
      statusType: { ...statusType },
    },
    { merge: true }
  );
};

export const convertDate = (timestamp) => {
  if (!timestamp) {
    return;
  }

  let myTime = timestamp.toDate();
  let date = myTime.getDate();
  let month = myTime.getMonth();
  let year = myTime.getFullYear();
  return `${date}.${month + 1}.${year}`;
};

export const setDeadlineDate = (spaceId, stationId, date, taskId) => {
  console.log(spaceId, stationId, date, taskId);
  let allTasks = [];
  let task = [];

  const tasksRef = db
    .collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc(stationId)
    .collection("tasks")
    .doc("tasks");

  tasksRef
    .get()
    .then((taskData) => {
      allTasks = taskData.data().tasks;
      task = taskData.data().tasks[taskId];
      task = {
        ...task,
        deadline: date,
      };
    })
    .then(() => {
      tasksRef.set(
        {
          tasks: {
            ...allTasks,
            [taskId]: {
              ...task,
            },
          },
        },
        { merge: true }
      );
    });
};

export const changeStatusTypeName = (
  spaceId,
  stationId,
  statusName,
  newName,
  statusTypeCheck
) => {
  let keys = Object.keys(statusTypeCheck);
  if (statusName === newName) {
    alert("same name");
    return;
  }
  if (keys.includes(newName)) {
    alert("name allready takaen");
    return;
  }

  let statusOrder = [];
  let statusType = {};

  const tasksRef = db
    .collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc(stationId)
    .collection("tasks")
    .doc("tasks");

  tasksRef
    .get()
    .then((taskData) => {
      statusOrder = taskData.data().statusOrder;
      let indexStatus = statusOrder.findIndex((item) => item === statusName);
      statusOrder[indexStatus] = newName;
      console.log(statusOrder);

      statusType = taskData.data().statusType;

      statusType = {
        ...statusType,
        [statusName]: {
          ...statusType[statusName],
          name: newName,
          id: newName,
        },
      };
      statusType[newName] = {
        ...statusType[statusName],
      };
      delete statusType[statusName];
    })
    .then(() => {
      tasksRef.update({
        statusOrder,
        statusType,
      });
    });
};

export const deleteStatusType = (spaceId, stationId, statusName) => {
  let statusOrder = [];
  let newOrder = [];
  let statusType = {};
  let tasks = {};

  const tasksRef = db
    .collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc(stationId)
    .collection("tasks")
    .doc("tasks");

  tasksRef
    .get()
    .then((taskData) => {
      // get all data
      statusOrder = taskData.data().statusOrder;
      statusType = taskData.data().statusType;
      tasks = taskData.data().tasks;

      // set status order
      newOrder = statusOrder.filter((item) => item !== statusName);
      console.log(newOrder);

      // set status type
      delete statusType[statusName];
      console.log(statusType);
    })
    .then(() => {
      tasksRef.update({
        statusOrder: [...newOrder],
        statusType,
      });
    });
};

export const createNewStatus = (spaceId, stationId, newName) => {
  let statusOrder = [];
  let statusType = {};

  const tasksRef = db
    .collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc(stationId)
    .collection("tasks")
    .doc("tasks");

  tasksRef
    .get()
    .then((taskData) => {
      // get all data
      statusOrder = taskData.data().statusOrder;
      statusType = taskData.data().statusType;

      // chekc conditions
      if (statusOrder.includes(newName)) {
        alert("name allready taken");
        return;
      }

      // set status order
      statusOrder.push(newName);

      // set status type
      statusType = {
        ...statusType,
        [newName]: {
          color: "#FDAB3D",
          id: newName,
          name: newName,
          taskIds: [],
        },
      };
      console.log(statusType);
    })
    .then(() => {
      tasksRef.update({
        statusOrder,
        statusType,
      });
    });
};

export const setTaskColor = (spaceId, stationId, statusName, newColor) => {
  console.log("setting new color", newColor);
  let statusType = {};

  const tasksRef = db
    .collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc(stationId)
    .collection("tasks")
    .doc("tasks");

  tasksRef
    .get()
    .then((taskData) => {
      // get all data
      statusType = taskData.data().statusType;

      // set status type
      statusType = {
        ...statusType,
        [statusName]: {
          ...statusType[statusName],
          color: newColor,
        },
      };
      console.log(statusType);
    })
    .then(() => {
      tasksRef.update({
        statusType,
      });
    });
};

export const addStationFavorite = (userId, stationId) => {
  const userRef = db.collection("users").doc(userId);
  userRef.update({
    favoriteStations: firebase.firestore.FieldValue.arrayUnion(stationId),
  });
};
export const removeStationFavorite = (userId, stationId) => {
  console.log(userId, stationId);
  const userRef = db.collection("users").doc(userId);
  userRef.update({
    favoriteStations: firebase.firestore.FieldValue.arrayRemove(stationId),
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
