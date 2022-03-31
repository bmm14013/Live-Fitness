import React from 'react';
import { MdDelete } from 'react-icons/md';

function Member({ member, onDelete }) {
    return (
        <tr>
            <td>{member.member_id}</td>
            <td>{member.first_name}</td>
            <td>{member.last_name}</td>
            <td>{member.birthday}</td>
            <td>{member.phone_number}</td>
            <td>{member.street_name}</td>
            <td>{member.city}</td>
            <td>{member.state}</td>
            <td>{member.zip}</td>
            <td><MdDelete onClick={ () => onDelete(member.member_id)}></MdDelete></td>
        </tr>
    );
}

export default Member