import React from 'react';
import {connect} from 'react-redux';
import {Redirect, Route} from "react-router-dom";


const PrivateRoute = ({dispatch, component: Component, ...rest}:any) => {

    return (<Route
            {...rest}
            render={(props: JSX.IntrinsicAttributes) =>
                (rest != null && rest.auth != null && rest.auth.token != null) ||
                localStorage.getItem('token') != null ? (
                    <Component {...props} />
                ) : (
                    <Redirect
                        to={{
                            pathname: '/login',
                            // @ts-ignore
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />
    )
}
export default connect(({privateRoute, auth}:any) => ({privateRoute, auth}))(
    PrivateRoute
);
