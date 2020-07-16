import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  Form,
  Input,
  Button,
  Image,
  Transition,
  Container,
} from "semantic-ui-react";
import { setUserData } from "../../redux/userSlice";
import { setErrorMessage, clearErrorMessage } from "../../redux/errorSlice";
import { postReq } from "../../api/index.js";
import "./style.scss";
import logo from "../../logo.svg";

const LoginCard = () => {
  const [loginActive, setLoginActive] = useState(true);
  const [registerActive, setRegisterActive] = useState(false);
  const [username, setUsername] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();

  // FLIP UI

  const flipCards = () => {
    loginActive ? registerActiveFunc() : loginActiveFunc();
  };

  const registerActiveFunc = () => {
    setLoginActive(false);
    setTimeout(() => {
      setRegisterActive(true);
    }, 500);
  };

  const loginActiveFunc = () => {
    setRegisterActive(false);
    setTimeout(() => {
      setLoginActive(true);
    }, 500);
  };

  // API CALLS

  const login = () => {
    console.log("login");
    postReq("/api/auth/login", { email, password })
      .then((res) => {
        console.log({ res });
        dispatch(setUserData(res.data));
      })
      .catch((err) => {
        console.log({ err });
        dispatch(setErrorMessage(err.response.data.error));
        setTimeout(() => {
          dispatch(clearErrorMessage());
        }, 5000);
      });
  };

  const register = () => {
    console.log("register");
    postReq("/api/auth/register", { name: username, email, password, admin: 0 })
      .then((res) => {
        console.log({ res });
        // TODO: Need to set access token
        dispatch(setUserData(res.data));
      })
      .catch((err) => {
        console.log({ err });
        dispatch(setErrorMessage(err.response.data.error));
        setTimeout(() => {
          dispatch(clearErrorMessage());
        }, 5000);
      });
  };

  return (
    <React.Fragment>
      <Container id="login-container">
        <Transition
          visible={loginActive}
          animation={"horizontal flip"}
          duration={500}
          id="login"
        >
          <div className="ui raised card">
            <Image
              src={logo}
              style={{ marginBottom: "20px", backgroundColor: "transparent" }}
            />
            <Form
              onSubmit={() => {
                login();
              }}
            >
              <Form.Field>
                <Input
                  type="email"
                  placeholder="Enter Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                ></Input>
              </Form.Field>
              <Form.Field>
                <Input
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                ></Input>
              </Form.Field>
              <div>
                <p className="green" style={{ marginBottom: "15px" }}>
                  Forgot Password?
                </p>
              </div>
              <div className="btn-wrap">
                <Button
                  type="reset"
                  onClick={() => {
                    flipCards();
                  }}
                >
                  Create Account
                </Button>
                <Button
                  positive
                  type="submit"
                  onClick={() => {
                    login();
                  }}
                >
                  Login
                </Button>
              </div>
            </Form>
          </div>
        </Transition>
        <Transition
          visible={registerActive}
          animation={"horizontal flip"}
          duration={500}
          id="login"
        >
          <div className="ui raised card">
            <Image src={logo} style={{ marginBottom: "20px" }} />
            <Form>
              <Form.Field>
                <Input
                  type="text"
                  placeholder="Enter Username"
                  onChange={(e) => {
                    setUsername(e.target.value);
                  }}
                  value={username}
                  required
                ></Input>
              </Form.Field>
              <Form.Field>
                <Input
                  type="email"
                  placeholder="Enter Email"
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  required
                ></Input>
              </Form.Field>
              <Form.Field>
                <Input
                  type="password"
                  placeholder="Enter Password"
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  value={password}
                  required
                ></Input>
              </Form.Field>
              <div className="btn-wrap">
                <Button
                  type="reset"
                  onClick={() => {
                    flipCards();
                  }}
                >
                  Login
                </Button>
                <Button
                  positive
                  type="submit"
                  onClick={() => {
                    register();
                  }}
                >
                  Register
                </Button>
              </div>
            </Form>
          </div>
        </Transition>
      </Container>
    </React.Fragment>
  );
};

export default LoginCard;
