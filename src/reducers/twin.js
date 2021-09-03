import {
    RETRIEVE_DEVICE_TWIN
} from "../actions/types";

const initialState = [];

const twinReducer = (twin = initialState, action) => {
    const { type, payload } = action;

    switch (type) {
        case RETRIEVE_DEVICE_TWIN:
            return payload;

        default:
            return initialState;
    }
    };

export default twinReducer;