import React from "react";
import { motion } from "framer-motion";

import Login from "../../components/login/login.component";
import Register from "../../components/register/register.component.class";
import Box from "../../components/retro/box/box.component";

import "./sing-in.styles.scss";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleDown, faAngleUp } from "@fortawesome/free-solid-svg-icons";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      yPos: 0,
    };
  }

  render() {
    return (
      <div className="signIn">
        <Box style={{ padding: "0px" }}>
          <div className="signIn__content">
            <motion.div
              className="signIn__scroll"
              animate={{ y: this.state.yPos }}
              transition={{ duration: 0.7, type: "spring" }}
            >
              <div className="signIn__login-content">
                <Login />
                <div className="signIn__noAccount">
                  <motion.p
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => this.setState({ yPos: -400 })}
                  >
                    Don't have account? <span>Register!</span>
                    <br />
                    <FontAwesomeIcon icon={faAngleDown} />
                  </motion.p>
                </div>
              </div>
              <div className="signIn__register-content">
                <Register />
                <div className="signIn__noAccount">
                  <motion.p
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => this.setState({ yPos: 0 })}
                  >
                    Allready a member? <span>Login!</span>
                    <br />
                    <FontAwesomeIcon icon={faAngleUp} />
                  </motion.p>
                </div>
              </div>
            </motion.div>
          </div>
        </Box>
      </div>
    );
  }
}

export default SignIn;
