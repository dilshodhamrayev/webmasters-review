import React from "react";
import ReactDOM from "react-dom";
import "./global.scss";
import "./styles/main.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import App from "./routes/Index";
// REDUX
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
// ROUTE
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
    <Router>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ToastContainer />
                <App />
            </PersistGate>
        </Provider>
    </Router>,
    document.getElementById("root")
);
