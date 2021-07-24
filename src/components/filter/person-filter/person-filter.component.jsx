import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { db } from "../../../firebase/firebase.utils";

import Avatar from "../../retro/avatar/avatar.component";
import BoxLayerLite from "../../retro/box-layer-lite/box-layer-lite.component";

import "./person-filter.styles.scss";

const PersonFilter = () => {
  const spaceId = useSelector((state) => state.history.spaceId);
  const stationId = useSelector((state) => state.history.stationId);
  const [members, setMembers] = useState([]);
  const [showMembers, setShowMembers] = useState(false);

  useEffect(() => {
    const getMembers = async () => {
      if (!spaceId) return;
      if (!stationId) return;
      const getSpaceData = await db.collection("space").doc(spaceId).get();
      const spaceData = getSpaceData.data();
      const { members } = spaceData;
      let allMembers = [];
      await members.map((memberId) => {
        db.collection("users")
          .doc(memberId)
          .get()
          .then((memberData) => {
            allMembers.push(memberData.data());
          });
      });
      setMembers(allMembers);
    };

    getMembers();
  }, [spaceId, stationId]);

  return (
    <div className="personFilter">
      <div
        className="personFilter__select"
        onClick={() => setShowMembers(!showMembers)}
      >
        <Avatar />
        <p>Select user</p>
      </div>
      <div className="personFilter__pop">
        {showMembers && (
          <BoxLayerLite setLayer={setShowMembers}>
            {members?.map((member) => (
              <div className="personFilter__member" key={member.uid}>
                <Avatar src={member.imageUrl} />
                <p>{member.userName}</p>
              </div>
            ))}
          </BoxLayerLite>
        )}
      </div>
    </div>
  );
};

export default PersonFilter;
