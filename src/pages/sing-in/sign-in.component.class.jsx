import React from "react";
import { motion } from "framer-motion";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";

import Login from "../../components/login/login.component";
import Register from "../../components/register/register.component.class";
import Box from "../../components/retro/box/box.component";

import {
  NoAccount,
  SignInContainer,
  Content,
  LoginContent,
  RegisterContent,
  QuestionBold,
  Scroll,
} from "./sing-in.styles";

class SignIn extends React.Component {
  constructor() {
    super();
    this.state = {
      yPos: 0,
    };
  }

  render() {
    return (
      <SignInContainer>
        <Box style={{ padding: "0px" }}>
          <Content>
            <Scroll
              animate={{ y: this.state.yPos }}
              transition={{ duration: 0.7, type: "spring" }}
            >
              <LoginContent>
                <Login />
                <NoAccount>
                  <motion.p
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => this.setState({ yPos: -400 })}
                  >
                    Don't have account? <QuestionBold>Register!</QuestionBold>
                    <br />
                    <ExpandMoreIcon fontSize="small" />
                  </motion.p>
                </NoAccount>
              </LoginContent>
              <RegisterContent>
                <Register />
                <NoAccount>
                  <motion.p
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => this.setState({ yPos: 0 })}
                  >
                    Allready a member? <QuestionBold>Login!</QuestionBold>
                    <br />
                    <ExpandLessIcon fontSize="small" />
                  </motion.p>
                </NoAccount>
              </RegisterContent>
            </Scroll>
          </Content>
        </Box>
      </SignInContainer>
    );
  }
}

export default SignIn;
