import React from "react";
import { Redirect } from "react-router-dom"

const Home: React.FC = () => {
    return <div>
        <Redirect to="/auth/login" />
    </div>;
};

export default Home;
