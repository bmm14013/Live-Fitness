import React from 'react';
import { MdDelete } from 'react-icons/md';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function Class({ class_item, onDelete }) {
    return (
        <tr>
            <td>{class_item.class_id}</td>
            <td>{class_item.class_name}</td>
            <td>{class_item.start_date}</td>
            <td>{class_item.start_time}</td>
            <td>{class_item.instructor_id}</td>
            <td>{class_item.location_id}</td>
            <td>{class_item.class_desc}</td>
            <td><MdDelete onClick={ () => onDelete(class_item.class_id)}></MdDelete></td>
            <td><button><Link to="/members_classes"> add member </Link></button></td>
        </tr>
    );
}

export default Class