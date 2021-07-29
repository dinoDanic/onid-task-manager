export const names = {
  0: { name: "Bleki" },
  1: { name: "Lun" },
  2: { name: "Melita" },
  3: { name: "Nina" },
  4: { name: "Dino" },
};

export const dummySpaceNames = {
  0: { name: "Demo Space" },
};

export const dummySpaceColor = {
  0: { color: "#34b5e4" },
};

export const dummyImages = {
  0: {
    imageUrl:
      "https://i.pinimg.com/564x/77/76/a5/7776a5ef42b3781255679e7cec8cff15.jpg",
  },
  1: {
    imageUrl:
      "https://www.loveyourdog.com/wp-content/uploads/2020/10/American-and-European-German-Shepherd-Sitting.jpg",
  },
  2: {
    imageUrl:
      "https://zauberberg.com/wp-content/uploads/2014/08/German-Shepherd-sable-working-lines.jpg",
  },
  3: {
    imageUrl:
      "https://images.fineartamerica.com/images-medium-large-5/head-profile-german-shepherd-dog-animal-images.jpg",
  },
  4: {
    imageUrl:
      "https://static.thebark.com/sites/default/files/content/article/full/tasaki-winterize-your-dog-istock-1001897492-800x550-opt.jpg",
  },
};

export const statusType = {
  "to do": {
    id: "to do",
    name: "to do",
    taskIds: [],
    color: "rgb(234 236 239)",
    fontColor: "#34b5e4",
    open: true,
  },
  "on it": {
    id: "on it",
    name: "on it",
    taskIds: [],
    color: "rgb(234 236 239)",
    fontColor: "#FDAB3D",
    open: true,
  },
  stuck: {
    id: "stuck",
    name: "stuck",
    taskIds: [],
    color: "rgb(234 236 239)",
    fontColor: "#e2445c",
    open: true,
  },
  done: {
    id: "done",
    name: "done",
    taskIds: [],
    color: "rgb(234 236 239)",
    fontColor: "#05ce91",
    open: true,
  },
};

export const statusOrder = ["to do", "on it", "stuck", "done"];

export const modules = [
  { name: "CreatedBy", active: false, icon: "faUser" },
  { name: "Assign", active: true, icon: "faUserCheck" },
  { name: "Status", active: false, icon: "faInfoCircle" },
  { name: "CreatedDate", active: false, icon: "faCalendarCheck" },
  { name: "Deadline", active: true, icon: "faCalendarAlt" },
  { name: "DaysLeft", active: true, icon: "faHourglassHalf" },
  { name: "Priority", active: true, icon: "faExclamationCircle" },
];
