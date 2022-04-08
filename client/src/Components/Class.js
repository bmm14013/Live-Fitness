import React from 'react';
import { MdDelete } from 'react-icons/md';
import { MdEdit } from 'react-icons/md';

function Class({ class_item, onEdit, onDelete }) {
    return (
        <tr>
            <td>{class_item.class_id}</td>
            <td>{class_item.class_name}</td>
            <td>{class_item["DATE_FORMAT(Classes.start_date, '%b %d %Y')"]}</td>
            <td>{class_item["TIME_FORMAT(Classes.start_time, '%h:%i %p')"]}</td>
            <td>{class_item.instructor_id}</td>
            <td>{class_item.location_id}</td>
            <td>{class_item.class_desc}</td>
            <td><MdEdit onClick={ () => onEdit(class_item)}></MdEdit></td>
            <td><MdDelete onClick={ () => onDelete(class_item.class_id)}></MdDelete></td>
        </tr>
    );
}

export default Class