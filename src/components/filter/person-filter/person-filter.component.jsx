import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { db, getUserDataWithId } from "../../../firebase/firebase.utils";

import {
  clearUserFilter,
  setUserFilter,
} from "../../../redux/filter/filter.actions";

import Avatar from "../../retro/avatar/avatar.component";
import BoxLayerLite from "../../retro/box-layer-lite/box-layer-lite.component";

import { faUserSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./person-filter.styles.scss";

const PersonFilter = () => {
  const spaceId = useSelector((state) => state.history.spaceId);
  const stationId = useSelector((state) => state.history.stationId);
  const currentUser = useSelector((state) => state.user.currentUser);
  const filter = useSelector((state) => state.filter);
  const [members, setMembers] = useState([]);
  const [showMembers, setShowMembers] = useState(false);
  const [userData, setUserData] = useState();
  const dispatch = useDispatch();

  useEffect(() => {
    const getMembers = async () => {
      if (!spaceId) return;
      if (!stationId) return;
      const getSpaceData = await db.collection("space").doc(spaceId).get();
      console.log(" soace id", spaceId);
      const spaceData = getSpaceData.data();
      console.log(spaceData);
      const { members } = spaceData;
      let allMembers = [];
      await members.map((memberId) => {
        console.log(memberId);
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

  useEffect(async () => {
    if (filter.user) {
      const data = await getUserDataWithId(filter.user);
      setUserData(data);
    } else {
      setUserData(null);
    }
  }, [filter]);

  const handlePersonFilter = (id) => {
    dispatch(setUserFilter(id));
    setShowMembers(false);
  };

  const handleRemoveUser = () => {
    dispatch(clearUserFilter());
    setShowMembers(false);
  };

  return (
    <div className="personFilter">
      <div
        className="personFilter__select"
        onClick={() => setShowMembers(!showMembers)}
      >
        {userData ? (
          <div className="personFilter__true">
            <Avatar src={userData.imageUrl} />
            <p>{userData.userName}</p>
          </div>
        ) : (
          <div className="personFilter__false">
            <Avatar />
            <p>Select user</p>
          </div>
        )}
      </div>
      <div className="personFilter__pop">
        {showMembers && (
          <BoxLayerLite setLayer={setShowMembers}>
            {members?.map((member) => {
              console.log(members);
              return (
                <div
                  className="personFilter__member"
                  key={member.uid}
                  onClick={() => handlePersonFilter(member.uid)}
                >
                  <Avatar src={member.imageUrl} />
                  <p>{member.userName}</p>
                </div>
              );
            })}
            <div
              className="personFilter__remove"
              onClick={() => handleRemoveUser()}
            >
              <FontAwesomeIcon icon={faUserSlash} />
            </div>
          </BoxLayerLite>
        )}
      </div>
    </div>
  );
};

export default PersonFilter;
