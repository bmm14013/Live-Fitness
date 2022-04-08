import React from 'react';
import { MdDelete } from 'react-icons/md'

function MembersClasses({ members_classes, onDelete }) {
    return (
        <tr>
            <td>{members_classes.member_class_id}</td>
            <td>{members_classes.member_id}</td>
            <td>{members_classes.class_id}</td>
            <td>{members_classes.first_name}</td>
            <td>{members_classes.last_name}</td>
            <td>{members_classes.class_name}</td>
            <td>{members_classes["DATE_FORMAT(Classes.start_date, '%b %d %Y')"]}</td>
            <td>{members_classes["TIME_FORMAT(Classes.start_time, '%h:%i %p')"]}</td>
            <td>{members_classes.location_id}</td>
            <td>{members_classes.instructor_id}</td>
            <td><MdDelete onClick={ () => onDelete(members_classes.member_class_id)}></MdDelete></td>
        </tr>
    );
}

export default MembersClasses