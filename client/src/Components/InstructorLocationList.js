import React from 'react';
import InstructorLocation from './InstructorLocation'

function InstructorLocationList({ instructor_locations, onDelete }) {
    return (
        <table id="instructor_locations" class="styled-table">
            <thead>
                <tr>
                    <th>Instructor Location ID</th>
                    <th>Location ID</th>
                    <th>Location Name</th>
                    <th>Instructor ID</th>
                    <th>Instructor Name</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {instructor_locations.map((instructor_location, i) => <InstructorLocation instructor_location={instructor_location} key={i} onDelete={onDelete}/>)}
            </tbody>
        </table>
    );
}

export default InstructorLocationList