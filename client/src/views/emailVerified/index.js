import React from "react";
import { navigate } from "@reach/router";
import { Container, Image, Transition } from "semantic-ui-react";
import "./style.scss";

const EmailVerified = (props) => {
  const { bgImg, logo } = props;

  setTimeout(() => {
    navigate("/");
  }, 3000);

  return (
    <React.Fragment>
      <div id="bg-cover" />
      <div id="bg" style={{ backgroundImage: `url(${bgImg})` }} />

      <Container id="login-container">
        <Transition
          visible={true}
          animation={"horizontal flip"}
          duration={500}
          id="login"
        >
          <div className="ui raised card">
            <Image
              src={logo}
              style={{ marginBottom: "20px", backgroundColor: "transparent" }}
            />
            <div style={{ textAlign: "center", padding: "15px 0px" }}>
              <h1>Email Verified!</h1>
              <h3>Redirecting to login...</h3>
            </div>
          </div>
        </Transition>
      </Container>
    </React.Fragment>
  );
};

export default EmailVerified;
