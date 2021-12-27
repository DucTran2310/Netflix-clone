import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Form } from "../components";
import { HeaderContainer } from "../containers/header";
import { FooterContainer } from "../containers/footer";
import * as ROUTES from "../constants/routes";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { firebase } from "../lib/firebase.prod";

export default function SignUp() {
  const history = useHistory();
  // const { firebase } = useContext(FirebaseContext);

  const [firstName, setFirstName] = useState("");
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const isInvalid =
    firstName === "" || password === "" || emailAddress === "";

  const auth = getAuth(firebase);

  const handleSignup = async event => {
    event.preventDefault();
    await createUserWithEmailAndPassword(auth, emailAddress, password)
      .then(
        async () => {
          await updateProfile(auth.currentUser, {
            displayName: firstName,
            photoURL: Math.floor(Math.random() * 5) + 1,
          }).then(() => {
            history.push(ROUTES.BROWSE);
          })
          // Lỗi ở đây
        })
      .catch(error => {
        setFirstName("");
        setEmailAddress("");
        setPassword("");
        setError(error.message);
      });
  };

  return (
    <>
      <HeaderContainer>
        <Form>
          <Form.Title>Sign Up</Form.Title>
          {error && <Form.Error>{error}</Form.Error>}

          <Form.Base onSubmit={handleSignup} method="POST">
            <Form.Input
              placeholder="First name"
              value={firstName}
              onChange={({ target }) =>
                setFirstName(target.value)
              }
            />
            <Form.Input
              placeholder="Email address"
              value={emailAddress}
              onChange={({ target }) =>
                setEmailAddress(target.value)
              }
            />
            <Form.Input
              type="password"
              value={password}
              autoComplete="off"
              placeholder="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
            <Form.Submit
              disabled={isInvalid}
              type="submit"
              data-testid="sign-up"
            >
              Sign Up
            </Form.Submit>
          </Form.Base>

          <Form.Text>
            Already a user?{" "}
            <Form.Link to="/signin">Sign in now.</Form.Link>
          </Form.Text>
          <Form.TextSmall>
            This page is protected by Google reCAPTCHA to ensure
            you're not a bot. Learn more.
          </Form.TextSmall>
        </Form>
      </HeaderContainer>
      <FooterContainer />
    </>
  );
}
