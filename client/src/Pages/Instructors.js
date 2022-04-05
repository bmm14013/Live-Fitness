import React, { useEffect, useState } from "react";
import InstructorsList from "../Components/InstructorList";

function Instructors({ }) {

    const [instructors, setInstructors] = useState([]);

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');

    const [instructor_id, getInstructorId] = useState('');
    const [efirst_name, updateFirstName] = useState('');
    const [elast_name, updateLastName] = useState('');

    const loadInstructors = async instructor => {
        const response = await fetch("/get_instructors");
        const instructors = await response.json();
        setInstructors(instructors);
    }

    useEffect(() => {
        loadInstructors();
    }, []);


    const onDelete = async instructor_id => {
        const response = await fetch(`/delete_instructor/${instructor_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/get_instructors');
            const instructors = await getResponse.json();
            setInstructors(instructors);
        } else {
            console.error(`Failed to delete instructor with id=${instructor_id}, status code = ${response.status}`);
        }
    };

    const addInstructor = async () => {
        const newInstructor = { first_name, last_name };
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

    const editInstructor = async () => {
        const response = await fetch(`/edit_instructor`, {
            method: 'PUT',
            body: JSON.stringify({ instructor_id: instructor_id, first_name: efirst_name, last_name: elast_name }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if (response.status === 200) {
            alert("Successfully edited the Instructor!");
        } else {
            alert(`Failed to edit Instructor, status code = ${response.status}`);
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
                        <button
                            type="submit"
                            onClick={addInstructor}
                        >submit</button>
                    </label>
                </form>
                <p></p>
                <p></p>
                <p>** All fields are required to edit a Instructor **</p>
                <form>
                    <label>Edit Instructor:
                        <input
                            type="text"
                            placeholder="Instructor Id"
                            value={instructor_id}
                            onChange={e => getInstructorId(e.target.value)} />
                        <input
                            type="text"
                            placeholder="First Name"
                            value={efirst_name}
                            onChange={e => updateFirstName(e.target.value)} />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={elast_name}
                            onChange={e => updateLastName(e.target.value)} />
                        <button
                            onClick={editInstructor}
                            type="submit"
                        >Save</button>
                    </label>
                </form>
            </td>
        </table>
        <p></p>
    </div>
}

export default Instructors;
