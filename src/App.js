import { IsUserRedirect, ProtectedRoute } from "helpers/routes";
import { useAuthListener } from "hooks";
import { Browse, Home } from "pages";
import SignIn from "pages/signin";
import SignUp from "pages/signup";
import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import * as ROUTES from "./constants/routes";

export default function App() {
  const { user } = useAuthListener();
  // console.log(user);

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
    // <Router>
    //     <Route exact path="/browse">
    //         <Browse />
    //     </Route>
    //     <Route exact path="/signin">
    //         <Signin />
    //     </Route>
    //     <Route exact path="/signup">
    //         <SignUp />
    //     </Route>
    //     <Route exact path={ROUTES.HOME}>
    //         <Home />
    //     </Route>
    // </Router>
  );
}
