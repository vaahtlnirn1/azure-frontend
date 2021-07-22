import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createDevice } from "../actions/devices";

const AddDevice = () => {
    const initialDeviceState = {
        id: null,
        title: "",
        detail: "",
        published: false
    };
    const [device, setDevice] = useState(initialDeviceState);
    const [submitted, setSubmitted] = useState(false);

    const dispatch = useDispatch();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setDevice({ ...device, [name]: value });
    };

    const saveDevice = () => {
        const { title, detail } = device;

        dispatch(createDevice(title, detail))
            .then(data => {
                setDevice({
                    id: data.id,
                    title: data.title,
                    detail: data.detail,
                    published: data.published
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
                        <label htmlFor="title">Title</label>
                        <input
                            type="text"
                            className="form-control"
                            id="title"
                            required
                            value={device.title}
                            onChange={handleInputChange}
                            name="title"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="detail">Detail</label>
                        <input
                            type="text"
                            className="form-control"
                            id="detail"
                            required
                            value={device.detail}
                            onChange={handleInputChange}
                            name="detail"
                        />
                    </div>

                    <button onClick={saveDevice} className="btn btn-success">
                        Submit
                    </button>
                </div>
            )}
        </div>
    );
};

export default AddDevice;
