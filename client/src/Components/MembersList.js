import React from 'react';
import Member from './Member'

function MembersList({ members, onDelete }) {
    return (
        <table id="members" class="styled-table">
            <thead>
                <tr>
                    <th>Member ID</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Birthday</th>
                    <th>Phone Number</th>
                    <th>Street Name</th>
                    <th>City</th>
                    <th>State</th>
                    <th>Zip</th>
                    <th>Delete</th>
                </tr>
            </thead>
            <tbody>
                {members.map((member, i) => <Member member={member} key={i} onDelete={onDelete}/>)}
            </tbody>
        </table>
    );
}

export default MembersList