import React from 'react';
import Location from './Location'

function LocationList({ locations, onDelete }) {
    return (
        <table id="locations" class="styled-table">
            <thead>
                <tr>
                    <th>Location ID</th>
                    <th>Location Name</th>
                    <th>Phone Number</th>
                    <th>Address</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {locations.map((location, i) => <Location location={location} key={i} onDelete={onDelete}/>)}
            </tbody>
        </table>
    );
}

export default LocationList
