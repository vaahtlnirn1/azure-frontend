import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/";

const retrieveDevices = () => {
    return axios.get(API_URL + "devices");
};

const createDevice = () => {
    return axios.post(API_URL + "devices", { headers: authHeader() });
};

const updateDevice = () => {
    // eslint-disable-next-line
    return axios.put(API_URL + "device/${id}", { headers: authHeader() });
};

const deleteDevice = () => {
    // eslint-disable-next-line
    return axios.delete(API_URL + "device/${id}", { headers: authHeader() });
};

const deleteAllDevices = () => {
    return axios.delete(API_URL + "devices", { headers: authHeader() });
};

const findDevicesByTitle = () => {
    // eslint-disable-next-line
    return axios.get(API_URL + "devices?title=${title}", { headers: authHeader() });
};
// eslint-disable-next-line
const DeviceDataService = {
    retrieveDevices,
    createDevice,
    updateDevice,
    deleteDevice,
    deleteAllDevices,
    findDevicesByTitle
};

export default DeviceDataService;
