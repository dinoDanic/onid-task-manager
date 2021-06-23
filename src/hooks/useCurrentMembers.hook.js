import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import { db } from "../firebase/firebase.utils";

const useCurrentMembers = async () => {
  const spaceData = useSelector((state) => state.space.spaceData);
  const history = useHistory();
  const activeSpaceId = history.location.pathname.split("/")[2];
  if (!spaceData || !spaceData[0].members) return;
  const data = spaceData.filter((data) => data.spaceId === activeSpaceId);

  const members = data[0].members;

  let listDocs = [];
  const ref = db.collection("users").where("uid", "in", members);
  const docs = await ref.get();
  docs.forEach((doc) => {
    listDocs.push(doc.data());
  });

  return listDocs;
};

export default useCurrentMembers;
