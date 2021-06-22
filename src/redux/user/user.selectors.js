import { createSelector } from "reselect";

const selectUser = (state) => state.user;

export const selectCurrentUser = createSelector(
  [selectUser],
  (user) => user.currentUser
);

export const filterForMembers = (allUsers, membersIds) => {
  if (!allUsers) return;
  /*   console.log(allUsers);
  console.log("members Ids ", membersIds); */

  let filteredUsersArray = [];
  membersIds.forEach((memberId) => {
    const newArray = allUsers.filter((member) => member.uid == memberId);
    filteredUsersArray.push(newArray);
  });

  const filterdMembers = allUsers.filter((member) => member.uid == membersIds);
  /* 
  console.log(filteredUsersArray); */

  return filteredUsersArray;
};
