import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateDevice, deleteDevice } from "../actions/devices";
import DeviceDataService from "../services/device.service";

const Device = (props) => {
    const initialDeviceState = {
        id: null,
        deviceId: "",
        description: "",
        devStatus: true
    };
    const [currentDevice, setCurrentDevice] = useState(initialDeviceState);
    const [message, setMessage] = useState("");

    const dispatch = useDispatch();

    const getDevice = id => {
        DeviceDataService.retrieveDevice(id)
            .then(response => {
                setCurrentDevice(response.data);
                console.log(response.data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    useEffect(() => {
        getDevice(props.match.params.id);
    }, [props.match.params.id]);

    const handleInputChange = event => {
        const { name, value } = event.target;
        setCurrentDevice({ ...currentDevice, [name]: value });
    };

    const updateStatus = status => {
        const data = {
            id: currentDevice.id,
            deviceId: currentDevice.deviceId,
            description: currentDevice.description,
            devStatus: status
        };

        dispatch(updateDevice(currentDevice.id, data))
            .then(response => {
                console.log(response);

                setCurrentDevice({ ...currentDevice, devStatus: status });
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
                            <label htmlFor="description">Description</label>
                            <input
                                type="text"
                                className="form-control"
                                id="description"
                                name="description"
                                value={currentDevice.description}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentDevice.devStatus ? "Enabled" : "Disabled"}
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
                            className="m-3 btn btn-sm btn-danger"
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
