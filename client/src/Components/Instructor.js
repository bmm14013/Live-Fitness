import React from 'react';
import { MdDelete } from 'react-icons/md';

function Instructor({ instructor, onDelete }) {
    return (
        <tr>
            <td>{instructor.instructor_id}</td>
            <td>{instructor.first_name}</td>
            <td>{instructor.last_name}</td>
            <td><MdDelete onClick={ () => onDelete(instructor.instructor_id)}></MdDelete></td>
        </tr>
    );
}

export default Instructor