import React, { useEffect, useState } from "react";
import InstructorsList from "../Components/InstructorList";

function Instructors({ }) {

    const [instructors, setInstructors] = useState([]);

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [instructor_location_id, setLocationId] = useState('')

    const [location_ids, getLocationIds] = useState([]);

    const loadInstructors = async () => {
        const response = await fetch("/get_instructors");
        const instructors = await response.json();
        setInstructors(instructors);
    }

    const loadLocationIds = async () => {
        const response = await fetch("/get_location_ids");
        const location_ids = await response.json();
        getLocationIds(location_ids);
    };

    useEffect(() => {
        loadInstructors();
        loadLocationIds();
    }, []);


    const onDelete = async instructor_id => {
        const response = await fetch(`/delete_instructor/${instructor_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/get_instructors');
            const instructors = await getResponse.json();
            alert('Successfully deleted instructor!')
            setInstructors(instructors);
        } else {
            console.error(`Failed to delete instructor with id=${instructor_id}, status code = ${response.status}`);
        }
    };

    const addInstructor = async () => {
        const newInstructor = { first_name, last_name, instructor_location_id };
        const response = await fetch('/add_instructor', {
            method: 'POST',
            body: JSON.stringify(newInstructor),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 201) {
            alert("Successfully added instructor!");
        } else {
            alert(`Failed to add instructor, status code = ${response.status}`);
        }
    };


    return <div>
        <h1>Current List of Instructors:</h1>
        <>
            <InstructorsList instructors={instructors} onDelete={onDelete}></InstructorsList>
        </>
        <p></p>
        <table>
            <td>
                <p></p>
                <p>** All fields are required to add a Instructor **</p>
                <form>
                    <label>Add Instructor:
                        <input
                            type="text"
                            placeholder="First Name"
                            value={first_name}
                            onChange={e => setFirstName(e.target.value)} />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={last_name}
                            onChange={e => setLastName(e.target.value)} />
                        <select
                            value={instructor_location_id}
                            onChange={e => setLocationId(e.target.value)}>
                            <option> -- Select Location Id --</option>
                            {location_ids.map((location_id, i) => <option value={location_id.location_id} key={i}>{location_id.location_id}</option>)}
                        </select>
                        <p></p>
                        <button
                            type="submit"
                            onClick={addInstructor}
                        >submit</button>
                    </label>
                </form>
                <p></p>
            </td>
        </table>
        <p></p>
    </div>
}

export default Instructors;
