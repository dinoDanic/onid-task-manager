import {
  createNewTaskDemo,
  createNewStationDemo,
  auth,
} from "../../firebase/firebase.utils";
import { db, fieldValue, registerUserFb } from "../../firebase/firebase.utils";
import {
  names,
  dummySpaceNames,
  dummySpaceColor,
  dummyImages,
  statusType,
  statusOrder,
  modules,
} from "./users";

export const createDummyUsers = async () => {
  for (let u = 0; u < 5; u++) {
    await db
      .collection("users")
      .doc(names[u].name)
      .set({
        userName: names[u].name,
        uid: names[u].name,
        email: `${names[u].name.toLowerCase()}@onid-tm.com`,
        assignedTasks: [],
        favoriteStations: [],
        imageUrl: dummyImages[u].imageUrl,
        open: true,
      });
  }
};
export const createDummySpace = async () => {
  const findUser = await db
    .collection("users")
    .where("email", "==", "demo@demo.com")
    .get();
  if (!findUser) {
    alert("no user, registriaj prvo");
    return;
  }
  findUser.forEach((user) => {
    for (let s = 0; s < 1; s++) {
      db.collection("space")
        .doc(`dummySpace${s}`)
        .set({
          name: dummySpaceNames[s].name,
          admin: null,
          color: dummySpaceColor[s].color,
          admin: user.data().uid,
          members: ["Bleki", "Lun", "Melita", "Nina", "Dino", user.data().uid],
          created: fieldValue.serverTimestamp(),
          description: "Add description",
          spaceId: `dummySpace${s}`,
        });
    }
  });
};
export const createDummyStation = async () => {
  await createNewStationDemo(
    "dummySpace0",
    "Demo Project 1",
    statusType,
    statusOrder,
    modules
  );
};

export const createDummyTasks = async () => {
  function getDate(day) {
    const today = new Date();
    let nextDay = new Date(today);
    nextDay.setDate(today.getDate() + day);
    return nextDay;
  }
  function setPriority(prioName) {
    const priority = [
      { name: "Urgent", active: false, color: "rgb(226, 68, 92)" },
      { name: "High", active: false, color: "rgb(253, 171, 61)" },
      { name: "Normal", active: false, color: "rgb(52, 181, 228)" },
      { name: "Low", active: false, color: "rgb(5, 206, 145)" },
    ];
    const index = priority.findIndex((item) => item.name === prioName);
    priority[index].active = true;
    return priority;
  }

  await createNewTaskDemo(
    "to do",
    "Welcome to onid",
    "Bleki",
    null,
    null,
    false,
    setPriority("Normal")
  );
  await createNewTaskDemo(
    "to do",
    "Assign members, set deadlines, priority and much more..",
    "Lun",
    "Melita",
    getDate(3),
    false,
    setPriority("Low")
  );
  await createNewTaskDemo(
    "stuck",
    "Drag and drop to reorder tasks",
    "Melita",
    "Dino",
    getDate(1),
    false,
    setPriority("Urgent")
  );
  await createNewTaskDemo(
    "stuck",
    "Click on task to expand",
    "Melita",
    null,
    getDate(0),
    false,
    setPriority("Normal")
  );
  await createNewTaskDemo(
    "done",
    "Click on Status Arrow to hide tasks, you can still drop tasks inside",
    "Melita",
    "Melita",
    null,
    false,
    setPriority("Low")
  );
  await createNewTaskDemo(
    "on it",
    "Try to Assign this task to your self. You will find this task on Home Page under `My Tasks`",
    "Melita",
    "Dino",
    null,
    false,
    setPriority("Normal")
  );
  await createNewTaskDemo(
    "stuck",
    "Write updates, set descriptions,..",
    "Melita",
    "Nina",
    getDate(0),
    false,
    setPriority("Urgent")
  );
  await createNewTaskDemo(
    "stuck",
    "Write updates, set descriptions,..",
    "Melita",
    "Melita",
    null,
    false,
    setPriority("Urgent")
  );
  await createNewTaskDemo(
    "on it",
    "Try filters",
    "Melita",
    "Lun",
    getDate(1),
    false,
    setPriority("High")
  );
  await createNewTaskDemo(
    "on it",
    "Rendom Task 2",
    "Melita",
    "Bleki",
    getDate(9),
    false,
    setPriority("Normal")
  );
  await createNewTaskDemo(
    "done",
    "This task is completed",
    "Melita",
    "Bleki",
    getDate(0),
    true,
    setPriority("Normal")
  );
  await createNewTaskDemo(
    "done",
    "Keep exploring the app",
    "Melita",
    "Dino",
    getDate(0),
    true,
    setPriority("Normal")
  );
  await createNewTaskDemo(
    "on it",
    "Try to Filter, Priority: 'urgent', Time: 'today', Select person: 'Lun'",
    "Melita",
    "Lun",
    getDate(0),
    false,
    setPriority("Urgent")
  );
  await createNewTaskDemo(
    "on it",
    "To delete the task, drag it to the bottom of the Screen",
    "Melita",
    "Bleki",
    null,
    false,
    setPriority("Normal")
  );
  await createNewTaskDemo(
    "to do",
    "Enter full screen mode by clicking on the 'bar icon' in top right corner of Station menu",
    "Melita",
    "Bleki",
    null,
    false,
    setPriority("Normal")
  );
};

export const createDemoUser = async () => {
  db.collection("users")
    .where("userName", "==", "Demo")
    .get()
    .then((userData) => {
      if (userData.size > 0) {
        return;
      } else {
        create();
      }
    });

  const create = async () => {
    console.log("start");
    const { user } = await auth.createUserWithEmailAndPassword(
      "demo@demo.com",
      "111111"
    );
    await registerUserFb(user, "Demo");
    return;
  };
};
