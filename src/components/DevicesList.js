import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    retrieveDevices,
    retrieveSyncDevices,
    deleteAllDevices,
} from "../actions/devices";
import { Link } from "react-router-dom";

const DevicesList = () => {
    const [currentDevice, setCurrentDevice] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [message, setMessage] = useState("");

    const devices = useSelector(state => state.devices);
    const dispatch = useDispatch();

    useEffect (() => {
        dispatch(retrieveDevices())
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        setSearchResults(devices.filter(device => device.deviceId.toString().toLowerCase().includes(searchTitle.toLowerCase())));
    }, [devices, searchTitle]);

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

    const retrieveSyncedDevices = () => {
        dispatch(retrieveSyncDevices())
            .then(() => {
                refreshData();
                setMessage("The data was synced with IoT Hub successfully.");
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
                setMessage("All devices have been deleted successfully.");
            })
            .catch(e => {
                console.log(e);
            });
    };

    return (
        <div className="list row">
            <div className="col-md-8">
                <div  className="input-group mb-3">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search by Device ID"
                        value={searchTitle}
                        onChange={onChangeSearchTitle}
                    />
                </div>
            </div>
            <div className="col-md-6">
                <h4>Devices List</h4>

                <ul className="list-group">
                    {devices &&
                    searchResults.map((device, index) => (
                        <li
                            className={
                                "list-group-item " + (index === currentIndex ? "active" : "")
                            }
                            onClick={() => setActiveDevice(device, index)}
                            key={index}
                        >
                            {device.deviceId}
                        </li>
                    ))}
                </ul>
                <br></br>
                <br></br>
            </div>
            <div style={{ position: "fixed", right: "-20px", top: "160px" }} className="col-md-6 device">
                {currentDevice ? (
                    <div>
                        <h4>Device</h4>
                        <div>
                            <label>
                                <strong>Device ID:</strong>
                            </label>{" "}
                            {currentDevice.deviceId}
                        </div>
                        <div>
                            <label>
                                <strong>Notes/Description:</strong>
                            </label>{" "}
                            {currentDevice.freeDescription}
                        </div>
                        <div>
                            <label>
                                <strong>Status:</strong>
                            </label>{" "}
                            {currentDevice.devStatus ? "enabled" : "disabled"}
                        </div>
                        <br></br>
                        <Link
                            to={"device/" + currentDevice.id}
                            className="btn btn-success"
                        >
                            Edit
                        </Link>
                    </div>
                ) : (
                    <div>
                        <br />
                        <p>Click a device to expand options and/or write Device ID in the search bar to find desired device.</p>
                    </div>
                )}
                <br></br>
                <br></br>
                <button
                    className="btn btn-success"
                    onClick={retrieveSyncedDevices}
                >
                    Synchronize Database With IoT Hub
                </button>
                <br></br>
                <br></br>
                <p>{message}</p>
                <button
                    className="m-3 btn btn-sm btn-danger"
                    onClick={removeAllDevices}
                >
                    Delete All Devices
                </button>
            </div>
        </div>
    );
};

export default DevicesList;