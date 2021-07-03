import { db } from "../firebase/firebase.utils";

export const useUser = async (userId) => {
  console.log("useUser component");
  const userRef = db.collection("users").doc(userId);
  const data = await userRef.get();
  const userData = data.data();
  return userData;
};
