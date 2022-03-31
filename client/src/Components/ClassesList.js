import React from 'react';
import Class from './Class'

function ClassesList({ classes, onDelete }) {
    return (
        <table id="classes" class="styled-table">
            <thead>
                <tr>
                    <th>Class Id</th>
                    <th>Class</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Instructor Id</th>
                    <th>Location Id</th>
                    <th>Description</th>
                    <th>Delete</th>
                    <th>Add Member</th>
                </tr>
            </thead>
            <tbody>
                {classes.map((class_item, i) => <Class class_item={class_item} key={i} onDelete={onDelete}/>)}
            </tbody>
        </table>
    );
}

export default ClassesList