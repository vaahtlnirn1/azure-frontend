import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateDevice, deleteDevice } from "../actions/devices";
import { queryDeviceTwin } from "../actions/twin";
import DeviceDataService from "../services/device.service";
import store from "../store.js";

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
        // eslint-disable-next-line
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
                    <br></br>
                    <form>
                        <div style={{textAlign: 'center', fontSize: '28px'}} className="form-group">
                            <label>
                                <strong>Device ID:</strong>
                            </label>
                            {currentDevice.deviceId}
                        </div>
                        <br></br>
                        <div style={{textAlign: 'center'}} className="form-group">
                            <label htmlFor="freeDescription"><strong>Notes/Description:</strong></label>
                            <input
                                type="text"
                                className="form-control"
                                id="freeDescription"
                                name="freeDescription"
                                value={currentDevice.freeDescription}
                                onChange={handleInputChange}
                            />
                        </div>
                        <br></br>
                        <div style={{textAlign: 'center'}} className="form-group">
                            <label>
                                <strong>Status:</strong>
                            </label>
                            {currentDevice.devStatus ? "enabled" : "disabled"}
                        </div>
                    </form>
                    {currentDevice.devStatus ? (
                        <button style={{position: "relative", left: '10px'}}
                            className="m-3 btn btn-sm btn-danger"
                            onClick={() => updateStatus(false)}
                        >
                            Disable
                        </button>
                    ) : (
                        <button style={{position: "relative", left: '10px'}}
                            className="btn btn-success"
                            onClick={() => updateStatus(true)}
                        >
                            Enable
                        </button>
                    )}

                    <button style={{position: "relative", left: '10px'}} className="m-3 btn btn-sm btn-danger" onClick={removeDevice}>
                        Delete
                    </button>

                    <button style={{position: "relative", left: '10px'}}
                        type="submit"
                        className="btn btn-success"
                        onClick={updateContent}
                    >
                        Update
                    </button>
                    <br></br>
                    <br></br>
                    <p style={{textAlign: 'center'}}>{message}</p>
                    <button style={{position: "relative", left: '80px'}}
                        className="btn btn-success"
                        onClick={queryTwin}
                    >
                        Get Device Twin
                    </button>
                    <div className="col">
                        <label-twin>
                            <strong>Twin:</strong>
                        </label-twin>
                        <pre>{JSON.stringify(store.getState().twin, null, 4)}</pre>
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
