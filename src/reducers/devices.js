import {
    RETRIEVE_DEVICES,
    UPDATE_DEVICE,
    DELETE_DEVICE,
    DELETE_ALL_DEVICES,
} from "../actions/types";

const initialState = [];

const deviceReducer = (devices = initialState, action) => {
    const { type, payload } = action;

    switch (type) {

        case RETRIEVE_DEVICES:
            return payload;

        case UPDATE_DEVICE:
            return devices.map((device) => {
                if (device.id === payload.id) {
                    return {
                        ...device,
                        ...payload,
                    };
                } else {
                    return device;
                }
            });

        case DELETE_DEVICE:
            return devices.filter(({ id }) => id !== payload.id);

        case DELETE_ALL_DEVICES:
            return [];

        default:
            return devices;
    }
};

export default deviceReducer;
