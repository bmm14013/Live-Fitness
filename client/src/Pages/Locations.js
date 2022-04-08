import React, { useEffect, useState } from "react";
import LocationList from '../Components/LocationList';


function Location() {

    const [locations, setLocations] = useState([]);

    const [location_name, setLocationName] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [street_name, setStreetName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    const loadLocations = async () => {
        const response = await fetch("/get_locations");
        const locations = await response.json();
        setLocations(locations);
    }

    useEffect(() => {
        loadLocations();
    }, []);

    const addLocation = async () => {
        const newLocation = {
            location_name, phone_number, street_name, city,
            state, zip
        };
        const response = await fetch('/add_location', {
            method: 'POST',
            body: JSON.stringify(newLocation), 
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 201) {
            alert("Successfully added location!");
        } else {
            alert(`Failed to add location, status code = ${response.status}`);
        }
    };

    const onDelete = async location_id => {
        const response = await fetch(`/delete_location/${location_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            alert("Successfully deleted location!")
            const getResponse = await fetch('/get_locations');
            const locations = await getResponse.json();
            setLocations(locations);
        } else {
            console.error(`Failed to delete location with id=${location_id}, status code = ${response.status}`);
        }
    };

    return <div>
        <h1>Locations:</h1>
        <>
            <LocationList locations={locations} onDelete={onDelete}></LocationList>
        </>
        <p></p>
        <table>
            <td>
                <p>** All fields are required to add a Location **</p>
                <form>
                    <label>Add Location:
                        <input
                            type="text"
                            placeholder="Location Name"
                            value={location_name}
                            onChange={e => setLocationName(e.target.value)} />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={phone_number}
                            onChange={e => setPhoneNumber(e.target.value)} />
                        <input
                            type="text"
                            placeholder="Street Name"
                            value={street_name}
                            onChange={e => setStreetName(e.target.value)} />
                        <input
                            type="text"
                            placeholder="City"
                            value={city}
                            onChange={e => setCity(e.target.value)} />
                        <input
                            type="text"
                            placeholder="State"
                            value={state}
                            onChange={e => setState(e.target.value)} />
                        <input
                            type="text"
                            placeholder="Zip"
                            value={zip}
                            onChange={e => setZip(e.target.value)} />
                        <button
                            onClick={addLocation}
                            type="submit"
                        >Add</button>
                    </label>
                </form>
                <p></p>
            </td>
        </table>
        <p></p>
    </div>
}

export default Location;