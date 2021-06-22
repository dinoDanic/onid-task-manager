import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebase.utils";

const useCurrentMembers = () => {
  const spaceData = useSelector((state) => state.space.spaceData);
  const history = useHistory();
  const activeSpaceId = history.location.pathname.split("/")[2];
  if (!spaceData) return;
  const data = spaceData.filter((data) => data.spaceId === activeSpaceId);

  const members = data[0].members;

  let membersData = [
    /* { userName: "local", uid: "2" } */
  ];

  members.map((id) => {
    db.collection("users")
      .doc(id)
      .get()
      .then((doc) => {
        membersData.push(doc.data());
      });
  });

  return membersData;
};

export default useCurrentMembers;
