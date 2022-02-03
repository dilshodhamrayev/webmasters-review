import React from "react";
import { Route, Redirect } from "react-router-dom"
import { useSelector } from "react-redux"

interface Props {
    component: any
}

const ProtectedRoute: React.FC<Props> = ({ component: Component, ...rest }) => {
    const authenticated = useSelector((state: any) => state.authReducer.authenticated)
    return (
        <Route {...rest} render={(props) => {
            if (authenticated) {
                return <Component path="/dashboard" {...props} />
            } else {
                return <Redirect to="/auth/login" />
            }
        }} />
    );
};

export default ProtectedRoute;
