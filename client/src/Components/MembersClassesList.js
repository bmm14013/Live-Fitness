import React from 'react';
import MembersClasses from './MembersClasses'

function MembersClassesList({ members_classes, onDelete }) {
    return (
        <table id="members_classes" class="styled-table">
            <thead>
                <tr>
                    <th>Registration ID</th>
                    <th>Member ID</th>
                    <th>Class ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Class Name</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Location ID</th>
                    <th>Instructor ID</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
            {members_classes.map((members_classes, i) => <MembersClasses members_classes={members_classes} key={i} onDelete={onDelete}/>)}
            </tbody>
        </table>
    );
}

export default MembersClassesList