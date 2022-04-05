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

    const [location_id, getLocationId] = useState('');
    const [elocation_name, updateLocationName] = useState('');
    const [ephone_number, updatePhoneNumber] = useState('');
    const [estreet_name, updateStreetName] = useState('');
    const [ecity, updateCity] = useState('');
    const [estate, updateState] = useState('');
    const [ezip, updateZip] = useState('');

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
            const getResponse = await fetch('/get_location');
            const locations = await getResponse.json();
            setLocations(locations);
        } else {
            console.error(`Failed to delete location with id=${location_id}, status code = ${response.status}`);
        }
    };

    const editLocation = async () => {
        const response = await fetch(`/edit_location`, {
            method: 'PUT',
            body: JSON.stringify({
                location_id: location_id, location_name: elocation_name,
                phone_number: ephone_number, street_name: estreet_name, city: ecity, state: estate, zip: ezip
            }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.status === 200) {
            alert("Successfully edited the Location!");
        } else {
            alert(`Failed to edit Location, status code = ${response.status}`);
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
                <p></p>
                <p>** All fields are required to edit a Location **</p>
                <form>
                    <label>Edit Location:
                        <input
                            type="text"
                            placeholder="Location Id"
                            value={location_id}
                            onChange={e => getLocationId(e.target.value)} />
                        <input
                            type="text"
                            placeholder="Location Name"
                            value={elocation_name}
                            onChange={e => updateLocationName(e.target.value)} />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            value={ephone_number}
                            onChange={e => updatePhoneNumber(e.target.value)} />
                        <input
                            type="text"
                            placeholder="Street Name"
                            value={estreet_name}
                            onChange={e => updateStreetName(e.target.value)} />
                        <input
                            type="text"
                            placeholder="City"
                            value={ecity}
                            onChange={e => updateCity(e.target.value)} />
                        <input
                            type="text"
                            placeholder="State"
                            value={estate}
                            onChange={e => updateState(e.target.value)} />
                        <input
                            type="text"
                            placeholder="Zip"
                            value={ezip}
                            onChange={e => updateZip(e.target.value)} />
                        <button
                            onClick={editLocation}
                            type="submit"
                        >Save</button>
                    </label>
                </form>
            </td>
        </table>
        <p></p>
    </div>
}

export default Location;