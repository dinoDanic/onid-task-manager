import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";

export const useActiveSpaceData = () => {
  const history = useHistory();
  const spaceData = useSelector((state) => state.space.spaceData);

  if (!spaceData) return;
  const activeSpaceId = history.location.pathname.split("/")[2];
  const data = spaceData.filter((data) => data.spaceId === activeSpaceId);

  return data[0];
};
