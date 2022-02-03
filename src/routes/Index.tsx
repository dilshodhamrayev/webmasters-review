import React, { useState } from "react";
import { watchRequests } from "../utils/loader";
import configApi from "../utils/configApi";
import Axios from "axios";
import GSpinner from "../components/global/Spinner"
import ErrorNotification from "../components/global/ErrorNotification"
import { useSelector } from "react-redux"
// MUI
import {
  createMuiTheme,
  ThemeProvider,
} from '@material-ui/core/styles';
// ROUTE
import { Switch, Route } from "react-router-dom";
import { ROUTES } from "./routes";
import ProtectedRoute from "./protected.route"

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#0674ec"
    },
    secondary: {
      main: "#00000042"
    }
  },
});

const App: React.FC = () => {
  const [loading, setloading] = useState(false)
  const [open, setopen] = useState(false)
  const [errorText, seterrorText] = useState("No error, just continue)")
  watchRequests({ setloading, seterrorText, setopen })
  const token = useSelector((state: any) => state.authReducer.token)
  // REDUX DEFAULTS
  Axios.defaults.headers.common["Authorization"] = "Bearer " + token;
  Axios.defaults.baseURL = configApi.api;

  return (
    <ThemeProvider theme={theme}>
      {loading && <GSpinner loading={loading.toString()} />}
      <ErrorNotification open={open} text={errorText} />
      <Switch>
        {ROUTES.map((route: any) => {
          if (route.key === "APP_DASHBOARD") {
            return <ProtectedRoute  {...route} component={route.component} />
          } else {
            return <Route  {...route} key={route.key} />
          }
        })}
      </Switch>
    </ThemeProvider>
  );
};

export default App;
