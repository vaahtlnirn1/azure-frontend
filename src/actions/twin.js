import DeviceDataService from "../services/device.service";
import { RETRIEVE_DEVICE_TWIN } from "./types";

export const queryDeviceTwin = (id, data) => async (dispatch) => {
    try {
        const res = await DeviceDataService.queryDeviceTwin(id, data);

        dispatch({
            type: RETRIEVE_DEVICE_TWIN,
            payload: res.data,
        });

        return Promise.resolve(res.data);
    } catch (err) {
        return Promise.reject(err);
    }
};