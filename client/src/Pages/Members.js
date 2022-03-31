import React, { useEffect, useState} from "react";
import MembersList from '../Components/MembersList';

function Members() {

    const [members, setMembers] = useState([]);
    
    const [filtered_members, setFilteredMembers] = useState([])
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

    const [member_id, getMemberId] = useState('');
    const [efirst_name, updateFirstName] = useState('');
    const [elast_name, updateLastName] = useState('');
    const [ebirthday, updateBirthday] = useState('');
    const [ephone_number, updatePhoneNumber] = useState('');
    const [estreet_name, updateStreetName] = useState('');
    const [ecity, updateCity] = useState('');
    const [estate, updateState] = useState('');
    const [ezip, updateZip] = useState('');

    const loadMembers = async () => {
        const response = await fetch("/get_members");
        const members = await response.json();
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
        setFilteredMembers(filtered_members);
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
        setFilteredMembers(filtered_members);
    }

    const addMember = async () => {
        const newMember = { first_name, last_name, birthday, phone_number, street_name, 
                            city, state, zip};
        const response = await fetch('/add_member', {
            method: 'POST',
            body: JSON.stringify(newMember),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(response.status === 201){
            alert("Successfully added member!");
        } else {
            alert(`Failed to add exercise, status code = ${response.status}`);
        }
    };


    const onDelete = async member_id => {
        const response = await fetch(`/delete_member/${member_id}`, { method: 'DELETE'});
        if(response.status === 204){
            const getResponse = await fetch('/get_members');
            const members = await getResponse.json();
            setMembers(members);
        } else {
            console.error(`Failed to delete member with id=${member_id}, status code = ${response.status}`);
        }
    };

    const editMember = async () => {
        const response = await fetch(`/edit_member`, {
            method: 'PUT',
            body: JSON.stringify({ member_id: member_id, first_name:efirst_name, last_name:elast_name, birthday:ebirthday,
                                    phone_number:ephone_number, street_name:estreet_name, city:ecity, state:estate, zip:ezip }),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        if(response.status === 200){
            alert("Successfully edited the exericse!");
        } else {
            alert(`Failed to edit exercise, status code = ${response.status}`);
        }
    };
    


    return <div>
        <h1>Members</h1>
        <h2>Member Lookup:</h2>
        <p>Searching for a member by first and last name will pull up all members by that name. If
            you would like to search for a specific member you must search by member ID. To view a list
            of all members click view all.
        </p>
        <form onSubmit={e => {e.preventDefault()}}>
            <label>Search for Member by name:
                <input
                    type="text" 
                    placeholder="First Name"
                    value={gfirst_name}
                    onChange={e => getMemberByFirstName(e.target.value)}/>
                <input 
                    type="text" 
                    placeholder="Last Name"
                    value={glast_name}
                    onChange={e => getMemberByLastName(e.target.value)}/>
                <button 
                    type="submit"
                    onClick={loadMemberByName}
                >search</button>
            </label>
        </form>
        <p></p>
        <form onSubmit={e => {e.preventDefault()}}>
            <label>Search for Member by ID:
                <input 
                    type="text"
                    placeholder="Member ID"
                    value={gmember_id}
                    onChange={e => getMemberById(e.target.value)}/>
                <button
                    type="submit"
                    onClick={loadMemberById}
                >search</button>
            </label>
        </form>
        <p></p>
        <MembersList members={filtered_members} onDelete={onDelete}></MembersList>
        <p></p>
        <h2>View All Members</h2>
        <p></p>
        <MembersList members={members} onDelete={onDelete}></MembersList>
        <p></p>
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
        <p></p>
        <form>
            <label>Edit Member:
                <input 
                    type="text"
                    placeholder="Member Id"
                    value={member_id}
                    onChange={e => getMemberId(e.target.value)} />
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
                <input
                    type="date"
                    placeholder="birthday"
                    value={ebirthday}
                    onChange={e => updateBirthday(e.target.value)} />
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
                    onClick={editMember}
                    type="submit"
                >Save</button>
            </label>
        </form>
        <p></p>
        <a href="/">home</a>
    </div>
}

export default Members;