import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { HeaderContainer } from "containers/header";
import { FooterContainer } from "containers/footer";
import { Form } from "../components";
import * as ROUTES from "../constants/routes";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { firebase } from "../lib/firebase.prod";

export default function SignIn() {
    const history = useHistory();
    // const firebase = React.useContext(FirebaseContext);
    const [emailAddress, setEmailAddress] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    // check form input elements are valid
    // email & password
    const isInvalid = password === "" || emailAddress === "";

    const auth = getAuth(firebase);

    const handleSignIn = event => {
        event.preventDefault();

        // let auth = getAuth(firebase);
        // firebase work here!!!
        signInWithEmailAndPassword(auth, emailAddress, password)
            .then(() => {
                // push to the browse page
                history.push(ROUTES.BROWSE);
            })
            .catch(error => {
                setEmailAddress("");
                setPassword("");
                setError(error.message);
            });
    };

    return (
        <>
            <HeaderContainer>
                <Form>
                    <Form.Title>Sign In</Form.Title>
                    {error && <Form.Error>{error}</Form.Error>}

                    <Form.Base onSubmit={handleSignIn} method="POST">
                        <Form.Input
                            placeholder="Email address"
                            value={emailAddress}
                            onChange={({ target }) =>
                                setEmailAddress(target.value)
                            }
                        />
                        <Form.Input
                            type="password"
                            placeholder="Password"
                            autoComplete="off"
                            value={password}
                            onChange={({ target }) => setPassword(target.value)}
                        />
                        <Form.Submit disable={isInvalid} type="submit">
                            Sign In
                        </Form.Submit>
                    </Form.Base>

                    <Form.Text>
                        New to Netflix?{" "}
                        <Form.Link to="/signup">Sign Up Now.</Form.Link>
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
