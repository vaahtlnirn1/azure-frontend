import React from "react";
import { Redirect } from 'react-router-dom';
import { useSelector } from "react-redux";

const Dashboard = () => {
    const { user: currentUser } = useSelector((state) => state.auth);

    if (!currentUser) {
        return <Redirect to="/signin" />;
    }

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>
                    {currentUser.username}'s Dashboard
                </h3>
            </header>
            <p>
                <strong>Token:</strong> {currentUser.accessToken.substring(0, 20)} ...{" "}
                {currentUser.accessToken.substr(currentUser.accessToken.length - 20)}
            </p>
            <p>
                <strong>ID:</strong> {currentUser.id}
            </p>
            <p>
                <strong>Name:</strong> {currentUser.name}
            </p>
            <p>
                <strong>Username:</strong> {currentUser.username}
            </p>
            <p>
                <strong>Email:</strong> {currentUser.email}
            </p>
            <strong>Authorities:</strong>
            <ul>
                {currentUser.roles &&
                currentUser.roles.map((role, index) => <li key={index}>{role}</li>)}
            </ul>
        </div>
    );
};

export default Dashboard;
