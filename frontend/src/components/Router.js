import React, { useReducer } from "react";
import { Switch, Route } from "react-router-dom";
import SignUp from "./authentication/SignUp";
import SignIn from "./authentication/SignIn";
import ContactUs from "./ContactUs";
import Events from "./Events";
import Profile from "./Profile";
import Home from "./Home";
import Meals from "./Meals";
import burnoutReducer, { updateState } from "../burnoutReducer";
import PrivateRoute from "./PrivateRoute";
import useToken from "./authentication/useToken";
import FAQ from "./faq";
import Resources from "./Resources";
import Calender from "./calender";
import LandingPage from "./Landing";

const initialState = {
  loggedIn: false,
  token: null,
  snackbar: {
    open: false,
    message: "",
    severity: "",
  },
};

function Router() {
  const { getToken, token } = useToken();
  const [state, dispatch] = useReducer(burnoutReducer, initialState);

  // Check token and update login state if not already logged in
  if (!state.loggedIn) {
    const loggedInUserJWTtoken = getToken();
    if (loggedInUserJWTtoken) {
      const logInState = {
        loggedIn: true,
        token: token,
      };
      dispatch(updateState(logInState));
    }
  }

  return (
    <Switch>
      {/* Authentication Routes */}
      <Route path="/signup">
        <SignUp />
      </Route>
      <Route path="/signin">
        <SignIn dispatch={dispatch} />
      </Route>

      {/* Private Routes */}
      <PrivateRoute state={state} dispatch={dispatch} path="/profile">
        <Profile state={state} dispatch={dispatch} />
      </PrivateRoute>
      <PrivateRoute state={state} dispatch={dispatch} path="/faq">
        <FAQ state={state} dispatch={dispatch} />
      </PrivateRoute>
      <PrivateRoute state={state} dispatch={dispatch} path="/calender">
        <Calender state={state} dispatch={dispatch} />
      </PrivateRoute>
      <PrivateRoute state={state} dispatch={dispatch} path="/contactus">
        <ContactUs state={state} dispatch={dispatch} />
      </PrivateRoute>
      <PrivateRoute state={state} dispatch={dispatch} path="/resources">
        <Resources state={state} dispatch={dispatch} />
      </PrivateRoute>
      <PrivateRoute state={state} dispatch={dispatch} path="/meals">
        <Meals state={state} dispatch={dispatch} />
      </PrivateRoute>
      <PrivateRoute state={state} dispatch={dispatch} path="/events">
        <Events state={state} dispatch={dispatch} />
      </PrivateRoute>

      {/* Root Route with Conditional Rendering */}
      <Route exact path="/">
        {state.loggedIn ? (
          <PrivateRoute state={state} dispatch={dispatch}>
            <Home state={state} dispatch={dispatch} />
          </PrivateRoute>
        ) : (
          <LandingPage />
        )}
      </Route>
    </Switch>
  );
}

export default Router;
