import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:3000/";

const retrieveDevices = () => {
    return axios.get(API_URL + `devices`, { headers: authHeader(), "Content-Type": "application/json", "Accept": "application/json"  });
};

const retrieveDevice = id => {
    // eslint-disable-next-line
    return axios.get(API_URL + `device/${id}`, { headers: authHeader(), "Content-Type": "application/json", "Accept": "application/json" });
};

const createDevice = data => {
    console.log(data);
    return axios.post(API_URL + `devices`, data, { headers: authHeader(), "Content-Type": "text/plain", "Accept": "application/json" });
};

const updateDevice = (id, data) => {
    console.log(id, data);
    // eslint-disable-next-line
    return axios.put(API_URL + `device/${id}`, data, { headers: authHeader(), "Content-Type": "text/plain", "Accept": "application/json" });
};

const deleteDevice = id => {
    // eslint-disable-next-line
    return axios.delete(API_URL + `device/${id}`, { headers: authHeader(), "Content-Type": "application/json", "Accept": "application/json" });
};

const deleteAllDevices = () => {
    return axios.delete(API_URL + `devices`, { headers: authHeader(), "Content-Type": "application/json", "Accept": "application/json" });
};

const findDevicesByTitle = title => {
    // eslint-disable-next-line
    return axios.get(API_URL + `devices?title=${title}`, { headers: authHeader(), "Content-Type": "application/json", "Accept": "application/json" });
};

const DeviceService = {
    retrieveDevices,
    retrieveDevice,
    createDevice,
    updateDevice,
    deleteDevice,
    deleteAllDevices,
    findDevicesByTitle
};

export default DeviceService;
