import axios from "axios";

const API_URL = "http://localhost:3000/";

const login = (email, password) => {
    return axios
        .post(API_URL + "signin", {
            email,
            password,
        })
        .then((response) => {
            if (response.data.accessToken) {
                localStorage.setItem("user", JSON.stringify(response.data));
            }
            console.log(response.data);
            return response.data;
        });
};

const logout = () => {
    localStorage.removeItem("user");
};
// eslint-disable-next-line
export default {
    login,
    logout,
};
