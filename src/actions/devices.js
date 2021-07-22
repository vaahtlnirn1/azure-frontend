import {
    CREATE_DEVICE,
    RETRIEVE_DEVICES,
    UPDATE_DEVICE,
    DELETE_DEVICE,
    DELETE_ALL_DEVICES,
} from "./types";

import DeviceDataService from "../services/device.service";

export const createDevice = (title, detail) => async (dispatch) => {
    try {
        const res = await DeviceDataService.createDevice({ title, detail });

        dispatch({
            type: CREATE_DEVICE,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const retrieveDevices = () => async (dispatch) => {
    try {
        const res = await DeviceDataService.retrieveDevices();

        dispatch({
            type: RETRIEVE_DEVICES,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};

export const updateDevice = (id, data) => async (dispatch) => {
    try {
        const res = await DeviceDataService.updateDevice(id, data);

        dispatch({
            type: UPDATE_DEVICE,
            payload: data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const deleteDevice = (id) => async (dispatch) => {
    try {
        await DeviceDataService.deleteDevice(id);

        dispatch({
            type: DELETE_DEVICE,
            payload: { id },
        });
    } catch (err) {
        console.log(err);
    }
};

export const deleteAllDevices = () => async (dispatch) => {
    try {
        const res = await DeviceDataService.deleteAllDevices();

        dispatch({
            type: DELETE_ALL_DEVICES,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};

export const findDevicesByTitle = (title) => async (dispatch) => {
    try {
        const res = await DeviceDataService.findDevicesByTitle(title);

        dispatch({
            type: RETRIEVE_DEVICES,
            payload: res.data,
        });
    } catch (err) {
        console.log(err);
    }
};
