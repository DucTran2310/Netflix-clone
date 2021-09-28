import React from "react";
// import { Home, Browse, SignIn, SignUp } from "./pages";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";
import { PushDataToFireStore } from "lib/firebase.prod";
import { Browse, Home } from "pages";
import SignIn from "pages/signin";
import SignUp from "pages/signup";
import { IsUserRedirect, ProtectedRoute } from "helpers/routes";
import { useAuthListener } from "hooks";

export default function App() {
    PushDataToFireStore();
    const user = useAuthListener();
    console.log(user);

    return (
        <Router>
            <Switch>
                <IsUserRedirect
                    user={user}
                    loggedInPath={ROUTES.BROWSE}
                    path={ROUTES.SIGN_IN}
                >
                    <SignIn />
                </IsUserRedirect>
                <IsUserRedirect
                    user={user}
                    loggedInPath={ROUTES.BROWSE}
                    path={ROUTES.SIGN_UP}
                >
                    <SignUp />
                </IsUserRedirect>
                <ProtectedRoute user={user} path={ROUTES.BROWSE}>
                    <Browse />
                </ProtectedRoute>
                <IsUserRedirect
                    user={user}
                    loggedInPath={ROUTES.BROWSE}
                    path={ROUTES.HOME}
                >
                    <Home />
                </IsUserRedirect>
            </Switch>
        </Router>
    );
}
