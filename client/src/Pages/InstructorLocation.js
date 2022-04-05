import React, { useEffect, useState } from "react";
import InstructorLocationList from '../Components/InstructorLocationList';

function InstructorLocations() {

    const [instructor_locations, setInstructorLocations] = useState([]);

    const [location_id, setLocationId] = useState('');
    const [instructor_id, setInstructorId] = useState('');
    const [location_ids, getLocationIds] = useState([]);
    const [instructor_ids, getInstructorIds] = useState([]);

    const loadLocationIds = async () => {
        const response = await fetch("/get_location_ids");
        const location_ids = await response.json();
        getLocationIds(location_ids);
    };

    const loadInstructorIds = async () => {
        const response = await fetch("/get_instructor_ids");
        const instructor_ids = await response.json();
        getInstructorIds(instructor_ids);
    };

    const loadInstructorLocations = async () => {
        const response = await fetch("/get_instructor_location");
        const instructor_locations = await response.json();
        setInstructorLocations(instructor_locations);
    };

    useEffect(() => {
        loadInstructorLocations();
        loadInstructorIds();
        loadLocationIds();
    }, []);

    const onDelete = async instructor_location_id => {
        const response = await fetch(`/delete_instructor_location/${instructor_location_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/get_instructor_location');
            const instructor_locations = await getResponse.json();
            setInstructorLocations(instructor_locations);
        } else {
            console.error(`Failed to delete class with id=${instructor_location_id}, status code = ${response.status}`);
        }
    };

    const addInstructorLocation = async () => {
        const newInstructorLocation = { location_id, instructor_id };
        const response = await fetch('/add_instructor_location', {
            method: 'POST',
            body: JSON.stringify(newInstructorLocation),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 201) {
            alert("Successfully added Instructor Location!");
        } else {
            alert(`Failed to add Instructor Location, status code = ${response.status}`);
        }
    };

    return <div>
        <h1>Instructor Locations:</h1>
        <>
            <InstructorLocationList instructor_locations={instructor_locations} onDelete={onDelete}></InstructorLocationList>
        </>
        <p></p>
        <table>
            <td>
                <p></p>
                <p>** Select a Location ID and Instructor ID to add to Instructor Locations **</p>
                <form>
                    <label>Add Instructor Locations:
                        <select
                            value={location_id}
                            onChange={e => setLocationId(e.target.value)}>
                            <option> -- Select Location Id --</option>
                            {location_ids.map((location_id, i) => <option value={location_id.location_id} key={i}>{location_id.location_id}</option>)}
                        </select>
                        <select
                            value={instructor_id}
                            onChange={e => setInstructorId(e.target.value)}>
                            <option> -- Select Instructor Id --</option>
                            {instructor_ids.map((instructor_id, i) => <option value={instructor_id.instructor_id} key={i}>{instructor_id.instructor_id}</option>)}
                        </select>
                        <button
                            type="submit"
                            onClick={addInstructorLocation}
                        >submit</button>
                    </label>
                </form>
                <p></p>
            </td>
        </table>
        <p></p>
    </div>

}

export default InstructorLocations;