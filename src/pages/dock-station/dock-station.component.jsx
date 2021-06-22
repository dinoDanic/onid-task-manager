import React, { useEffect } from "react";
import { db } from "../../firebase/firebase.utils";
import { useDispatch } from "react-redux";

import { setUsers } from "../../redux/user/user.actions";

import { useActiveSpaceData } from "../../hooks/useActiveSpaceData.hook";
import useCurrentMembers from "../../hooks/useCurrentMembers.hook";

import Box from "../../components/retro/box/box.component";
import RecentStations from "../../components/recent-stations/recent-stations.component";
import Members from "../../components/members/members.component";

import "./dock-station.styles.scss";

const DockStation = () => {
  const dispatch = useDispatch();
  const activeSpaceData = useActiveSpaceData();
  const members = useCurrentMembers();

  useEffect(() => {
    const getAllUsers = async () => {
      let users = [];
      const userRef = db.collection("users");
      const usersQuery = await userRef.get();
      usersQuery.forEach((user) => {
        users.push(user.data());
      });
      dispatch(setUsers(users));
    };
    getAllUsers();
  }, []);

  return (
    <div className="dockStation">
      {activeSpaceData && (
        <div>
          <div className="ds__headerContainer">
            <div className="ds__header">
              <div className="ds__text">
                <h1>{activeSpaceData.name}</h1>
                <p>description</p>
              </div>
            </div>
          </div>
          <div className="ds__content ">
            <div className="ds__recentStations ds__item">
              <h2>Recent Stations</h2>
              <Box>
                <RecentStations />
              </Box>
            </div>
            <div className="ds__members ds__item">
              <h2>Members</h2>
              <Box>
                <Members members={members} activeSpaceData={activeSpaceData} />
              </Box>
            </div>
            <div className="ds__members ds__item">
              <h2>Controls</h2>
              <Box>on off</Box>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DockStation;
