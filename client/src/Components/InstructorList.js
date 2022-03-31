import React from 'react';
import Instructor from './Instructor'

function InstructorsList({ instructors, onDelete }) {
    return (
        <table id="instructors" class="styled-table">
            <thead>
                <tr>
                    <th>Instructor Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {instructors.map((instructor, i) => <Instructor instructor={instructor} key={i} onDelete={onDelete}/>)}
            </tbody>
        </table>
    );
}

export default InstructorsList