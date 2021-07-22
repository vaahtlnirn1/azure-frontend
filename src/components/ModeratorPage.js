import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";

const ModeratorPage = () => {
    const [content, setContent] = useState("");

    useEffect(() => {
        UserService.getModeratorPage().then(
            (response) => {
                setContent(response.data);
            },
            (error) => {
                const _content =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setContent(_content);
            }
        );
    }, []);

    return (
        <div className="container">
            <header className="jumbotron">
                <h3>{content.description}</h3>
            </header>
        </div>
    );
};

export default ModeratorPage;
