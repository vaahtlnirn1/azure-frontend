import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/";

const retrieveDevices = () => {
    return axios.get(API_URL + `devices`, { headers: authHeader() });
};

const retrieveSyncDevices = () => {
    console.log(API_URL + `devices`)
    return axios.put(API_URL + `devices`, null, { headers: authHeader() });
};

const retrieveDevice = id => {
    // eslint-disable-next-line
    return axios.get(API_URL + `device/${id}`, { headers: authHeader() });
};

const updateDevice = (id, data) => {
    // eslint-disable-next-line
    return axios.put(API_URL + `device/${id}`, data, { headers: authHeader() });
};

const queryDeviceTwin = (id, data) => {
    return axios.post(API_URL + `device/${id}`, data, { headers: authHeader() });
};

const deleteDevice = id => {
    // eslint-disable-next-line
    return axios.delete(API_URL + `device/${id}`, { headers: authHeader() });
};

const deleteAllDevices = () => {
    return axios.delete(API_URL + `devices`, { headers: authHeader() });
};

const DeviceDataService = {
    retrieveDevices,
    retrieveSyncDevices,
    retrieveDevice,
    updateDevice,
    queryDeviceTwin,
    deleteDevice,
    deleteAllDevices
};

export default DeviceDataService;
