import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    retrieveDevices,
    findDevicesByTitle,
    deleteDevice,
    deleteAllDevices,
} from "../actions/devices";
import { Link } from "react-router-dom";

const DevicesList = () => {
    const [currentDevice, setCurrentDevice] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");

    const devices = useSelector(state => state.devices);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(retrieveDevices());
        // eslint-disable-next-line
    }, []);

    const onChangeSearchTitle = e => {
        const searchTitle = e.target.value;
        setSearchTitle(searchTitle);
    };

    const refreshData = () => {
        setCurrentDevice(null);
        setCurrentIndex(-1);
    };

    const setActiveDevice = (device, index) => {
        setCurrentDevice(device);
        setCurrentIndex(index);
    };

    const removeDevice = (props) => {
        dispatch(deleteDevice(currentDevice.id))
            .then(() => {
                props.history.push("/devices");
            })
            .catch(e => {
                console.log(e);
            });
    };

    const removeAllDevices = () => {
        dispatch(deleteAllDevices())
            .then(response => {
                console.log(response);
                refreshData();
            })
            .catch(e => {
                console.log(e);
            });
    };

    const findByTitle = () => {
        refreshData();
        dispatch(findDevicesByTitle(searchTitle));
        console.log(searchTitle);
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by title"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                    <div className="input-group-append">
                        <button
                            className="btn btn-outline-secondary"
                            type="button"
                            onClick={findByTitle}
                        >
                            Search
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <h4>Devices List</h4>

                <ul className="list-group">
                    {devices &&
                    devices.map((device, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveDevice(device, index)}
                            key={index}
                        >
                            {device.title}
                        </li>
                    ))}
                </ul>

                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllDevices}
                >
                    Remove All
                </button>
            </div>
            <div className="col-md-6">
                {currentDevice ? (
                    <div>
                        <h4>Device</h4>
                        <div>
                            <label>
                                <strong>Title:</strong>
                            </label>{" "}
                            {currentDevice.title}
                        </div>
                        <div>
                            <label>
                                <strong>Detail:</strong>
                            </label>{" "}
                            {currentDevice.detail}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentDevice.published ? "Online" : "Offline"}
                        </div>

                        <Link
                            to={"device/" + currentDevice.id}
                            className="m-3 btn btn-sm btn-danger"
                        >
                            Edit
                        </Link>
                        <button className="m-3 btn btn-sm btn-danger" onClick={removeDevice}>
                            Delete
                        </button>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Please click on a device.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DevicesList;
