import React, { useEffect, useState} from "react";
import MembersClassesList from '../Components/MembersClassesList';
import {BrowserRouter as Router, Routes, Route, Link} from 'react-router-dom';

function MembersClasses() {

    const [members_classes, setMembersClasses] = useState([]);
    
    const [class_id, setClassId] = useState('');
    const [member_id, setMemberId] = useState('');
    const [member_ids, getMemberIds] = useState([]);
    const [class_ids, getClassIds] = useState([]);

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
        loadMembersClasses();
        loadMemberIds();
        loadClassIds();
    }, []);

    const addMembersClasses = async () => {
        const newMembersClasses = { member_id, class_id};
        const response = await fetch('/add_members_classes', {
            method: 'POST',
            body: JSON.stringify(newMembersClasses),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.status === 201){
            alert("Successfully Registered a member to a class!");
        } else {
            alert(`Failed to add member to a class, status code = ${response.status}`);
        }
    };

    const onDelete = async member_class_id => {
        const response = await fetch(`/delete_members_classes/${member_class_id}`, { method: 'DELETE'});
        if(response.status === 204){
            const getResponse = await fetch('/get_members_classes');
            const members_classes = await getResponse.json();
            setMembersClasses(members_classes);
        } else {
            console.error(`Failed to delete registration with id=${member_class_id}, status code = ${response.status}`);
        }
    };

    return <div>
            <h1>Class Registration:</h1>
            <p></p>
            <p></p>
            <p>Search for all available classes at the link below:</p>
            <p></p>
            <td><button><Link to="/classes"> Search for a Class </Link></button></td>
            <></>
            <></>
            <p>Register a member by Member ID and Class ID:</p>
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
            <p></p>
            <>
            <MembersClassesList members_classes={members_classes} onDelete={onDelete}></MembersClassesList>
            </>
            <p></p>

            <p></p>
        <a href="/">home</a>
    </div>
}

export default MembersClasses;