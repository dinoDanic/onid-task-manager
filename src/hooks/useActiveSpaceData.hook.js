import { db } from "../firebase/firebase.utils";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export const useActiveSpaceData = () => {
  const history = useHistory();
  const spaceData = useSelector((state) => state.space.spaceData);
  const activeSpaceId = history.location.pathname.split("/")[2];
  if (!spaceData) return;
  const data = spaceData.filter((data) => data.spaceId === activeSpaceId);

  return data[0];
};
