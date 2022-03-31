import React from 'react';
import { MdDelete } from 'react-icons/md'

function InstructorLocation({ instructor_location, onDelete }) {
    return (
        <tr>
            <td>{instructor_location.instructor_location_id}</td>
            <td>{instructor_location.location_id}</td>
            <td>{instructor_location.location_name}</td>
            <td>{instructor_location.instructor_id}</td>
            <td>{instructor_location.first_name}</td>
            <td><MdDelete onClick={ () => onDelete(instructor_location.instructor_location_id)}></MdDelete></td>
        </tr>
    );
}

export default InstructorLocation