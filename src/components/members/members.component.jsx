import React, { useState, useEffect, useRef } from "react";
import { useHistory } from "react-router-dom";
import { addNewUser, db, fieldValue } from "../../firebase/firebase.utils";

import RetroAvatar from "../retro/avatar/avatar.component";
import RetroButton from "../retro/button/retro-button.component";
import RetroInput from "../retro/input/input.component";

import StarIcon from "@material-ui/icons/Star";

import "./members.styles.scss";
import { InsertInvitationRounded } from "@material-ui/icons";

const Members = ({ members, activeSpaceData }) => {
  const { admin } = activeSpaceData;
  const history = useHistory();
  const activeSpaceId = history.location.pathname.split("/")[2];
  const [load, setLoad] = useState(0);
  const [email, setEmail] = useState("");
  const [invite, setInvite] = useState(false);
  const inputRef = useRef();

  useEffect(() => {
    setTimeout(() => {
      setLoad(load + 1);
    }, 500);
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
              });
          });
        }
      });
  };

  return (
    <div className="members">
      {members.map((member) => {
        return (
          <div key={member.uid} className="members__show">
            <div className="members__avatar">
              <RetroAvatar src={member.imageUrl} />
            </div>
            <div className="members__name">
              <p>{member.userName}</p>
            </div>
            {member.uid === admin && (
              <div className="members__admin">
                <StarIcon fontSize="small" />
              </div>
            )}
          </div>
        );
      })}
      {invite && (
        <form onSubmit={handleSubmit}>
          <div
            className="members__invite"
            onChange={(e) => setEmail(e.target.value)}
          >
            <RetroInput
              ref={inputRef}
              type="submit"
              placeholder="email"
              type="email"
            />
          </div>
        </form>
      )}
      <div className="members__button">
        {invite && (
          <>
            <RetroButton
              size="small"
              mode="gray"
              onClick={() => setInvite(false)}
            >
              cancel
            </RetroButton>
            <RetroButton
              onClick={(e) => handleSubmit(e)}
              type="submit"
              size="small"
            >
              Submit
            </RetroButton>
          </>
        )}
        {!invite && (
          <RetroButton
            onClick={() => setInvite(!invite)}
            type="submit"
            size="small"
          >
            Invite
          </RetroButton>
        )}
      </div>
    </div>
  );
};

export default Members;
