import React from "react";
import { connect } from "react-redux";
import { auth, db } from "../../firebase/firebase.utils";
import { createStructuredSelector } from "reselect";

import Avatar from "../../components/retro/avatar/avatar.component";
import SpaceFly from "../../components/space-fly/space-fly.component";

import { setSpaceData, removeSpaceData } from "../../redux/space/space.actions";
import { setUsers } from "../../redux/user/user.actions";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import "./space.styles.scss";

class Space extends React.Component {
  componentDidMount() {
    this.checkSpace();
    this.getAllUsers();
    this.handleLogout = this.handleLogout.bind(this);
    this.getAllUsers = this.getAllUsers.bind(this);
  }

  checkSpace = async () => {
    const { setSpaceData } = this.props;
    const current = this.props.currentUser;
    db.collection("space")
      .where("members", "array-contains", current.uid)
      .orderBy("created", "asc")
      .onSnapshot((snapShot) => {
        if (!snapShot.empty) {
          let shots = [];
          snapShot.forEach((doc) => {
            shots.push(doc.data());
          });
          setSpaceData(shots);
        }
      });
  };

  getAllUsers = async () => {
    const { setUsers } = this.props;
    let users = [];
    const userRef = db.collection("users");
    const usersQuery = await userRef.get();
    usersQuery.forEach((user) => {
      users.push(user.data());
    });
    setUsers(users);
  };

  handleLogout() {
    removeSpaceData();
    auth.signOut();
  }
  render() {
    return (
      <div className="space">
        <div className="space__fly">
          <SpaceFly />
        </div>
        <div className="space__user" onClick={() => this.handleLogout()}>
          <Avatar src={this.props.currentUser.image} />
        </div>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
});

const mapDispatchToProps = (dispatch) => ({
  setSpaceData: (data) => dispatch(setSpaceData(data)),
  removeSpaceData: () => dispatch(removeSpaceData()),
  setUsers: (users) => dispatch(setUsers(users)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Space);
