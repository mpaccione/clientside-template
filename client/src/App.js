import React from "react";
import { Router } from "@reach/router";
import { useSelector } from "react-redux";
import { Message } from "semantic-ui-react";
import Loadable from 'react-loadable';
import LoginView from "./views/loginView";
import Loading from "./components/loading";
import logo from "./logo.svg";
import "./App.scss";

const EmailVerified = Loadable({
  loader: () => import("./views/emailVerified"),
  loading: Loading
})

function App() {
  const userData = useSelector((state) => state.user.userData);
  const errorMessage = useSelector((state) => state.error.errorMessage);
  const successMessage = useSelector((state) => state.error.successMessage);
  const loader = useSelector((state) => state.error.showLoader);

  const LoggedIn = (props) => (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h3>Logged In</h3>
    </header>
  );

  const LoggedOut = (props) => <LoginView />;

  return (
    <div className="App">
      <Router id="router">
        {!userData.token ? (
          <LoggedOut default path="/" />
        ) : (
          <LoggedIn default path="/" />
        )}
        <EmailVerified path="email-verified" />
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
      {loader && <Loading />}
    </div>
  );
}

export default App;
