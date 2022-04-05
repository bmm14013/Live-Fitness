import React, { useEffect, useState } from "react";
import ClassesList from '../Components/ClassesList';

function Classes() {

    const [classes, setClasses] = useState([]);

    const [gclass_id, getClassById] = useState('');
    const [gclass_name, getClassByName] = useState('');
    const [gclass_location_id, getClassByLocationId] = useState('');
    const [instructor_ids, getInstructorIds] = useState([]);
    const [location_ids, getLocationIds] = useState([]);

    const [class_name, setClassName] = useState('');
    const [start_date, setStartDate] = useState('');
    const [start_time, setStartTime] = useState('');
    const [class_location_id, setLocationId] = useState('');
    const [class_instructor_id, setInstructorId] = useState('');
    const [class_desc, setClassDesc] = useState('');

    const loadClasses = async () => {
        const response = await fetch("/get_classes");
        const classes = await response.json();
        setClasses(classes);
    };

    const loadInstructorIds = async () => {
        const response = await fetch("/get_instructor_ids");
        const instructor_ids = await response.json();
        getInstructorIds(instructor_ids);
    };

    const loadLocationIds = async () => {
        const response = await fetch("/get_location_ids");
        const location_ids = await response.json();
        getLocationIds(location_ids);
    };

    useEffect(() => {
        loadClasses();
        loadInstructorIds();
        loadLocationIds();
    }, []);

    const loadClassById = async () => {
        const class_id = { gclass_id }
        const response = await fetch('/get_class_from_id', {
            method: 'POST',
            body: JSON.stringify(class_id),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const filtered_classes = await response.json();
        setClasses(filtered_classes);
    };

    const loadClassByName = async () => {
        const class_name = { gclass_name }
        const response = await fetch('/get_class_from_name', {
            method: 'POST',
            body: JSON.stringify(class_name),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const filtered_classes = await response.json();
        setClasses(filtered_classes);
    };

    const loadClassByLocationId = async () => {
        const class_location_id = { gclass_location_id }
        const response = await fetch('/get_class_from_location_id', {
            method: 'POST',
            body: JSON.stringify(class_location_id),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const filtered_classes = await response.json();
        setClasses(filtered_classes);
    };

    const addClass = async () => {
        const newClass = {
            class_name, start_date, start_time, class_instructor_id,
            class_location_id, class_desc
        };
        const response = await fetch('/add_class', {
            method: 'POST',
            body: JSON.stringify(newClass),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 201) {
            alert("Successfully added class!");
        } else {
            alert(`Failed to add class, status code = ${response.status}`);
        }
    };

    const onDelete = async class_id => {
        const response = await fetch(`/delete_class/${class_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/get_classes');
            const classes = await getResponse.json();
            setClasses(classes);
        } else {
            console.error(`Failed to delete class with id=${class_id}, status code = ${response.status}`);
        }
    };


    return <div><h1>All available classes are below:</h1>
        <h3>Filter your class search:</h3>
        <table>
            <td>
                <form onSubmit={e => { e.preventDefault() }}>
                    <label>Search by Class Id:
                        <input
                            type="text"
                            placeholder="Class Id"
                            value={gclass_id}
                            onChange={e => getClassById(e.target.value)} />
                        <button
                            type="submit"
                            onClick={loadClassById}
                        >submit</button>
                    </label>
                </form>
                <p></p>
                <form onSubmit={e => { e.preventDefault() }}>
                    <label>Search by Class:
                        <input
                            type="text"
                            placeholder="Class Name"
                            value={gclass_name}
                            onChange={e => getClassByName(e.target.value)} />
                        <button
                            type="submit"
                            onClick={loadClassByName}
                        >submit</button>
                    </label>
                </form>
                <p></p>
                <p></p>
                <form onSubmit={e => { e.preventDefault() }}>
                    <label>Search by Location Id:
                        <input
                            type="text"
                            placeholder="Location"
                            value={gclass_location_id}
                            onChange={e => getClassByLocationId(e.target.value)} />
                        <button
                            type="submit"
                            onClick={loadClassByLocationId}
                        >submit</button>
                    </label>
                </form>
                <p></p>
                <button onClick={loadClasses}>
                    Reset Filters
                </button>
            </td>
        </table>
        <p></p>
        <p></p>
        <ClassesList classes={classes} onDelete={onDelete}></ClassesList>
        <p></p>
        <p></p>
        <table>
            <td>
                <p>** All fields are required to add a Class **</p>
                <form>
                    <label>Add Class:
                        <input
                            type="text"
                            placeholder="Class Name"
                            value={class_name}
                            onChange={e => setClassName(e.target.value)} />
                        <input
                            type="date"
                            placeholder="Date"
                            value={start_date}
                            onChange={e => setStartDate(e.target.value)} />
                        <input
                            type="text"
                            placeholder="Time"
                            value={start_time}
                            onChange={e => setStartTime(e.target.value)} />
                        <select
                            value={class_instructor_id}
                            onChange={e => setInstructorId(e.target.value)}>
                            <option> -- Select Instructor Id --</option>
                            {instructor_ids.map((instructor_id, i) => <option value={instructor_id.instructor_id} key={i}>{instructor_id.instructor_id}</option>)}
                        </select>
                        <select
                            value={class_location_id}
                            onChange={e => setLocationId(e.target.value)}>
                            <option> -- Select Location Id --</option>
                            {location_ids.map((location_id, i) => <option value={location_id.location_id} key={i}>{location_id.location_id}</option>)}
                        </select>
                        <input
                            type="text"
                            placeholder="Class Description"
                            value={class_desc}
                            onChange={e => setClassDesc(e.target.value)} />
                        <button
                            onClick={addClass}
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

export default Classes;