import { combineReducers } from "redux";
import auth from "./auth";
import message from "./message";
import devices from "./devices";
import twin from "./twin";

export default combineReducers({
    auth,
    message,
    devices,
    twin
});