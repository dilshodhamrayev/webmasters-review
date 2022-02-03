import React from 'react';
import {Redirect, Route} from 'react-router-dom';
// import PublicHeader from "../components/Header/PublicHeader";

const PublicRoute = ({component: Component, ...rest}:any) => {

    window.onhashchange = null;

    return (<Route
            {...rest}
            render={props =>
                localStorage.getItem('token') == null ? (
                    <div>555</div>
                    // <PublicHeader><Component {...props} /></PublicHeader>
                ) : (
                    <Redirect
                        to={{
                            pathname: '/',
                            state: {from: props.location}
                        }}
                    />
                )
            }
        />
    )
};
export default PublicRoute;
