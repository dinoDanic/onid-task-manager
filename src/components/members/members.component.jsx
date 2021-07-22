import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { db, fieldValue } from "../../firebase/firebase.utils";
import { useSelector } from "react-redux";

import useCurrentMembers from "../../hooks/useCurrentMembers.hook";

import RetroButton from "../retro/button/retro-button.component";
import RetroInput from "../retro/input/input.component";
import Member from "./member/member.component";

import "./members.styles.scss";

const Members = ({ activeSpaceData }) => {
  const history = useHistory();
  const activeSpaceId = useSelector((state) => state.history.spaceId);
  const [email, setEmail] = useState("");
  const [invite, setInvite] = useState(false);
  const [memberData, setMemberData] = useState([]);
  const inputRef = useRef();

  const memberPromise = useCurrentMembers();

  useEffect(() => {
    memberPromise.then((data) => {
      setMemberData(data);
    });
  }, [activeSpaceId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    db.collection("users")
      .where("email", "==", email)
      .get()
      .then((doc) => {
        if (doc.empty) {
          alert("No user in database. User must be registered");
        } else {
          doc.forEach((data) => {
            db.collection("space")
              .doc(activeSpaceId)
              .update({
                members: fieldValue.arrayUnion(data.data().uid),
              })
              .then(() => {
                alert("user added");
                inputRef.current.value = "";
                setInvite(false);
                history.go(0);
              });
          });
        }
      });
  };

  return (
    <div className="members">
      {memberData?.map((member) => {
        return (
          <Member
            key={member.uid}
            member={member}
            activeSpaceData={activeSpaceData}
            activeSpaceId={activeSpaceId}
          />
        );
      })}
      {invite && (
        <form onSubmit={handleSubmit}>
          <div
            className="members__invite"
            onChange={(e) => setEmail(e.target.value)}
          >
            <RetroInput ref={inputRef} placeholder="email" type="email" />
          </div>
        </form>
      )}
      <div className="members__button">
        {invite && (
          <>
            <RetroButton mode="gray" onClick={() => setInvite(false)}>
              cancel
            </RetroButton>
            <RetroButton color="info" onClick={(e) => handleSubmit(e)}>
              Submit
            </RetroButton>
          </>
        )}
        {!invite && (
          <RetroButton
            color="info"
            onClick={() => setInvite(!invite)}
            type="submit"
          >
            Invite
          </RetroButton>
        )}
      </div>
    </div>
  );
};

export default Members;
