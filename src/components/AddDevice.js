import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createDevice } from "../actions/devices";

const AddDevice = () => {
    const initialDeviceState = {
        id: null,
        deviceId: "",
        description: "",
        devStatus: true
    };
    const [device, setDevice] = useState(initialDeviceState);
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setDevice({ ...device, [name]: value });
    };

    const saveDevice = () => {
        const { deviceId, description } = device;

        dispatch(createDevice(deviceId, description))
            .then(data => {
                setDevice({
                    id: data.id,
                    deviceId: data.deviceId,
                    description: data.description,
                    devStatus: data.devStatus
                });
                setSubmitted(true);
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const newDevice = () => {
        setDevice(initialDeviceState);
        setSubmitted(false);
    };

    return (
        <div className="submit-form">
            {submitted ? (
                <div>
                    <h4>You submitted successfully!</h4>
                    <button className="btn btn-success" onClick={newDevice}>
                        Add
                    </button>
                </div>
            ) : (
                <div>
                    <div className="form-group">
                        <label htmlFor="deviceId">Device ID</label>
                        <input
                            type="text"
                            className="form-control"
                            id="deviceId"
                            required
                            value={device.deviceId}
                            onChange={handleInputChange}
                            name="deviceId"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="description"
                            required
                            value={device.description}
                            onChange={handleInputChange}
                            name="description"
                        />
                    </div>

                    <button onClick={saveDevice} className="btn btn-success">
                        Add
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddDevice;
