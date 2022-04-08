import React, { useEffect, useState } from "react";
import MembersList from '../Components/MembersList';

function Members() {

    const [members, setMembers] = useState([]);

    const [gmember_id, getMemberById] = useState('');
    const [gfirst_name, getMemberByFirstName] = useState('');
    const [glast_name, getMemberByLastName] = useState('');

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [birthday, setBirthday] = useState('');
    const [phone_number, setPhoneNumber] = useState('');
    const [street_name, setStreetName] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');

    const loadMembers = async () => {
        const response = await fetch("/get_members");
        const members = await response.json();
        getMemberById('');
        getMemberByFirstName('');
        getMemberByLastName('');
        setMembers(members);
    }

    useEffect(() => {
        loadMembers();
    }, []);

    const loadMemberById = async () => {
        const member_id = { gmember_id }
        const response = await fetch('/get_member_from_id', {
            method: 'POST',
            body: JSON.stringify(member_id),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const filtered_members = await response.json();
        setMembers(filtered_members);
        getMemberByFirstName('');
        getMemberByLastName('');
    }

    const loadMemberByName = async () => {
        const full_name = { gfirst_name, glast_name }
        const response = await fetch('/get_member_from_name', {
            method: 'POST',
            body: JSON.stringify(full_name),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const filtered_members = await response.json();
        setMembers(filtered_members);
        getMemberById('');
    }

    const addMember = async () => {
        const newMember = {
            first_name, last_name, birthday, phone_number, street_name,
            city, state, zip
        };
        const response = await fetch('/add_member', {
            method: 'POST',
            body: JSON.stringify(newMember),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if (response.status === 201) {
            alert("Successfully added member!");
        } else {
            alert(`Failed to add member, status code = ${response.status}. Please make sure all fields are filled correctly.`);
        }
    };


    const onDelete = async member_id => {
        const response = await fetch(`/delete_member/${member_id}`, { method: 'DELETE' });
        if (response.status === 204) {
            const getResponse = await fetch('/get_members');
            const members = await getResponse.json();
            setMembers(members);
            alert('Successfully deleted member!');
        } else {
            console.error(`Failed to delete member with id=${member_id}, status code = ${response.status}`);
        }
    };

    return <div>
        <h1>Members</h1>
        <h2>Member Lookup:</h2>
        <table>
            <td>
                <form onSubmit={e => { e.preventDefault() }}>
                    <label>Search for Member by name:
                        <input
                            type="text"
                            placeholder="First Name"
                            value={gfirst_name}
                            onChange={e => getMemberByFirstName(e.target.value)} />
                        <input
                            type="text"
                            placeholder="Last Name"
                            value={glast_name}
                            onChange={e => getMemberByLastName(e.target.value)} />
                        <button
                            type="submit"
                            onClick={loadMemberByName}
                        >search</button>
                    </label>
                </form>
                <p></p>
                <form onSubmit={e => { e.preventDefault() }}>
                    <label>Search for Member by ID:
                        <input
                            type="text"
                            placeholder="Member ID"
                            value={gmember_id}
                            onChange={e => getMemberById(e.target.value)} />
                        <button
                            type="submit"
                            onClick={loadMemberById}
                        >search</button>
                    </label>
                </form>
                <p></p>
                <button onClick={loadMembers}
                >Reset Filter</button>
            </td>
        </table>
        <p></p>
        <MembersList members={members} onDelete={onDelete}></MembersList>
        <p></p>
        <table>
            <td>
                <p>** All fields are required to add a Member **</p>
                <form>
                    <label>Add Member:
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
                        <input
                            type="date"
                            placeholder="birthday"
                            value={birthday}
                            onChange={e => setBirthday(e.target.value)} />
                        <input
                            type="text"
                            placeholder="Phone Number"
                            maxLength={10}
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
                            onClick={addMember}
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

export default Members;