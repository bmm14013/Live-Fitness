import React from 'react';
import Class from './Class'

function ClassesList({ classes, onEdit, onDelete }) {
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
                    <th>Edit</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {classes.map((class_item, i) => <Class class_item={class_item} key={i} onEdit={onEdit} onDelete={onDelete}/>)}
            </tbody>
        </table>
    );
}

export default ClassesList