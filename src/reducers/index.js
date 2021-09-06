import { combineReducers } from "redux";
import auth from "./auth";
import devices from "./devices";
import twin from "./twin";

export default combineReducers({
    auth,
    devices,
    twin
});