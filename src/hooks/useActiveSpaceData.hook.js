import { useSelector } from "react-redux";

export const useActiveSpaceData = () => {
  const spaceData = useSelector((state) => state.space.spaceData);
  const activeSpaceId = useSelector((state) => state.history.spaceId);
  if (!spaceData) return;
  const data = spaceData.filter((data) => data.spaceId === activeSpaceId);

  return data[0];
};
