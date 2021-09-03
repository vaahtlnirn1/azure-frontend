import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Router, Switch, Route, Link, Redirect} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import UserPage from "./components/UserPage";
import ModeratorPage from "./components/ModeratorPage";
import AdminPage from "./components/AdminPage";
import Device from "./components/Device";
import DevicesList from "./components/DevicesList";

import { logout } from "./actions/auth";
import { clearMessage } from "./actions/message";

import { history } from "./helpers/history";

const App = () => {
    // eslint-disable-next-line
    const [showModeratorPage, setShowModeratorPage] = useState(false);
    const [showAdminPage, setShowAdminPage] = useState(false);

    const { user: currentUser } = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        history.listen((location) => {
            dispatch(clearMessage()); // clear message when changing location
        });
    }, [dispatch]);

    useEffect(() => {
        if (currentUser) {
            setShowModeratorPage(currentUser.roles && currentUser.roles.includes("PM" && "ADMIN"));
            setShowAdminPage(currentUser.roles && currentUser.roles.includes("ADMIN"));
        }
    }, [currentUser]);

    const logOut = () => {
        dispatch(logout());
    };

    return (
        <Router history={history}>
            <div>
                <nav className="navbar navbar-expand navbar-dark bg-dark">
                    <Link to={"/dashboard"} className="navbar-brand">
                        Device Base
                    </Link>
                    <div className="navbar-nav mr-auto">
                        {currentUser && (
                        <li className="nav-item">
                            <Link to={"/"} className="nav-link">
                                Home
                            </Link>
                        </li>
                        )}
                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/devices"} className="nav-link">
                                    Devices
                              </Link>
                            </li>
                        )}
                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/dashboard"} className="nav-link">
                                    My Dashboard
                                </Link>
                            </li>
                        )}
                        {showAdminPage && (
                            <li className="nav-item">
                                <Link to={"/admin"} className="nav-link">
                                    Admin Page
                                </Link>
                            </li>
                        )}
                        {(currentUser && currentUser.roles && ((currentUser.roles.includes("ADMIN")) || (currentUser.roles.includes("PM")))) && (
                            <li className="nav-item">
                                <Link to={"/pm"} className="nav-link">
                                    Moderator Page
                                </Link>
                            </li>
                        )}
                        {currentUser && (
                            <li className="nav-item">
                                <Link to={"/user"} className="nav-link">
                                    User Page
                                </Link>
                            </li>
                        )}
                    </div>

                    {currentUser ? (
                        <div className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a href="/signin" className="nav-link" onClick={logOut}>
                                    Log Out
                                </a>
                            </li>
                        </div>
                    ) : (
                        <div className="navbar-nav ml-auto">
                            <Redirect strict from="/" to="/signin" />
                            <Route path="/signin">
                            </Route>
                            <li className="nav-item">
                                <Link to={"/signin"} className="nav-link">
                                    Login
                                </Link>
                            </li>
                        </div>
                    )}
                </nav>

                <div className="container mt-3">
                    <Switch>
                        <Route exact path="/signin" component={Login} />
                        <Route exact path="/dashboard" component={Dashboard} />
                        <Route path="/user" component={UserPage} />
                        <Route path="/pm" component={ModeratorPage} />
                        <Route path="/admin" component={AdminPage} />
                        <Route exact path="/devices" component={DevicesList} />
                        <Route exact path="/device/:id" component={Device} />
                    </Switch>
                </div>
            </div>
        </Router>
    );
};

export default App;
