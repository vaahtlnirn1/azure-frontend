import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createDevice } from "../actions/devices";

const AddDevice = () => {
    const initialDeviceState = {
        id: null,
        deviceId: "",
        freeDescription: "",
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
        const { deviceId, freeDescription } = device;

        dispatch(createDevice(deviceId, freeDescription))
            .then(data => {
                setDevice({
                    id: data.id,
                    deviceId: data.deviceId,
                    freeDescription: data.freeDescription,
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
                        <label htmlFor="freeDescription">Description</label>
                        <input
                            type="text"
                            className="form-control"
                            id="freeDescription"
                            required
                            value={device.freeDescription}
                            onChange={handleInputChange}
                            name="freeDescription"
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
