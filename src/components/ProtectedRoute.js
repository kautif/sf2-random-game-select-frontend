import React from "react";
import { Redirect } from "react-router-dom";
import { Route } from "react-router-dom";
import Cookies from "universal-cookie";

export default function ProtectedRoute ({ component: Component, ...rest}) {
    const cookies = new Cookies();

    return (
        <Route 
            { ...rest }
            render={ (props) => {
                const token = cookies.get("token");

                if (token) {
                    return <Component { ... props } />;
                } else {
                    return (
                        <Redirect 
                            to={{
                                pathname: "/continue",
                                state: {
                                    from: props.location
                                }
                            }}
                        />
                    )
                }
            }}
        />
    )
}