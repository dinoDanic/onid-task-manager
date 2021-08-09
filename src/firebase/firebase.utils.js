import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
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
export var storage = firebase.storage();

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

export const registerUserFb = async (user, userName) => {
  const { uid, email, photoURL } = user;
  const userRef = await db.collection("users").doc(uid).get();
  if (!userRef.exists) {
    await db.collection("users").doc(uid).set({
      userName: userName,
      uid: uid,
      email: email,
      assignedTasks: [],
      favoriteStations: [],
      imageUrl: photoURL,
      open: true,
    });
    const userImage = await db.collection("users").doc(uid).get();
    const userImageUrl = userImage.data().imageUrl;
    if (userImageUrl === null) {
      db.collection("users").doc(uid).set(
        {
          imageUrl:
            "https://i.pinimg.com/originals/30/b0/d5/30b0d5530cd5accbba769802de6cb9af.jpg",
        },
        { merge: true }
      );
    }
  } else {
    console.log("no code");
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
      created: firebase.firestore.FieldValue.serverTimestamp(),
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

export const createNewStation2 = async (
  spaceId,
  stationName,
  statusType,
  statusOrder,
  modules
) => {
  let stationId = "123";
  const stationsRef = db
    .collection("space")
    .doc(spaceId)
    .collection("stations");

  await stationsRef
    .add({
      name: stationName,
      description: "Add description",
      fromSpaceId: spaceId,
    })
    .then((data) => {
      let id = data.id;
      stationId = id;
      stationsRef.doc(id).set(
        {
          stationId: id,
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
  return stationId;
};
export const createNewStationDemo = async (
  spaceId,
  stationName,
  statusType,
  statusOrder,
  modules
) => {
  let stationId = "123";
  const stationsRef = db
    .collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc("demoStation0");

  await stationsRef
    .set({
      name: stationName,
      description: "Add description",
      fromSpaceId: spaceId,
      stationId: "demoStation0",
    })
    .then(() => {
      stationsRef.collection("tasks").doc("tasks").set({
        tasks: null,
        statusType,
        statusOrder,
      });
      stationsRef.collection("modules").doc("modules").set({
        modules,
      });
    });
  return stationId;
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
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      deadline: null,
      fromSpaceId: spaceId,
      fromStationId: stationId,
      message: [],
      description: "Add description",
      done: false,
      subtasks: [],
      priority: [
        { name: "Urgent", active: false, color: "rgb(226, 68, 92)" },
        { name: "High", active: false, color: "rgb(253, 171, 61)" },
        { name: "Normal", active: true, color: "rgb(52, 181, 228)" },
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

export const createNewSubtask = async (spaceId, stationId, taskId, content) => {
  let v4 = uuidv4();

  const docRef = db
    .collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc(stationId)
    .collection("tasks")
    .doc("tasks");

  const getRef = await docRef.get();
  const data = getRef.data();

  const newSubtask = {
    id: v4,
    created: new Date(),
    content: content,
  };

  const newData = {
    ...data,
    tasks: {
      ...data.tasks,
      [taskId]: {
        ...data.tasks[taskId],
        subtasks: [...data.tasks[taskId].subtasks, newSubtask],
      },
    },
  };

  docRef.set({
    ...newData,
  });
};

export const updateSubDrag = (spaceId, stationId, taskId, newData) => {
  let task = {};
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
      task = taskData.data().tasks[taskId];
      tasks = taskData.data().tasks;
      console.log(taskData.data());
      tasks = {
        ...tasks,
        [taskId]: {
          ...task,
          subtasks: [...newData],
        },
      };
    })
    .then(() => {
      tasksRef.update({
        tasks: {
          ...tasks,
        },
      });
    });
};
export const createNewTaskDemo = async (
  statusName,
  newTaskName,
  userId,
  assign,
  deadline,
  done,
  priority
) => {
  const docRef = db
    .collection("space")
    .doc("dummySpace0")
    .collection("stations")
    .doc("demoStation0")
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
      assign: assign,
      created: new Date(),
      timeStamp: firebase.firestore.FieldValue.serverTimestamp(),
      deadline: deadline,
      fromSpaceId: "dummySpace0",
      fromStationId: "demoStation0",
      message: [],
      description: "Add description",
      done: done,
      priority: priority,
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
  console.log(spaceId, memberId);
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

    let list = [];
    querySnapshop.forEach((data) => {
      list.push(data.data());
    });
    return list;
  }
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
  db.collection("space")
    .doc(spaceId)
    .collection("stations")
    .get()
    .then((stationQuery) => {
      if (!stationQuery.empty) {
        stationQuery.forEach((stationDoc) => {
          db.collection("space")
            .doc(spaceId)
            .collection("stations")
            .doc(stationDoc.id)
            .collection("tasks")
            .doc("tasks")
            .delete();
          db.collection("space")
            .doc(spaceId)
            .collection("stations")
            .doc(stationDoc.id)
            .collection("modules")
            .doc("modules")
            .delete();
          stationDoc.ref.delete();
        });
      }
    })
    .then(() => {
      db.collection("space").doc(spaceId).delete();
    });
};

export const deleteStation = async (spaceId, stationId) => {
  await db
    .collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc(stationId)
    .collection("modules")
    .doc("modules")
    .delete();

  await db
    .collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc(stationId)
    .collection("tasks")
    .doc("tasks")
    .collection("msg")
    .get()
    .then((query) => {
      query.forEach((msgDoc) => {
        db.collection("space")
          .doc(spaceId)
          .collection("stations")
          .doc(stationId)
          .collection("tasks")
          .doc("tasks")
          .collection("msg")
          .doc(msgDoc.id)
          .delete();
      });
    })
    .then(() => {
      db.collection("space")
        .doc(spaceId)
        .collection("stations")
        .doc(stationId)
        .collection("tasks")
        .doc("tasks")
        .delete();

      db.collection("space")
        .doc(spaceId)
        .collection("stations")
        .doc(stationId)
        .delete();
    });
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

export const changeTaskName = async (spaceId, stationId, newName, taskId) => {
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
        content: newName,
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
  let task = {};
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
      task = taskData.data().tasks[taskId];
      tasks = taskData.data().tasks;
      console.log(taskData.data());
      tasks = {
        ...tasks,
        [taskId]: {
          ...task,
          assign: [],
        },
      };
    })
    .then(() => {
      console.log(tasks);
      tasksRef.update({
        tasks: {
          ...tasks,
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
  allPriority.map((item) => (item.active = false));

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
  return `${date}.${month + 1}`;
};

export const setDeadlineDate = (spaceId, stationId, date, taskId) => {
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
export const setTimeTask = async (spaceId, stationId, time, taskId) => {
  let allTasks = [];
  let task = [];

  const tasksRef = db
    .collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc(stationId)
    .collection("tasks")
    .doc("tasks");

  await tasksRef
    .get()
    .then((taskData) => {
      allTasks = taskData.data().tasks;
      task = taskData.data().tasks[taskId];
      task = {
        ...task,
        time: time,
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
          color: "rgb(234, 236, 239)",
          fontColor: "rgb(246, 91, 196)",
          id: newName,
          name: newName,
          taskIds: [],
          open: true,
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
          fontColor: newColor,
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

export const updateUser = (userId, user) => {
  const userRef = db.collection("users").doc(userId);
  userRef.update({
    ...user,
  });
};

export const getTaskData = (spaceId, stationId) => {
  return db
    .collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc(stationId)
    .get()
    .then((data) => {
      return data.data();
    });
};

export const removeStarFavorite = (userId, stationId) => {
  db.collection("users")
    .doc(userId)
    .update({
      favoriteStations: firebase.firestore.FieldValue.arrayRemove(stationId),
    });
};
export const addStarFavorite = (userId, stationId) => {
  db.collection("users")
    .doc(userId)
    .update({
      favoriteStations: firebase.firestore.FieldValue.arrayUnion(stationId),
    });
};

/* export const unAssignFromAllTasks = (assignedArray, spaceId, userId) => {
  let mustRemoveTasks = assignedArray.filter(
    (item) => item.fromSpaceId === spaceId
  );
  console.log(mustRemoveTasks);
  mustRemoveTasks.map((task) => {
    let allTasks = {};
    const { fromSpaceId, fromStationId } = task;
    const tasksRef = db
      .collection("space")
      .doc(fromSpaceId)
      .collection("stations")
      .doc(fromStationId)
      .collection("tasks")
      .doc("tasks");

    tasksRef
      .get()
      .then((tasksData) => {
        allTasks = tasksData.data().tasks;
        allTasks[task.id].assign = [];
      })
      .then(() => {
        tasksRef.set(
          {
            tasks: {
              ...allTasks,
            },
          },
          { merge: true }
        );
      });
  });
}; */

export const createMessageToTask = (
  spaceId,
  stationId,
  newMessage,
  userId,
  taskId
) => {
  db.collection("space")
    .doc(spaceId)
    .collection("stations")
    .doc(stationId)
    .collection("tasks")
    .doc("tasks")
    .collection("msg")
    .add({
      message: newMessage,
      from: userId,
      created: new Date(),
      taskId: taskId,
    });
};

export const toggleStatus = (spaceId, stationId, statusName) => {
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
      statusType = taskData.data().statusType;
      statusType = {
        ...statusType,
        [statusName]: {
          ...statusType[statusName],
          open: !statusType[statusName].open,
        },
      };
    })
    .then(() => {
      tasksRef.update({
        statusType,
      });
    });
};

export const setOpenFb = (userId, currentOpen) => {
  db.collection("users").doc(userId).update({
    open: !currentOpen,
  });
};

export const setTaskDescription = (
  spaceId,
  stationId,
  taskId,
  taskDescription
) => {
  let task = {};
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
      task = taskData.data().tasks[taskId];
      tasks = taskData.data().tasks;
      console.log(taskData.data());
      tasks = {
        ...tasks,
        [taskId]: {
          ...task,
          description: taskDescription,
        },
      };
    })
    .then(() => {
      console.log(tasks);
      tasksRef.update({
        tasks: {
          ...tasks,
        },
      });
    });
};

export const toggleCheckBox = async (
  spaceId,
  stationId,
  taskId,
  currentCheck
) => {
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
        done: !currentCheck,
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

export { db, auth, LoginWithGoogle, loginWithEmailAndPassword, createNewSpace };
