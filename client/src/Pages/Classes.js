import React, { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import ClassesList from '../Components/ClassesList';
import MembersClassesList from "../Components/MembersClassesList";

function Classes({ setClassToEdit }) {

    const navigate = useNavigate();

    const [classes, setClasses] = useState([]);

    const [gclass_id, getClassById] = useState('');
    const [gclass_name, getClassByName] = useState('');
    const [gclass_location_id, getClassByLocationId] = useState('');
    const [instructor_ids, getInstructorIds] = useState([]);

    const [class_name, setClassName] = useState('');
    const [start_date, setStartDate] = useState('');
    const [start_time, setStartTime] = useState('');
    const [class_instructor_id, setInstructorId] = useState('');
    const [class_desc, setClassDesc] = useState('');

    const [members_classes, setMembersClasses] = useState([]);

    const [class_id, setClassId] = useState('');
    const [member_id, setMemberId] = useState('');
    const [member_ids, getMemberIds] = useState([]);
    const [class_ids, getClassIds] = useState([]);


    const loadClasses = async () => {
        const response = await fetch("/get_classes");
        const classes = await response.json();
        getClassById('');
        getClassByLocationId('');
        getClassByName('');
        setClasses(classes);
    };

    const loadInstructorIds = async () => {
        const response = await fetch("/get_instructor_ids");
        const instructor_ids = await response.json();
        getInstructorIds(instructor_ids);
    };

    const loadMemberIds = async () => {
        const response = await fetch("/get_member_ids");
        const member_ids = await response.json();
        getMemberIds(member_ids);
    };

    const loadClassIds = async () => {
        const response = await fetch("/get_class_ids");
        const class_ids = await response.json();
        getClassIds(class_ids);
    };

    const loadMembersClasses = async () => {
        const response = await fetch("/get_members_classes");
        const members_classes = await response.json();
        setMembersClasses(members_classes);
    };

    useEffect(() => {
        loadClasses();
        loadInstructorIds();

        loadMembersClasses();
        loadMemberIds();
        loadClassIds();
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
        getClassByName('');
        getClassByLocationId('');
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
        getClassById('');
        getClassByLocationId('');
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
        getClassById('');
        getClassByName('');
        setClasses(filtered_classes);
    };

    const addClass = async () => {
        const newClass = {
            class_name, start_date, start_time, class_instructor_id, class_desc
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
            alert(`Failed to add class, status code = ${response.status}. Please check that all fields are filled correctly.`);
        }
    };

    const onEdit = async classToEdit => {
        setClassToEdit(classToEdit);
        navigate("/edit-class");
    };

    const onDeleteMember = async class_id => {
        const response = await fetch(`/delete_class/${class_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/get_classes');
            const classes = await getResponse.json();
            setClasses(classes);
        } else {
            console.error(`Failed to delete class with id=${class_id}, status code = ${response.status}`);
        }
    };

    const addMembersClasses = async () => {
        const newMembersClasses = { member_id, class_id };
        const response = await fetch('/add_members_classes', {
            method: 'POST',
            body: JSON.stringify(newMembersClasses),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 201) {
            alert("Successfully Registered a member to a class!");
        } else {
            alert(`Failed to add member to a class, status code = ${response.status}. Please check that member hasn't already been added.`);
        }
    };

    const onDeleteRegistration = async member_class_id => {
        const response = await fetch(`/delete_members_classes/${member_class_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/get_members_classes');
            const members_classes = await getResponse.json();
            setMembersClasses(members_classes);
        } else {
            console.error(`Failed to delete registration with id=${member_class_id}, status code = ${response.status}`);
        }
    };


    return <div><h1>All available classes are below:</h1>
        <h3>Filter your class search:</h3>
        <table>
            <td>
                <form onSubmit={(e) => { 
                            e.preventDefault();
                            e.target.reset();
                        }}>
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
        <ClassesList classes={classes} onEdit={onEdit} onDelete={onDeleteMember}></ClassesList>
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
                            type="time"
                            placeholder="Time"
                            value={start_time}
                            onChange={e => setStartTime(e.target.value)} />
                        <select
                            value={class_instructor_id}
                            onChange={e => setInstructorId(e.target.value)}>
                            <option> -- Select Instructor Id --</option>
                            {instructor_ids.map((instructor_id, i) => <option value={instructor_id.instructor_id} key={i}>{instructor_id.instructor_id}</option>)}
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
    
        <h1>Class Registration:</h1>
        <p></p>
        <p></p>
        <p></p>
        <table>
            <td>
                <p></p>
                <p></p>
                <></>
                <p>** Please select a Member ID and Class ID**</p>
                <form>
                    <label>Class Registration:
                        <select
                            value={member_id}
                            onChange={e => setMemberId(e.target.value)}>
                            <option> -- Select Member Id --</option>
                            {member_ids.map((member_id, i) => <option value={member_id.member_id} key={i}>{member_id.member_id}</option>)}
                        </select>
                        <select
                            value={class_id}
                            onChange={e => setClassId(e.target.value)}>
                            <option> -- Select Class Id --</option>
                            {class_ids.map((class_id, i) => <option value={class_id.class_id} key={i}>{class_id.class_id}</option>)}
                        </select>
                        <button
                            type="submit"
                            onClick={addMembersClasses}
                        >submit</button>
                    </label>
                </form>
            </td>
        </table>
        <p></p>
        <>
            <MembersClassesList members_classes={members_classes} onDelete={onDeleteRegistration}></MembersClassesList>
        </>
        <p></p>
    </div>
}

export default Classes;