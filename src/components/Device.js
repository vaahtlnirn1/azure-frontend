import React, { useState, useEffect } from "react";
import {useDispatch, useSelector} from "react-redux";
import { updateDevice, deleteDevice } from "../actions/devices";
import { queryDeviceTwin } from "../actions/twin";
import DeviceDataService from "../services/device.service";

const Device = (props) => {
    const initialDeviceState = {
        id: null,
        deviceId: "",
        freeDescription: "",
        devStatus: true,
    };

    const [currentDevice, setCurrentDevice] = useState(initialDeviceState);
    const [message, setMessage] = useState("");
    const [currentTwin, setCurrentTwin] = useState([]);

    const dispatch = useDispatch();

    const getDevice = id => {
        console.log(initialDeviceState);
        console.log(id);
            DeviceDataService.retrieveDevice(id)
            .then(response => {
                const currentDevice = {
                    id: response.data.id,
                    deviceId: response.data.deviceId,
                    freeDescription: response.data.freeDescription,
                    devStatus: response.data.devStatus,
                };
                setCurrentDevice(response.data);
                console.log(currentDevice);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getDevice(props.match.params.id);
    }, []);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentDevice({ ...currentDevice, [name]: value });
    };

    const updateStatus = status => {
        const data = {
            id: currentDevice.id,
            deviceId: currentDevice.deviceId,
            freeDescription: currentDevice.freeDescription,
            devStatus: status,
        };

        dispatch(updateDevice(currentDevice.id, data))
            .then(response => {
                console.log(response);

                setCurrentDevice({ ...currentDevice, devStatus: status });
                console.log(currentDevice);
                setMessage("The status was updated successfully!");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateContent = () => {
        dispatch(updateDevice(currentDevice.id, currentDevice))
            .then(response => {
                console.log(response);
                setMessage("The device was updated successfully!");
                props.history.push("/devices");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const queryTwin = () => {
        dispatch(queryDeviceTwin(currentDevice.id))
            .then(response => {
                console.log(response);
                setCurrentTwin({ ...currentTwin, twin: response});
                setMessage("The twin was queried successfully.");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeDevice = () => {
        dispatch(deleteDevice(currentDevice.id))
            .then(() => {
                props.history.push("/devices");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div>
            {currentDevice ? (
                <div className="edit-form">
                    <h4>Device</h4>
                    <form>
                        <div className="form-group">
                            <label>
                                <strong>Device ID:</strong>
                            </label>
                            {currentDevice.deviceId}
                        </div>
                        <div className="form-group">
                            <label htmlFor="freeDescription"><strong>Notes/Description</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                id="freeDescription"
                                name="freeDescription"
                                value={currentDevice.freeDescription}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentDevice.devStatus ? "enabled" : "disabled"}
                        </div>
                    </form>

                    {currentDevice.devStatus ? (
                        <button
                            className="m-3 btn btn-sm btn-danger"
                            onClick={() => updateStatus(false)}
                        >
                            Disable
                        </button>
                    ) : (
                        <button
                            className="btn btn-success"
                            onClick={() => updateStatus(true)}
                        >
                            Enable
                        </button>
                    )}

                    <button className="m-3 btn btn-sm btn-danger" onClick={removeDevice}>
                        Delete
                    </button>

                    <button
                        type="submit"
                        className="btn btn-success"
                        onClick={updateContent}
                    >
                        Update
                    </button>
                    <p>{message}</p>
                    <button
                        className="btn btn-success"
                        onClick={queryTwin}
                    >
                        Get Device Twin
                    </button>
                    <div className="col">
                        <label>
                            <strong>Twin:</strong>
                        </label>
                        {}
                    </div>
                </div>
            ) : (
                <div>
                    <br />
                    <p>Click a device to expand options</p>
                </div>
            )}
        </div>
    );
};

export default Device;
