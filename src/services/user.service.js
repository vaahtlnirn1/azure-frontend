import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/";

const getMainDashboard = () => {
    return axios.get(API_URL + "dashboard");
};

const getUserPage = () => {
    return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorPage = () => {
    return axios.get(API_URL + "pm", { headers: authHeader() });
};

const getAdminPage = () => {
    return axios.get(API_URL + "admin", { headers: authHeader() });
};
// eslint-disable-next-line
export default {
    getMainDashboard,
    getUserPage,
    getModeratorPage,
    getAdminPage,
};
