import React from "react";
import { Router } from "@reach/router";
import { useSelector } from "react-redux";
import { Message, Segment, Dimmer, Loader } from "semantic-ui-react";
import logo from "./logo.svg";
import "./App.scss";

function App() {
  const userData = useSelector((state) => state.user.userData);
  const errorMessage = useSelector((state) => state.error.errorMessage);
  const successMessage = useSelector((state) => state.error.successMessage);
  const loader = useSelector((state) => state.error.showLoader);

  const LoggedOut = (props) => (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h3>Not Logged In</h3>
    </header>
  );

  const LoggedIn = (props) => <div>Logged In</div>;

  return (
    <div className="App">
      <Router>
        {!userData.token ? (
          <LoggedOut default path="/" />
        ) : (
          <LoggedIn default path="/" />
        )}
      </Router>
      {errorMessage && errorMessage.length > 0 && (
        <Message
          id="errorMessage"
          icon="cancel"
          header="There was an error"
          content={errorMessage}
          wide
        />
      )}
      {successMessage && successMessage.length > 0 && (
        <Message
          id="successMessage"
          icon="check"
          header="There was a successful action"
          content={successMessage}
          wide
        />
      )}
      {loader && (
        <Segment id="table-spinner">
          <Dimmer active inverted>
            <Loader inverted>Loading</Loader>
          </Dimmer>
        </Segment>
      )}
    </div>
  );
}

export default App;
