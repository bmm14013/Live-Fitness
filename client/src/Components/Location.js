import React from 'react';
import { MdDelete } from 'react-icons/md';

function Location({ location, onDelete}) {
    return (
        <tr>
            <td>{location.location_id}</td>
            <td>{location.location_name}</td>
            <td>{location.phone_number}</td>
            <td>{location.street_name}</td>
            <td>{location.city}</td>
            <td>{location.state}</td>
            <td>{location.zip}</td>
            <td><MdDelete onClick={ () => onDelete(location.location_id)}></MdDelete></td>
        </tr>
    )
}

export default Location